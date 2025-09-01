/**
 * Facebook Tool Action Definitions and Preset Configurations
 * This file contains all action categories, preset configurations, and TypeScript interfaces
 * for the Facebook Tool task selector feature.
 */

// TypeScript Interfaces for Configuration Models

export interface FacebookToolConfig {
	pageId: string;
	description: string;
	actionPreset: 'all' | 'content_creator' | 'community_manager' | 'analytics_only' | 'customer_support' | 'custom';
	allowedActions: string[];
	taskParameters?: TaskParameters;
}

export interface TaskParameters {
	defaultPostLimit?: number;
	defaultCommentLimit?: number;
	autoModeration?: boolean;
	defaultPostType?: 'text' | 'photo' | 'video' | 'link';
}

export interface ActionDefinition {
	name: string;
	value: string;
	description: string;
	category: string;
	requiredParams: string[];
	optionalParams: string[];
}

export interface ActionCategory {
	name: string;
	value: string;
	description: string;
	actions: ActionDefinition[];
}

// Action Category Constants with all Facebook operations

export const ACTION_CATEGORIES: ActionCategory[] = [
	{
		name: 'Posts',
		value: 'posts_group',
		description: 'Create, read, update, and delete Facebook posts',
		actions: [
			{
				name: 'Create Text Post',
				value: 'create_text_post',
				description: 'Create a text-only post on the Facebook page',
				category: 'posts',
				requiredParams: ['message'],
				optionalParams: []
			},
			{
				name: 'Create Photo Post',
				value: 'create_photo_post',
				description: 'Create a post with an image on the Facebook page',
				category: 'posts',
				requiredParams: ['imageUrl'],
				optionalParams: ['message']
			},
			{
				name: 'Create Video Post',
				value: 'create_video_post',
				description: 'Create a post with a video on the Facebook page',
				category: 'posts',
				requiredParams: ['videoUrl'],
				optionalParams: ['message']
			},
			{
				name: 'Create Link Post',
				value: 'create_link_post',
				description: 'Create a post with a shared link on the Facebook page',
				category: 'posts',
				requiredParams: ['link'],
				optionalParams: ['message']
			},
			{
				name: 'Get Posts',
				value: 'get_posts',
				description: 'Retrieve a list of posts from the Facebook page',
				category: 'posts',
				requiredParams: [],
				optionalParams: ['limit']
			},
			{
				name: 'Get Specific Post',
				value: 'get_post',
				description: 'Retrieve details of a specific post by ID',
				category: 'posts',
				requiredParams: ['postId'],
				optionalParams: []
			},
			{
				name: 'Update Post',
				value: 'update_post',
				description: 'Update the text content of an existing post',
				category: 'posts',
				requiredParams: ['postId', 'message'],
				optionalParams: []
			},
			{
				name: 'Delete Post',
				value: 'delete_post',
				description: 'Delete a post from the Facebook page',
				category: 'posts',
				requiredParams: ['postId'],
				optionalParams: []
			}
		]
	},
	{
		name: 'Comments',
		value: 'comments_group',
		description: 'Manage comments on Facebook posts',
		actions: [
			{
				name: 'Get Comments',
				value: 'get_comments',
				description: 'Retrieve comments from a specific post',
				category: 'comments',
				requiredParams: ['postId'],
				optionalParams: ['limit']
			},
			{
				name: 'Create Comment',
				value: 'create_comment',
				description: 'Add a comment to a specific post',
				category: 'comments',
				requiredParams: ['postId', 'message'],
				optionalParams: []
			},
			{
				name: 'Create Comment with Image',
				value: 'create_comment_with_image',
				description: 'Add a comment with an image to a specific post',
				category: 'comments',
				requiredParams: ['postId', 'imageUrl'],
				optionalParams: ['message']
			},
			{
				name: 'Delete Comment',
				value: 'delete_comment',
				description: 'Remove a comment from a post',
				category: 'comments',
				requiredParams: ['commentId'],
				optionalParams: []
			}
		]
	},
	{
		name: 'Messages',
		value: 'messages_group',
		description: 'Send direct messages to users',
		actions: [
			{
				name: 'Send Text Message',
				value: 'send_text_message',
				description: 'Send a text message to a user via Facebook Messenger',
				category: 'messages',
				requiredParams: ['recipientId', 'message'],
				optionalParams: []
			},
			{
				name: 'Send Image Message',
				value: 'send_image_message',
				description: 'Send an image message to a user via Facebook Messenger',
				category: 'messages',
				requiredParams: ['recipientId', 'imageUrl'],
				optionalParams: []
			}
		]
	},
	{
		name: 'Insights',
		value: 'insights_group',
		description: 'Access Facebook analytics and insights data',
		actions: [
			{
				name: 'Get Page Insights',
				value: 'get_page_insights',
				description: 'Retrieve analytics data for the Facebook page',
				category: 'insights',
				requiredParams: [],
				optionalParams: []
			},
			{
				name: 'Get Post Insights',
				value: 'get_post_insights',
				description: 'Retrieve analytics data for a specific post',
				category: 'insights',
				requiredParams: ['postId'],
				optionalParams: []
			}
		]
	},
	{
		name: 'Media',
		value: 'media_group',
		description: 'Upload and manage media files',
		actions: [
			{
				name: 'Upload Photo',
				value: 'upload_photo',
				description: 'Upload a photo to the Facebook page (unpublished)',
				category: 'media',
				requiredParams: ['imageUrl'],
				optionalParams: ['message']
			},
			{
				name: 'Upload Video',
				value: 'upload_video',
				description: 'Upload a video to the Facebook page (unpublished)',
				category: 'media',
				requiredParams: ['videoUrl'],
				optionalParams: ['message']
			}
		]
	},
	{
		name: 'Events',
		value: 'events_group',
		description: 'Create and manage Facebook events',
		actions: [
			{
				name: 'Create Event',
				value: 'create_event',
				description: 'Create a new event on the Facebook page',
				category: 'events',
				requiredParams: ['eventName', 'eventStartTime'],
				optionalParams: ['eventDescription']
			},
			{
				name: 'Get Events',
				value: 'get_events',
				description: 'Retrieve a list of events from the Facebook page',
				category: 'events',
				requiredParams: [],
				optionalParams: ['limit']
			}
		]
	},
	{
		name: 'Page Info',
		value: 'page_info_group',
		description: 'Access Facebook page information',
		actions: [
			{
				name: 'Get Page Info',
				value: 'get_page_info',
				description: 'Retrieve basic information about the Facebook page',
				category: 'page_info',
				requiredParams: [],
				optionalParams: []
			}
		]
	}
];

// Preset Configurations for different user roles

export const ACTION_PRESETS: Record<string, string[]> = {
	all: [], // Empty array means all actions allowed (default behavior)
	
	content_creator: [
		'create_text_post',
		'create_photo_post',
		'create_video_post',
		'create_link_post',
		'upload_photo',
		'upload_video',
		'create_event',
		'get_posts',
		'get_post',
		'get_page_info'
	],
	
	community_manager: [
		'create_text_post',
		'get_posts',
		'get_post',
		'get_comments',
		'create_comment',
		'create_comment_with_image',
		'delete_comment',
		'get_page_insights',
		'send_text_message',
		'get_page_info'
	],
	
	analytics_only: [
		'get_posts',
		'get_post',
		'get_comments',
		'get_page_insights',
		'get_post_insights',
		'get_page_info',
		'get_events'
	],
	
	customer_support: [
		'get_comments',
		'create_comment',
		'create_comment_with_image',
		'send_text_message',
		'send_image_message',
		'get_page_info',
		'get_posts',
		'get_post'
	]
};

// Preset Descriptions for UI display

export const PRESET_DESCRIPTIONS: Record<string, string> = {
	all: 'Full access to all Facebook operations (default)',
	content_creator: 'Create and manage posts, upload media, create events',
	community_manager: 'Manage posts and comments, send messages, view insights',
	analytics_only: 'Read-only access to posts, comments, insights, and page info',
	customer_support: 'Handle customer interactions via comments and messages'
};

// Helper function to get all available actions as a flat array

export function getAllActions(): string[] {
	return ACTION_CATEGORIES.flatMap(category => 
		category.actions.map(action => action.value)
	);
}

// Helper function to get actions by category

export function getActionsByCategory(categoryValue: string): ActionDefinition[] {
	const category = ACTION_CATEGORIES.find(cat => cat.value === categoryValue);
	return category ? category.actions : [];
}

// Helper function to validate action exists

export function isValidAction(actionValue: string): boolean {
	return getAllActions().includes(actionValue);
}

// Helper function to get action definition by value

export function getActionDefinition(actionValue: string): ActionDefinition | undefined {
	for (const category of ACTION_CATEGORIES) {
		const action = category.actions.find(act => act.value === actionValue);
		if (action) {
			return action;
		}
	}
	return undefined;
}

// ===== TASK 3: PRESET LOADING AND ACTION FILTERING LOGIC =====

/**
 * Load actions based on selected preset
 * Handles preset selection and returns the appropriate action list
 */
export function loadActionsFromPreset(presetName: string): string[] {
	// Handle backward compatibility - if preset doesn't exist, default to 'all'
	if (!ACTION_PRESETS.hasOwnProperty(presetName)) {
		console.warn(`Unknown preset '${presetName}', defaulting to 'all' actions`);
		return ACTION_PRESETS.all;
	}
	
	return ACTION_PRESETS[presetName] || [];
}

/**
 * Action validation function for runtime filtering
 * Validates if a requested action is allowed based on current configuration
 */
export function validateActionPermission(requestedAction: string, allowedActions: string[]): {
	isAllowed: boolean;
	errorMessage?: string;
	actionExists?: boolean;
	suggestedActions?: string[];
} {
	// First check if the action exists at all
	const actionExists = isValidAction(requestedAction);
	
	if (!actionExists) {
		const allActions = getAllActions();
		// Find similar actions for suggestions
		const suggestedActions = allActions.filter(action => 
			action.toLowerCase().includes(requestedAction.toLowerCase()) ||
			requestedAction.toLowerCase().includes(action.toLowerCase())
		).slice(0, 3);
		
		const errorMessage = `Unknown action '${requestedAction}'. ${suggestedActions.length > 0 
			? `Did you mean: ${suggestedActions.join(', ')}?` 
			: `Available actions: ${allActions.join(', ')}`}`;
		
		return { 
			isAllowed: false, 
			errorMessage,
			actionExists: false,
			suggestedActions
		};
	}
	
	// If no restrictions are set (empty array), allow all actions
	if (!allowedActions || allowedActions.length === 0) {
		return { isAllowed: true, actionExists: true };
	}
	
	// Check if the requested action is in the allowed list
	const isAllowed = allowedActions.includes(requestedAction);
	
	if (!isAllowed) {
		// Get action definition for better error context
		const actionDef = getActionDefinition(requestedAction);
		const categoryName = actionDef ? 
			ACTION_CATEGORIES.find(cat => cat.actions.some(a => a.value === requestedAction))?.name : 
			'Unknown';
		
		// Group allowed actions by category for better readability
		const allowedByCategory: Record<string, string[]> = {};
		allowedActions.forEach(action => {
			const def = getActionDefinition(action);
			if (def) {
				const cat = ACTION_CATEGORIES.find(c => c.actions.some(a => a.value === action));
				const catName = cat?.name || 'Other';
				if (!allowedByCategory[catName]) {
					allowedByCategory[catName] = [];
				}
				allowedByCategory[catName].push(action);
			}
		});
		
		const categorizedList = Object.entries(allowedByCategory)
			.map(([category, actions]) => `${category}: ${actions.join(', ')}`)
			.join('; ');
		
		const errorMessage = `Action '${requestedAction}' (${categoryName} category) is not permitted. Allowed actions by category: ${categorizedList}`;
		
		return { 
			isAllowed: false, 
			errorMessage,
			actionExists: true,
			suggestedActions: allowedActions.slice(0, 5) // Show first 5 allowed actions as suggestions
		};
	}
	
	return { isAllowed: true, actionExists: true };
}

/**
 * Merge preset selections with custom selections
 * Handles the logic when both preset and custom actions are specified
 */
export function mergePresetWithCustomActions(
	presetName: string, 
	customActions: string[]
): string[] {
	// If preset is 'custom', use only the custom actions (filtered to remove category headers)
	if (presetName === 'custom') {
		return customActions.filter(action => !action.endsWith('_category'));
	}
	
	// For any other preset, load the preset actions and ignore custom selections
	return loadActionsFromPreset(presetName);
}

/**
 * Handle backward compatibility for existing configurations
 * Ensures existing workflows continue working without modification
 */
export function handleBackwardCompatibility(config: Partial<FacebookToolConfig>): {
	actionPreset: string;
	allowedActions: string[];
} {
	// If no actionPreset is specified, default to 'all' (existing behavior)
	const actionPreset = config.actionPreset || 'all';
	
	// If no allowedActions specified, use empty array (means all actions allowed)
	const allowedActions = config.allowedActions || [];
	
	// Handle legacy configurations that might have invalid presets
	// Note: 'custom' is a valid preset but not in ACTION_PRESETS object
	if (!ACTION_PRESETS.hasOwnProperty(actionPreset) && actionPreset !== 'custom') {
		console.warn(`Legacy configuration detected with invalid preset '${actionPreset}', defaulting to 'all'`);
		return {
			actionPreset: 'all',
			allowedActions: []
		};
	}
	
	return {
		actionPreset,
		allowedActions
	};
}

/**
 * Security logging function for monitoring restricted action attempts
 * Logs unauthorized action attempts for security monitoring and audit trails
 */
export function logSecurityEvent(eventType: 'unauthorized_action' | 'invalid_action' | 'config_change', details: {
	action?: string;
	allowedActions?: string[];
	pageId?: string;
	nodeId?: string;
	nodeName?: string;
	timestamp?: string;
	userAgent?: string;
	configChange?: {
		from: any;
		to: any;
	};
}): void {
	const logEntry = {
		level: 'SECURITY',
		eventType,
		timestamp: details.timestamp || new Date().toISOString(),
		...details
	};
	
	// Log to console with structured format for monitoring systems
	console.warn(`[FACEBOOK_TOOL_SECURITY] ${eventType.toUpperCase()}:`, JSON.stringify(logEntry, null, 2));
	
	// In production, this could also send to external monitoring services
	// Example: sendToSecurityMonitoring(logEntry);
}

/**
 * Enhanced error message generator for unauthorized actions
 * Creates user-friendly error messages with actionable guidance
 */
export function generateUnauthorizedActionError(
	requestedAction: string, 
	allowedActions: string[],
	validation: ReturnType<typeof validateActionPermission>
): string {
	const totalActions = getAllActions().length;
	const restrictionInfo = allowedActions.length > 0 
		? `${allowedActions.length}/${totalActions} actions allowed`
		: 'No restrictions (all actions allowed)';
	
	let errorMessage = `❌ ${validation.errorMessage}\n\n`;
	errorMessage += `📋 Current configuration: ${restrictionInfo}\n`;
	
	if (!validation.actionExists) {
		errorMessage += `❓ The action '${requestedAction}' does not exist.\n`;
		if (validation.suggestedActions && validation.suggestedActions.length > 0) {
			errorMessage += `💡 Did you mean: ${validation.suggestedActions.join(', ')}?\n`;
		}
	} else {
		errorMessage += `💡 To use '${requestedAction}', update your Facebook Tool configuration:\n`;
		errorMessage += `   1. Set Action Preset to 'Custom Selection'\n`;
		errorMessage += `   2. Add '${requestedAction}' to the Allowed Actions list\n`;
		
		if (validation.suggestedActions && validation.suggestedActions.length > 0) {
			errorMessage += `\n🔧 Currently available actions: ${validation.suggestedActions.join(', ')}`;
			if (allowedActions.length > 5) {
				errorMessage += ` (showing first 5 of ${allowedActions.length})`;
			}
		}
	}
	
	return errorMessage;
}

/**
 * Get final allowed actions list based on configuration
 * This is the main function that combines all the logic above
 */
export function getFinalAllowedActions(config: Partial<FacebookToolConfig>): string[] {
	// Handle backward compatibility first
	const { actionPreset, allowedActions } = handleBackwardCompatibility(config);
	
	// Merge preset with custom actions
	const finalActions = mergePresetWithCustomActions(actionPreset, allowedActions);
	
	// Validate all actions exist (security check)
	const validActions = finalActions.filter(action => isValidAction(action));
	
	// Log warning if some actions were filtered out
	if (validActions.length !== finalActions.length) {
		const invalidActions = finalActions.filter(action => !isValidAction(action));
		console.warn(`Invalid actions filtered out: ${invalidActions.join(', ')}`);
		
		// Log security event for configuration with invalid actions
		logSecurityEvent('config_change', {
			configChange: {
				from: finalActions,
				to: validActions
			},
			timestamp: new Date().toISOString()
		});
	}
	
	return validActions;
}