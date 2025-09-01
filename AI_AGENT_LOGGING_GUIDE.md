# Facebook Tool AI Agent Logging Guide

## Overview

The Facebook Tool now includes enhanced AI Agent logging that provides structured, visible logs in the n8n AI Agent interface. This logging system helps you monitor, debug, and understand what your AI agents are doing with Facebook operations.

## Features

### 🔍 Structured Logging
- **Execution Context**: Each operation is tracked with full context including timestamps, action types, and parameters
- **Status Tracking**: Clear success/error/warning status indicators
- **Performance Metrics**: Duration tracking for all operations
- **Data Capture**: Structured data capture for results and errors

### 📊 AI Agent Visibility
- **Console Integration**: Logs appear in n8n server console with structured format
- **AI Agent History**: Operations are tracked in AI Agent conversation history
- **Error Context**: Detailed error information with actionable guidance
- **Execution Summary**: Summary reports of all operations performed

### 🛡️ Security Monitoring
- **Action Validation**: Unauthorized action attempts are logged and blocked
- **Permission Tracking**: Security events are logged for audit trails
- **Configuration Changes**: Changes to allowed actions are monitored

## How It Works

### 1. Execution Initialization
When an AI Agent calls the Facebook Tool, the logging system:
```typescript
logAIAgentStart(action, pageId, args);
```
- Creates execution context
- Logs the starting operation
- Begins performance tracking

### 2. Operation Logging
During execution:
```typescript
logAIAgentInfo('Creating text post', { messageLength: args.message.length });
```
- Logs progress updates
- Captures relevant data
- Tracks intermediate steps

### 3. Result Logging
On completion:
```typescript
return logAIAgentSuccess(action, 'Text post created successfully', successData);
```
- Logs final results
- Captures output data
- Calculates execution time
- Formats results for AI Agent display

### 4. Error Handling
On errors:
```typescript
return logAIAgentError(action, errorMessage, errorContext);
```
- Logs detailed error information
- Provides troubleshooting context
- Suggests resolution steps

## Log Format

### Console Output
```
[AI_AGENT_LOG][SUCCESS] [Facebook Tool:create_text_post] [2025-01-09T10:30:45.123Z] Text post created successfully
Data: {
  "postId": "123456789_987654321",
  "message": "Hello from AI Agent!",
  "url": "https://facebook.com/123456789_987654321",
  "duration": "1250ms"
}
```

### AI Agent Display
```
✅ create_text_post - Success
📝 Post ID: 123456789_987654321
🔗 URL: https://facebook.com/123456789_987654321
💬 Message: Hello from AI Agent!

📋 Execution Details:
- Tool: Facebook Tool
- Action: create_text_post
- Status: Success
- Timestamp: 2025-01-09T10:30:45.123Z
- Duration: 1250ms
- Page ID: 123456789
```

## Configuration

### Enable Enhanced Logging
In your Facebook Tool node configuration:
1. Set **Enable Enhanced Logging** to `true` (default)
2. This enables structured AI Agent logging
3. When disabled, basic error messages are returned

### Action Presets and Logging
Different action presets provide different logging contexts:
- **All Actions**: Full logging for all operations
- **Content Creator**: Focused logging for content operations
- **Community Manager**: Enhanced logging for engagement operations
- **Analytics Only**: Read-only operation logging
- **Customer Support**: Customer interaction logging

## Monitoring and Debugging

### Server Console
Check your n8n server console for detailed logs:
```bash
# Look for AI Agent logs
grep "AI_AGENT_LOG" /path/to/n8n/logs

# Filter by status
grep "AI_AGENT_LOG.*SUCCESS" /path/to/n8n/logs
grep "AI_AGENT_LOG.*ERROR" /path/to/n8n/logs
```

### AI Agent Interface
In the n8n AI Agent chat:
1. Operations are logged in real-time
2. Results include execution summaries
3. Errors provide troubleshooting guidance
4. History shows all performed operations

### Execution Summary
The logging system provides execution summaries:
```
📊 Execution Summary:
- Total Operations: 5
- Successful: 4
- Errors: 1
- Success Rate: 80%

🕒 Recent Operations:
  ✅ create_text_post: Text post created successfully
  ✅ get_posts: Retrieved 10 posts
  ❌ create_photo_post: Image URL not accessible
```

## Security and Audit

### Security Event Logging
Unauthorized actions are logged:
```json
{
  "level": "SECURITY",
  "eventType": "unauthorized_action",
  "timestamp": "2025-01-09T10:30:45.123Z",
  "action": "delete_post",
  "allowedActions": ["create_text_post", "get_posts"],
  "pageId": "123456789",
  "nodeId": "node-123",
  "nodeName": "Facebook Tool"
}
```

### Audit Trail
All operations are logged with:
- Timestamp
- User context
- Action performed
- Parameters used
- Results obtained
- Execution time

## Troubleshooting

### Common Issues

**Logs not appearing in AI Agent**
- Ensure "Enable Enhanced Logging" is set to `true`
- Check n8n server console for log output
- Verify AI Agent is properly configured

**Performance Issues**
- Logging adds minimal overhead (~5-10ms per operation)
- Disable logging for high-frequency operations if needed
- Monitor execution times in logs

**Security Warnings**
- Review action presets if getting unauthorized action errors
- Check allowed actions configuration
- Verify Facebook permissions

### Debug Mode
For detailed debugging:
1. Enable enhanced logging
2. Check server console output
3. Review AI Agent conversation history
4. Use execution summary for overview

## Best Practices

### 1. Logging Configuration
- Keep enhanced logging enabled for development
- Consider disabling for high-frequency production workflows
- Use appropriate action presets for security

### 2. Monitoring
- Regularly review security logs
- Monitor execution times for performance
- Check success rates for reliability

### 3. Error Handling
- Use structured error information for troubleshooting
- Review error context for resolution steps
- Monitor unauthorized action attempts

### 4. Performance
- Logging is optimized for minimal impact
- Structured data is captured efficiently
- Console output is formatted for readability

## Integration with n8n AI Agents

### LangChain Integration
The Facebook Tool works seamlessly with n8n's LangChain AI Agent nodes:
- Structured tool responses
- Clear action descriptions
- Proper error handling
- Context preservation

### Agent Workflows
Example AI Agent workflow:
```
AI Agent → Facebook Tool (create_text_post) → Success Response
       → Facebook Tool (get_posts) → Posts Retrieved
       → Facebook Tool (create_comment) → Comment Added
```

Each step is logged with full context and results.

### Conversation History
AI Agents maintain conversation history including:
- Tool invocations
- Parameters passed
- Results received
- Error messages
- Execution summaries

This enables AI agents to learn from previous operations and make better decisions.

## API Reference

### Logging Functions
```typescript
// Start execution logging
logAIAgentStart(action: string, pageId: string, args: any): void

// Log success with structured data
logAIAgentSuccess(action: string, message: string, data?: any): string

// Log error with context
logAIAgentError(action: string, error: string | Error, data?: any): string

// Log informational messages
logAIAgentInfo(message: string, data?: any): void

// Log warnings
logAIAgentWarning(message: string, data?: any): void
```

### Logger Instance
```typescript
import { aiAgentLogger } from './FacebookAIAgentLogger';

// Get execution summary
const summary = aiAgentLogger.getExecutionSummary();

// Export logs for analysis
const history = aiAgentLogger.exportLogsForAIAgent();

// Clear logs (testing)
aiAgentLogger.clearLogs();
```

## Changelog

### Version 1.2.0
- ✅ Added comprehensive AI Agent logging system
- ✅ Structured console output for n8n server logs
- ✅ Enhanced error handling with context
- ✅ Performance tracking and metrics
- ✅ Security event logging
- ✅ Execution summaries and history
- ✅ AI Agent conversation integration

### Migration from 1.1.x
- No breaking changes
- Enhanced logging is enabled by default
- Existing workflows continue to work
- New logging features are automatically available

## Support

For issues with AI Agent logging:
1. Check this guide for configuration
2. Review n8n server console logs
3. Verify AI Agent setup
4. Check Facebook Tool configuration
5. Report issues with log examples

The enhanced logging system makes Facebook Tool operations transparent and debuggable for AI Agents, improving reliability and user experience.