# n8n-nodes-facebook-page-publisher

[![npm version](https://badge.fury.io/js/n8n-nodes-facebook-page-publisher.svg)](https://badge.fury.io/js/n8n-nodes-facebook-page-publisher)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive Facebook Page Publisher node for n8n automation platform with enhanced AI Agent logging. Create text posts and photo posts on Facebook Pages with OAuth2 authentication, automatic token management, robust error handling, and structured AI Agent logs for better monitoring and debugging.

## Installation

```bash
npm install n8n-nodes-facebook-page-publisher
```

## Features

The Facebook Page Publisher node allows you to create posts on Facebook Pages using the Facebook Graph API. This node supports both text posts and photo posts, with comprehensive error handling, validation, and enhanced AI Agent logging.

## Core Features

- **Text Posts**: Create text-only posts with optional link attachments
- **Photo Posts**: Upload photos from URLs or binary data with optional captions
- **Page Management**: Automatically fetch and select from your managed Facebook Pages
- **Token Management**: Automatic handling of short-lived to long-lived token exchange
- **Error Handling**: Comprehensive error messages with specific guidance for common issues
- **Input Validation**: Client-side validation to prevent common mistakes before API calls

## 🤖 AI Agent Features (New in v1.2.0)

- **Enhanced Logging**: Structured logging system visible in n8n AI Agent logs
- **Execution Tracking**: Full context tracking with timestamps and performance metrics
- **Error Context**: Detailed error information with troubleshooting guidance
- **Security Monitoring**: Unauthorized action logging and audit trails
- **Result Formatting**: Optimized result display for AI Agent conversations
- **Operation History**: Complete history of all AI Agent operations
- **Performance Metrics**: Duration tracking and success rate monitoring

## Prerequisites

📋 **Need help setting up Facebook credentials?** 
- **Quick Fix**: If you're getting "Failed to load Pages" error, see [QUICK_FIX_GUIDE.md](./QUICK_FIX_GUIDE.md)
- **Complete Setup**: For detailed step-by-step instructions, see [FACEBOOK_CREDENTIALS_GUIDE.md](./FACEBOOK_CREDENTIALS_GUIDE.md)

### 1. Facebook App Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or use an existing one
3. Add the "Facebook Login" product to your app
4. Configure the following settings:
   - **Valid OAuth Redirect URIs**: Add your n8n instance URL + `/rest/oauth2-credential/callback`
   - **App Domains**: Add your n8n instance domain

### 2. Required Permissions

Your Facebook app needs the following permissions:
- `pages_manage_posts` - Required to create posts on Pages
- `pages_read_engagement` - Required to read Page information
- `pages_show_list` - Required to list user's Pages

### 3. Page Access

You must have one of the following roles on the target Facebook Page:
- **Admin** - Full access to all Page features
- **Editor** - Can create and manage posts
- **Moderator** - Can create posts and moderate comments
- **Content Creator** - Can create posts (limited access)

## Configuration

### Credentials Setup

1. In n8n, create new credentials of type "Facebook OAuth2 API"
2. Fill in the following information:
   - **Client ID**: Your Facebook App ID
   - **Client Secret**: Your Facebook App Secret
3. Click "Connect my account" to authorize with Facebook
4. Grant all requested permissions during the authorization process

**Note**: Page selection is now handled automatically! After connecting your account, all your available Facebook Pages will appear in the node's Page dropdown.

### Node Configuration

1. **Page**: Select the Facebook Page where you want to post
2. **Operation**: Choose between "Create Text Post" or "Create Photo Post"

#### Text Post Parameters

- **Message** (required): The main text content of your post
  - Maximum length: 63,206 characters
  - Supports Facebook's text formatting
- **Link** (optional): URL to attach to the post
  - Must be a valid HTTP/HTTPS URL
  - Facebook will automatically generate a preview

#### Photo Post Parameters

- **Input Type**: Choose how to provide the image
  - **Image URL**: Provide a direct link to an image
  - **Binary Data**: Use image data from a previous node
- **Image URL** (for URL mode): Direct link to the image file
  - Must be publicly accessible
  - Supported formats: JPEG, PNG, GIF, WebP, BMP, TIFF
  - Maximum size: 100MB
- **Binary Property** (for binary mode): Name of the binary property containing image data
  - Default: "data"
  - Must contain valid image data
- **Caption** (optional): Text caption for the photo
  - Maximum length: 63,206 characters
- **Published**: Whether to publish immediately or save as draft
  - Default: true (publish immediately)

## Usage Examples

### Example 1: Simple Text Post

```json
{
  "operation": "createTextPost",
  "pageId": "123456789012345",
  "message": "Hello from n8n! 🚀 Check out our latest automation workflow.",
  "link": "https://n8n.io"
}
```

### Example 2: Photo Post from URL

```json
{
  "operation": "createPhotoPost",
  "pageId": "123456789012345",
  "inputType": "url",
  "imageUrl": "https://example.com/images/product-launch.jpg",
  "caption": "Exciting news! Our new product is now available. #ProductLaunch #Innovation",
  "published": true
}
```

### Example 3: Photo Post from Binary Data

```json
{
  "operation": "createPhotoPost",
  "pageId": "123456789012345",
  "inputType": "binary",
  "binaryProperty": "screenshot",
  "caption": "Weekly analytics report generated automatically by n8n",
  "published": true
}
```

## Workflow Examples

### Automated Social Media Posting

```
Trigger (Schedule) → HTTP Request (Get Content) → Facebook Page Publisher
```

This workflow automatically posts content to your Facebook Page on a schedule.

### Image Processing and Posting

```
Trigger → HTTP Request (Download Image) → Edit Image → Facebook Page Publisher
```

Download an image, apply filters or watermarks, then post to Facebook.

### Multi-Platform Publishing

```
Trigger → Set Variables → Facebook Page Publisher
                        → Twitter
                        → LinkedIn
```

Post the same content across multiple social media platforms simultaneously.

## Error Handling

The node provides detailed error messages for common issues:

### Authentication Errors
- **Invalid access token**: Reconnect your Facebook account
- **Token expired**: Reconnect your Facebook account
- **App not authorized**: Check your Facebook app configuration

### Permission Errors
- **Insufficient permissions**: Ensure your app has required permissions
- **Page access denied**: Verify you have appropriate role on the target Page
- **Missing scope**: Add required permissions to your Facebook app

### Content Errors
- **Message too long**: Facebook has a 63,206 character limit
- **Invalid image URL**: Ensure the URL is publicly accessible
- **Unsupported image format**: Use JPEG, PNG, GIF, or WebP
- **Image too large**: Maximum file size is 100MB

### Rate Limiting
- **Request limit exceeded**: Wait before making additional requests
- **App temporarily blocked**: Implement proper rate limiting

## Best Practices

### Content Guidelines
1. **Follow Facebook's Community Standards**: Ensure your content complies with Facebook's policies
2. **Avoid Spam**: Don't post identical content repeatedly
3. **Use Appropriate Hashtags**: Relevant hashtags improve discoverability
4. **Optimize Images**: Use high-quality images with appropriate dimensions

### Technical Best Practices
1. **Error Handling**: Always handle errors gracefully in your workflows
2. **Rate Limiting**: Don't exceed Facebook's API rate limits
3. **Token Management**: The node automatically handles token refresh
4. **Input Validation**: Validate your content before posting

### Security Considerations
1. **Credential Security**: Never expose your Facebook app credentials
2. **Access Control**: Limit Page access to necessary team members
3. **Regular Audits**: Periodically review app permissions and access
4. **Secure URLs**: Only use HTTPS URLs for images and links

## Troubleshooting

### Common Issues

**"Failed to load Pages: No access token found"**
- See [QUICK_FIX_GUIDE.md](./QUICK_FIX_GUIDE.md) for immediate solutions
- Most commonly fixed by reconnecting your Facebook account

**"No Pages found"**
- Ensure you have admin/editor access to at least one Facebook Page
- Check that your Facebook app has `pages_show_list` permission
- Try reconnecting your Facebook account

**"Page selection is required"**
- Select a Page from the dropdown before executing
- If dropdown is empty, check your Page permissions

**"Image URL not accessible"**
- Ensure the image URL is publicly accessible
- Check that the URL uses HTTP or HTTPS protocol
- Verify the image format is supported

**"Authentication failed"**
- Reconnect your Facebook account in the credentials
- Check that your Facebook app is active and properly configured
- Verify your app ID and secret are correct

### Debug Mode

Enable debug mode in your workflow to see detailed API responses and error information:

1. Set your workflow to "Execute Once" mode
2. Check the execution logs for detailed error messages
3. Use the "Test" button to validate individual nodes

### Getting Help

1. **Facebook Developer Documentation**: [developers.facebook.com](https://developers.facebook.com/)
2. **n8n Community**: [community.n8n.io](https://community.n8n.io/)
3. **Facebook Graph API Explorer**: Test API calls directly
4. **Facebook App Review**: For production apps requiring advanced permissions

## API Reference

This node uses Facebook Graph API v23.0:
- **Text Posts**: `POST /{page-id}/feed`
- **Photo Posts**: `POST /{page-id}/photos`
- **Page List**: `GET /me/accounts`
- **Token Exchange**: `GET /oauth/access_token`

For detailed API documentation, visit [Facebook Graph API Documentation](https://developers.facebook.com/docs/graph-api/).

## 🤖 AI Agent Usage

### Enhanced Logging
The Facebook Tool now includes comprehensive AI Agent logging that provides structured, visible logs in the n8n AI Agent interface:

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

### AI Agent Configuration
1. **Enable Enhanced Logging**: Toggle detailed AI Agent logging (default: enabled)
2. **Action Presets**: Choose from predefined action sets for different use cases
3. **Security Controls**: Restrict actions available to AI agents
4. **Performance Monitoring**: Track execution times and success rates

### Supported AI Agent Actions
- `create_text_post` - Create text-only posts
- `create_photo_post` - Create posts with images
- `get_posts` - Retrieve page posts
- `get_comments` - Get comments from posts
- `create_comment` - Add text comments to posts
- `create_comment_with_image` - Add comments with images to posts (NEW!)
- `get_page_info` - Get page information

### Example AI Agent Workflow
```
User: "Create a post about our new product launch"
AI Agent → Facebook Tool (create_text_post) → ✅ Success
AI Agent: "I've created a post about your product launch! Post ID: 123456789_987654321"

User: "Add a comment with our product image to that post"
AI Agent → Facebook Tool (create_comment_with_image) → ✅ Success
AI Agent: "I've added an image comment to your post! The image shows your product beautifully."

User: "How many likes did the post get?"
AI Agent → Facebook Tool (get_post) → ✅ Success  
AI Agent: "Your post has received 45 likes and 12 comments so far!"
```

For detailed AI Agent logging documentation, see [AI_AGENT_LOGGING_GUIDE.md](./AI_AGENT_LOGGING_GUIDE.md).

## Changelog

### Version 1.2.0 (Latest)
- ✅ **NEW**: Enhanced AI Agent logging system with structured output
- ✅ **NEW**: Execution context tracking and performance metrics
- ✅ **NEW**: Security event logging and audit trails
- ✅ **NEW**: Improved error handling with troubleshooting guidance
- ✅ **NEW**: AI Agent conversation history integration
- ✅ **ENHANCED**: Result formatting optimized for AI Agent display
- ✅ **ENHANCED**: Console logging with structured format for n8n server logs

### Version 1.1.1
- Initial release
- Support for text and photo posts
- Automatic token management
- Comprehensive error handling
- Input validation and security features