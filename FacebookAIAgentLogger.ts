/**
 * Facebook AI Agent Logger
 * Enhanced logging system for AI Agent operations with structured output
 * that's visible in n8n AI Agent logs interface
 */

export interface AIAgentLogEntry {
	timestamp: string;
	tool: string;
	action: string;
	status: 'starting' | 'success' | 'error' | 'info' | 'warning';
	message: string;
	data?: any;
	executionId?: string;
	nodeId?: string;
	pageId?: string;
	duration?: number;
}

export interface AIAgentExecutionContext {
	tool: string;
	action: string;
	pageId: string;
	nodeId?: string;
	executionId?: string;
	startTime: number;
}

export class FacebookAIAgentLogger {
	private static instance: FacebookAIAgentLogger;
	private executionContext: AIAgentExecutionContext | null = null;
	private logs: AIAgentLogEntry[] = [];

	private constructor() {}

	public static getInstance(): FacebookAIAgentLogger {
		if (!FacebookAIAgentLogger.instance) {
			FacebookAIAgentLogger.instance = new FacebookAIAgentLogger();
		}
		return FacebookAIAgentLogger.instance;
	}

	/**
	 * Initialize execution context for an AI Agent operation
	 */
	public startExecution(context: Omit<AIAgentExecutionContext, 'startTime'>): void {
		this.executionContext = {
			...context,
			startTime: Date.now()
		};
		
		this.log('info', `Starting ${context.action} operation`, {
			tool: context.tool,
			action: context.action,
			pageId: context.pageId
		});
	}

	/**
	 * End execution context and log completion
	 */
	public endExecution(status: 'success' | 'error', message: string, data?: any): void {
		if (!this.executionContext) {
			console.warn('[AI_AGENT_LOGGER] No execution context found');
			return;
		}

		const duration = Date.now() - this.executionContext.startTime;
		
		this.log(status, message, {
			...data,
			duration: `${duration}ms`,
			executionSummary: {
				tool: this.executionContext.tool,
				action: this.executionContext.action,
				pageId: this.executionContext.pageId,
				totalDuration: duration
			}
		});

		// Clear context
		this.executionContext = null;
	}

	/**
	 * Log a message with structured format for AI Agent visibility
	 */
	public log(status: AIAgentLogEntry['status'], message: string, data?: any): AIAgentLogEntry {
		const logEntry: AIAgentLogEntry = {
			timestamp: new Date().toISOString(),
			tool: this.executionContext?.tool || 'Facebook Tool',
			action: this.executionContext?.action || 'unknown',
			status,
			message,
			data,
			executionId: this.executionContext?.executionId,
			nodeId: this.executionContext?.nodeId,
			pageId: this.executionContext?.pageId,
			duration: this.executionContext ? Date.now() - this.executionContext.startTime : undefined
		};

		// Store log entry
		this.logs.push(logEntry);

		// Output to console in structured format that n8n AI Agent can parse
		const consoleOutput = this.formatForConsole(logEntry);
		
		switch (status) {
			case 'error':
				console.error(consoleOutput);
				break;
			case 'warning':
				console.warn(consoleOutput);
				break;
			case 'success':
				console.log(`✅ ${consoleOutput}`);
				break;
			case 'starting':
				console.log(`🚀 ${consoleOutput}`);
				break;
			default:
				console.log(`ℹ️ ${consoleOutput}`);
		}

		return logEntry;
	}

	/**
	 * Format log entry for console output that AI Agent can parse
	 */
	private formatForConsole(entry: AIAgentLogEntry): string {
		const prefix = `[AI_AGENT_LOG][${entry.status.toUpperCase()}]`;
		const context = `[${entry.tool}:${entry.action}]`;
		const timestamp = `[${entry.timestamp}]`;
		
		let output = `${prefix} ${context} ${timestamp} ${entry.message}`;
		
		if (entry.data) {
			// Format data for readability
			const dataStr = typeof entry.data === 'object' 
				? JSON.stringify(entry.data, null, 2)
				: String(entry.data);
			output += `\nData: ${dataStr}`;
		}

		return output;
	}

	/**
	 * Get execution summary for AI Agent display
	 */
	public getExecutionSummary(): string {
		if (this.logs.length === 0) {
			return 'No operations logged';
		}

		const successCount = this.logs.filter(l => l.status === 'success').length;
		const errorCount = this.logs.filter(l => l.status === 'error').length;
		const totalOperations = this.logs.length;

		const summary = [
			`📊 Execution Summary:`,
			`- Total Operations: ${totalOperations}`,
			`- Successful: ${successCount}`,
			`- Errors: ${errorCount}`,
			`- Success Rate: ${totalOperations > 0 ? Math.round((successCount / totalOperations) * 100) : 0}%`
		];

		// Add recent operations
		const recentLogs = this.logs.slice(-3);
		if (recentLogs.length > 0) {
			summary.push('', '🕒 Recent Operations:');
			recentLogs.forEach(log => {
				const statusIcon = log.status === 'success' ? '✅' : 
								 log.status === 'error' ? '❌' : 
								 log.status === 'warning' ? '⚠️' : 'ℹ️';
				summary.push(`  ${statusIcon} ${log.action}: ${log.message}`);
			});
		}

		return summary.join('\n');
	}

	/**
	 * Create a formatted result string for AI Agent display
	 */
	public formatResult(action: string, success: boolean, data: any): string {
		const statusIcon = success ? '✅' : '❌';
		const status = success ? 'Success' : 'Error';
		
		let result = `${statusIcon} ${action} - ${status}\n`;
		
		if (success && data) {
			// Format success data
			if (data.postId) {
				result += `📝 Post ID: ${data.postId}\n`;
			}
			if (data.url) {
				result += `🔗 URL: ${data.url}\n`;
			}
			if (data.message) {
				result += `💬 Message: ${data.message.substring(0, 100)}${data.message.length > 100 ? '...' : ''}\n`;
			}
			if (data.count !== undefined) {
				result += `📊 Count: ${data.count}\n`;
			}
		}

		// Add execution context
		result += `\n📋 Execution Details:\n`;
		result += `- Tool: Facebook Tool\n`;
		result += `- Action: ${action}\n`;
		result += `- Status: ${status}\n`;
		result += `- Timestamp: ${new Date().toISOString()}\n`;
		
		if (this.executionContext) {
			const duration = Date.now() - this.executionContext.startTime;
			result += `- Duration: ${duration}ms\n`;
			result += `- Page ID: ${this.executionContext.pageId}\n`;
		}

		return result;
	}

	/**
	 * Clear all logs (useful for testing)
	 */
	public clearLogs(): void {
		this.logs = [];
	}

	/**
	 * Get all logs (useful for debugging)
	 */
	public getAllLogs(): AIAgentLogEntry[] {
		return [...this.logs];
	}

	/**
	 * Export logs in a format suitable for AI Agent history
	 */
	public exportLogsForAIAgent(): string {
		if (this.logs.length === 0) {
			return 'No execution history available';
		}

		const logsByAction = this.logs.reduce((acc, log) => {
			if (!acc[log.action]) {
				acc[log.action] = [];
			}
			acc[log.action].push(log);
			return acc;
		}, {} as Record<string, AIAgentLogEntry[]>);

		let export_str = '📋 Facebook Tool Execution History:\n\n';
		
		Object.entries(logsByAction).forEach(([action, logs]) => {
			export_str += `🔧 ${action.toUpperCase()}:\n`;
			logs.forEach(log => {
				const statusIcon = log.status === 'success' ? '✅' : 
								 log.status === 'error' ? '❌' : 
								 log.status === 'warning' ? '⚠️' : 'ℹ️';
				export_str += `  ${statusIcon} ${log.timestamp}: ${log.message}\n`;
				if (log.data && typeof log.data === 'object') {
					export_str += `     Data: ${JSON.stringify(log.data, null, 6)}\n`;
				}
			});
			export_str += '\n';
		});

		return export_str;
	}
}

// Export singleton instance for easy access
export const aiAgentLogger = FacebookAIAgentLogger.getInstance();

// Helper functions for common logging patterns
export function logAIAgentStart(action: string, pageId: string, args: any): void {
	aiAgentLogger.startExecution({
		tool: 'Facebook Tool',
		action,
		pageId,
		executionId: `fb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
	});
	
	aiAgentLogger.log('starting', `Executing ${action}`, {
		arguments: args,
		validation: 'passed'
	});
}

export function logAIAgentSuccess(action: string, message: string, data?: any): string {
	aiAgentLogger.log('success', message, data);
	aiAgentLogger.endExecution('success', `${action} completed successfully`, data);
	return aiAgentLogger.formatResult(action, true, data);
}

export function logAIAgentError(action: string, error: string | Error, data?: any): string {
	const errorMessage = error instanceof Error ? error.message : error;
	aiAgentLogger.log('error', errorMessage, { error: errorMessage, ...data });
	aiAgentLogger.endExecution('error', `${action} failed: ${errorMessage}`, data);
	return aiAgentLogger.formatResult(action, false, { error: errorMessage });
}

export function logAIAgentInfo(message: string, data?: any): void {
	aiAgentLogger.log('info', message, data);
}

export function logAIAgentWarning(message: string, data?: any): void {
	aiAgentLogger.log('warning', message, data);
}