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
export declare class FacebookAIAgentLogger {
    private static instance;
    private executionContext;
    private logs;
    private constructor();
    static getInstance(): FacebookAIAgentLogger;
    /**
     * Initialize execution context for an AI Agent operation
     */
    startExecution(context: Omit<AIAgentExecutionContext, 'startTime'>): void;
    /**
     * End execution context and log completion
     */
    endExecution(status: 'success' | 'error', message: string, data?: any): void;
    /**
     * Log a message with structured format for AI Agent visibility
     */
    log(status: AIAgentLogEntry['status'], message: string, data?: any): AIAgentLogEntry;
    /**
     * Format log entry for console output that AI Agent can parse
     */
    private formatForConsole;
    /**
     * Get execution summary for AI Agent display
     */
    getExecutionSummary(): string;
    /**
     * Create a formatted result string for AI Agent display
     */
    formatResult(action: string, success: boolean, data: any): string;
    /**
     * Clear all logs (useful for testing)
     */
    clearLogs(): void;
    /**
     * Get all logs (useful for debugging)
     */
    getAllLogs(): AIAgentLogEntry[];
    /**
     * Export logs in a format suitable for AI Agent history
     */
    exportLogsForAIAgent(): string;
}
export declare const aiAgentLogger: FacebookAIAgentLogger;
export declare function logAIAgentStart(action: string, pageId: string, args: any): void;
export declare function logAIAgentSuccess(action: string, message: string, data?: any): string;
export declare function logAIAgentError(action: string, error: string | Error, data?: any): string;
export declare function logAIAgentInfo(message: string, data?: any): void;
export declare function logAIAgentWarning(message: string, data?: any): void;
//# sourceMappingURL=FacebookAIAgentLogger.d.ts.map