# Changelog

All notable changes to the Facebook Tool for n8n will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.7] - 2025-01-09

### Changed - Package Access
- **Package Access**: Added `publishConfig: {"access": "public"}` for explicit public access
- **Note**: Private packages require npm paid subscription, keeping as public for now

## [1.3.6] - 2025-01-09

### Changed - Node Display Name Final
- **Facebook Triggers Page** → **Facebook Page Trigger** (final naming decision)
- **Consistent**: Matches original naming convention with clear purpose

## [1.3.5] - 2025-01-09

### Changed - Node Display Name Update
- **Facebook Page Triggers** → **Facebook Triggers Page** (improved naming convention)
- **Better UX**: More intuitive node name ordering in n8n interface

## [1.3.4] - 2025-01-09

### Fixed - Node Display Name
- **Fixed**: Facebook Page Trigger node display name now correctly shows "Facebook Page Triggers"
- **Issue**: Previous version showed truncated name "Facebook Page s" due to caching/build issue
- **Solution**: Rebuilt and republished to ensure proper display name registration

## [1.3.3] - 2025-01-09

### Changed - Node Display Names
- **Facebook Page Publisher** → **Facebook Page Actions** (more descriptive name for actions/operations)
- **Facebook Page Trigger** → **Facebook Page Triggers** (more descriptive name for triggers/events)
- **Improved UX**: Node names now better reflect their functionality in n8n interface

## [1.3.2] - 2025-01-09

### Fixed - Image Upload Reliability
- **Multi-Tier Upload System**: Implemented 3-tier fallback system for image uploads
  - Method 1: Direct URL (`attachment_url`) - Fast for public images
  - Method 2: Upload-First (`attachment_id`) - Reliable for most scenarios
  - Method 3: Resumable Upload API - Robust for large files and complex cases
- **Binary Data Support**: Added support for base64 encoded images via `imageBinary` parameter
- **Enhanced Error Handling**: Automatic fallback between upload methods with detailed error reporting
- **Facebook Page Publisher**: Added Image Input Type selection (URL or Binary Data)
- **Improved Validation**: Better parameter validation for both URL and binary inputs
- **Upload Method Reporting**: Response now includes which upload method was used
- **Memory Optimization**: Efficient handling of large image files

### Added
- **New Parameter**: `imageBinary` - Support for base64 encoded image data in Facebook Tool
- **New Parameter**: `imageInputType` - Selection between URL and Binary Data in Facebook Page Publisher
- **New Parameter**: `imageBinaryProperty` - Binary property name for Facebook Page Publisher
- **Documentation**: Comprehensive IMAGE_UPLOAD_FIX_GUIDE.md with troubleshooting

### Enhanced
- **Reliability**: Image uploads now work across different scenarios with automatic fallback
- **Debugging**: Enhanced logging shows which upload method was used and why
- **Performance**: Uses fastest available method while maintaining reliability
- **Compatibility**: Backward compatible with existing workflows

## [1.3.0] - 2025-01-09

### Added - Create Comment with Image Feature
- **New Action**: `create_comment_with_image` - Add comments with images to Facebook posts
- **Enhanced Comments**: Support for image attachments in comments using Facebook Graph API
- **AI Agent Integration**: Full AI Agent logging support for image comment operations
- **Preset Updates**: Added to `community_manager` and `customer_support` action presets
- **Parameter Validation**: Proper validation for postId (required) and imageUrl (required), message (optional)
- **Error Handling**: Comprehensive error messages with troubleshooting guidance
- **Structured Logging**: Detailed execution logs visible in AI Agent interface

### Enhanced
- **Tool Schema**: Updated imageUrl parameter description to include comments
- **Action Categories**: Extended comments category with image comment functionality
- **Documentation**: Updated README with new action examples and usage

### Technical Details
- **Facebook API**: Uses `attachment_url` parameter for image comments
- **Validation**: Requires both postId and imageUrl, message is optional
- **Response Format**: Structured response with comment ID, post ID, image URL, and message
- **Logging**: Full execution context with performance metrics

## [1.2.1] - 2025-01-09

### Fixed - AI Agent Logging Visibility
- ✅ **FIXED**: AI Agent logs now visible in chat interface
- ✅ **ENHANCED**: Detailed execution logs with timestamps
- ✅ **IMPROVED**: Error messages with troubleshooting guidance
- ✅ **ADDED**: Rich formatting for posts, comments, and page info

## [1.2.0] - 2025-01-09

### Added - AI Agent Logging System
- **Enhanced AI Agent Logging**: Complete logging system for AI Agent operations with structured output visible in n8n AI Agent logs
- **FacebookAIAgentLogger**: New comprehensive logging class with execution context tracking
- **Structured Console Output**: Formatted logs that appear in n8n server console with proper categorization
- **Execution Summaries**: Detailed summaries of all operations performed by AI Agents
- **Performance Metrics**: Duration tracking for all Facebook operations
- **Security Event Logging**: Monitoring and logging of unauthorized action attempts
- **Error Context**: Enhanced error messages with troubleshooting guidance and actionable steps
- **AI Agent History Integration**: Operations are properly tracked in AI Agent conversation history

### Enhanced
- **Tool Description**: Updated to highlight AI Agent logging capabilities
- **Error Handling**: Improved error messages with structured context for better debugging
- **Action Validation**: Enhanced validation with detailed feedback for unauthorized actions
- **Result Formatting**: Structured result formatting optimized for AI Agent display
- **Configuration Options**: Added "Enable Enhanced Logging" toggle for performance optimization

### Technical Improvements
- **Log Entry Structure**: Standardized log entry format with timestamps, status, and context
- **Execution Context**: Full execution context tracking with start/end lifecycle management
- **Data Capture**: Structured data capture for all operation results and errors
- **Console Integration**: Optimized console output format for n8n server log parsing
- **Memory Management**: Efficient log storage and cleanup for long-running operations

### Documentation
- **AI_AGENT_LOGGING_GUIDE.md**: Comprehensive guide for using the new logging system
- **Updated README.md**: Enhanced documentation with AI Agent logging information
- **Code Comments**: Extensive inline documentation for the logging system

### Keywords
- Added AI-related keywords: `ai-agent`, `ai-tool`, `logging`, `langchain`

### Backward Compatibility
- ✅ No breaking changes - all existing workflows continue to work
- ✅ Enhanced logging is enabled by default but can be disabled
- ✅ Existing error handling is preserved with enhanced context
- ✅ All previous functionality remains unchanged

## [1.1.1] - Previous Release

### Features
- Facebook Page Publisher node with text and photo post support
- OAuth2 authentication with automatic token management
- Comprehensive error handling and validation
- Page selection and management
- Support for text posts, photo posts, and link attachments
- Input validation and security features

### Supported Operations
- Create text posts
- Create photo posts (from URL or binary data)
- Page management and selection
- Token refresh and management
- Error handling and user guidance

### Security
- OAuth2 authentication flow
- Secure token storage and management
- Input validation and sanitization
- Rate limiting awareness

## Migration Guide

### From 1.1.x to 1.2.0

**No action required** - this is a backward-compatible update that adds new features without breaking existing functionality.

#### What's New
1. **Enhanced Logging**: AI Agent operations now include detailed logging
2. **Better Error Messages**: More informative error messages with context
3. **Performance Tracking**: Execution time tracking for all operations
4. **Security Monitoring**: Unauthorized action attempts are logged

#### Optional Configuration
- **Enable Enhanced Logging**: New boolean option (default: true)
  - Set to `false` for high-frequency operations if performance is critical
  - Keep `true` for development and debugging

#### For AI Agent Users
- Logs now appear in AI Agent conversation history
- Structured results provide better context
- Error messages include troubleshooting guidance
- Execution summaries help track operation success rates

#### For Developers
- New logging functions available for custom implementations
- Structured log format for external monitoring systems
- Security event logging for audit trails
- Performance metrics for optimization

## Roadmap

### Planned for 1.3.0
- **Advanced Analytics**: Enhanced insights and metrics collection
- **Batch Operations**: Support for bulk post creation and management
- **Media Management**: Advanced photo and video handling
- **Webhook Integration**: Real-time event processing
- **Custom Logging Destinations**: Support for external logging services

### Under Consideration
- **Multi-Page Operations**: Manage multiple Facebook pages simultaneously
- **Content Scheduling**: Advanced post scheduling capabilities
- **AI Content Generation**: Integration with AI content generation tools
- **Advanced Moderation**: Automated content moderation features

## Support

### Getting Help
1. **Documentation**: Check the comprehensive guides in this repository
2. **Issues**: Report bugs and feature requests on GitHub
3. **Community**: Join the n8n community for discussions
4. **Logging**: Use the new logging system for debugging

### Reporting Issues
When reporting issues, please include:
- n8n version
- Facebook Tool version
- Error messages from logs
- Steps to reproduce
- Expected vs actual behavior

### Contributing
We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Update documentation
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- n8n team for the excellent automation platform
- Facebook Graph API team for comprehensive API documentation
- Community contributors and testers
- AI Agent early adopters who provided valuable feedback