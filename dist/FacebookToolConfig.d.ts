/**
 * Facebook Tool Action Definitions and Preset Configurations
 * This file contains all action categories, preset configurations, and TypeScript interfaces
 * for the Facebook Tool task selector feature.
 */
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
export declare const ACTION_CATEGORIES: ActionCategory[];
export declare const ACTION_PRESETS: Record<string, string[]>;
export declare const PRESET_DESCRIPTIONS: Record<string, string>;
export declare function getAllActions(): string[];
export declare function getActionsByCategory(categoryValue: string): ActionDefinition[];
export declare function isValidAction(actionValue: string): boolean;
export declare function getActionDefinition(actionValue: string): ActionDefinition | undefined;
/**
 * Load actions based on selected preset
 * Handles preset selection and returns the appropriate action list
 */
export declare function loadActionsFromPreset(presetName: string): string[];
/**
 * Action validation function for runtime filtering
 * Validates if a requested action is allowed based on current configuration
 */
export declare function validateActionPermission(requestedAction: string, allowedActions: string[]): {
    isAllowed: boolean;
    errorMessage?: string;
    actionExists?: boolean;
    suggestedActions?: string[];
};
/**
 * Merge preset selections with custom selections
 * Handles the logic when both preset and custom actions are specified
 */
export declare function mergePresetWithCustomActions(presetName: string, customActions: string[]): string[];
/**
 * Handle backward compatibility for existing configurations
 * Ensures existing workflows continue working without modification
 */
export declare function handleBackwardCompatibility(config: Partial<FacebookToolConfig>): {
    actionPreset: string;
    allowedActions: string[];
};
/**
 * Security logging function for monitoring restricted action attempts
 * Logs unauthorized action attempts for security monitoring and audit trails
 */
export declare function logSecurityEvent(eventType: 'unauthorized_action' | 'invalid_action' | 'config_change', details: {
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
}): void;
/**
 * Enhanced error message generator for unauthorized actions
 * Creates user-friendly error messages with actionable guidance
 */
export declare function generateUnauthorizedActionError(requestedAction: string, allowedActions: string[], validation: ReturnType<typeof validateActionPermission>): string;
/**
 * Get final allowed actions list based on configuration
 * This is the main function that combines all the logic above
 */
export declare function getFinalAllowedActions(config: Partial<FacebookToolConfig>): string[];
//# sourceMappingURL=FacebookToolConfig.d.ts.map