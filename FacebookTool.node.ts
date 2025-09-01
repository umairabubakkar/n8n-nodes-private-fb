import type {
	ILoadOptionsFunctions,
	ISupplyDataFunctions,
	INodeType,
	INodeTypeDescription,
	INodePropertyOptions,
	SupplyData,
} from 'n8n-workflow';

import { NodeConnectionType } from 'n8n-workflow';
import { 
	ACTION_CATEGORIES, 
	ACTION_PRESETS, 
	PRESET_DESCRIPTIONS, 
	getAllActions,
	getFinalAllowedActions,
	validateActionPermission,
	logSecurityEvent,
	generateUnauthorizedActionError
} from './FacebookToolConfig';
import { 
	aiAgentLogger,
	logAIAgentStart,
	logAIAgentSuccess,
	logAIAgentError,
	logAIAgentInfo,
	logAIAgentWarning
} from './FacebookAIAgentLogger';

export class FacebookTool implements INodeType {

	description: INodeTypeDescription = {
		displayName: 'Facebook Tool',
		name: 'facebookTool',
		icon: 'file:facebook.svg',
		group: ['transform'],
		version: 1,
		description: 'Facebook operations tool for AI agents - create posts, get page info, manage content with enhanced logging',
		defaults: {
			name: 'Facebook Tool',
		},
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Tools', 'Agents'],
			},
		},
		inputs: [],
		outputs: [NodeConnectionType.AiTool],
		credentials: [
			{
				name: 'facebookOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Tool Description',
				name: 'description',
				type: 'string',
				default: 'Complete Facebook page management tool with AI Agent logging: create posts (text, photo, video), get posts, manage comments, send messages, get insights, upload media, create events. Enhanced with structured logging for AI Agent visibility.',
				description: 'Description of what this tool does for the AI agent',
			},
			{
				displayName: 'Page',
				name: 'pageId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getPages',
				},
				required: true,
				default: '',
				description: 'Select the Facebook Page for AI operations',
			},
			{
				displayName: 'Action Preset',
				name: 'actionPreset',
				type: 'options',
				options: [
					{
						name: 'All Actions (Default)',
						value: 'all',
						description: PRESET_DESCRIPTIONS.all
					},
					{
						name: 'Content Creator',
						value: 'content_creator',
						description: PRESET_DESCRIPTIONS.content_creator
					},
					{
						name: 'Community Manager',
						value: 'community_manager',
						description: PRESET_DESCRIPTIONS.community_manager
					},
					{
						name: 'Analytics Only',
						value: 'analytics_only',
						description: PRESET_DESCRIPTIONS.analytics_only
					},
					{
						name: 'Customer Support',
						value: 'customer_support',
						description: PRESET_DESCRIPTIONS.customer_support
					},
					{
						name: 'Custom Selection',
						value: 'custom',
						description: 'Manually select specific actions from the list below'
					}
				],
				default: 'all',
				description: 'Choose a preset configuration or select custom to manually choose actions',
			},
			{
				displayName: 'Allowed Actions',
				name: 'allowedActions',
				type: 'multiOptions',
				displayOptions: {
					show: {
						actionPreset: ['custom'],
					},
				},
				options: (() => {
					const options: INodePropertyOptions[] = [];
					
					ACTION_CATEGORIES.forEach(category => {
						category.actions.forEach(action => {
							options.push({
								name: action.name,
								value: action.value,
								description: action.description
							});
						});
					});
					
					return options;
				})(),
				default: [],
				description: 'Select specific Facebook actions the AI Agent can perform',
			},
			{
				displayName: 'Enable Enhanced Logging',
				name: 'enableEnhancedLogging',
				type: 'boolean',
				default: true,
				description: 'Enable detailed AI Agent logging with structured output visible in n8n logs',
			},
		],
	};

	methods = {
		loadOptions: {
			async getPages(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const credentials = await this.getCredentials('facebookOAuth2Api');

					let userAccessToken = (credentials.accessToken as string) ||
						(credentials as any).access_token ||
						(credentials as any).oauthTokenData?.access_token;

					if (!userAccessToken) {
						throw new Error('No access token found. Please reconnect your Facebook account.');
					}

					const response = await this.helpers.request({
						method: 'GET',
						url: 'https://graph.facebook.com/v18.0/me/accounts',
						qs: {
							access_token: userAccessToken,
							fields: 'id,name,access_token,tasks,category',
							limit: 100,
						},
						json: true,
					});

					if (!response.data || response.data.length === 0) {
						return [{
							name: 'No Pages found - Please ensure you have admin access to at least one Facebook Page',
							value: '',
						}];
					}

					return response.data.map((page: any) => ({
						name: page.name,
						value: page.id,
					}));

				} catch (error: any) {
					throw new Error(`Failed to load Pages: ${error.message}`);
				}
			},
		},
	};

	async supplyData(this: ISupplyDataFunctions, itemIndex: number): Promise<SupplyData> {
		// Enhanced logging for n8n server console
		console.log('🚀 [FACEBOOK_TOOL] supplyData method called - AI Agent logging enabled!');
		
		const pageId = this.getNodeParameter('pageId', itemIndex) as string;
		const baseDescription = this.getNodeParameter('description', itemIndex) as string;
		const actionPreset = this.getNodeParameter('actionPreset', itemIndex, 'all') as string;
		const customAllowedActions = this.getNodeParameter('allowedActions', itemIndex, []) as string[];
		const enableEnhancedLogging = this.getNodeParameter('enableEnhancedLogging', itemIndex, true) as boolean;
		
		// Get the allowed actions based on preset or custom selection
		const allowedActions = getFinalAllowedActions({ 
			actionPreset: actionPreset as any, 
			allowedActions: customAllowedActions 
		});

		const credentials = await this.getCredentials('facebookOAuth2Api');

		let userAccessToken = (credentials.accessToken as string) ||
			(credentials as any).access_token ||
			(credentials as any).oauthTokenData?.access_token;

		if (!userAccessToken) {
			throw new Error('No access token found. Please reconnect your Facebook account.');
		}

		// Get page access token
		const pageResponse = await this.helpers.request({
			method: 'GET',
			url: 'https://graph.facebook.com/v18.0/me/accounts',
			qs: {
				access_token: userAccessToken,
				fields: 'id,name,access_token',
			},
			json: true,
		});

		const targetPage = pageResponse.data.find((page: any) => page.id === pageId);
		const pageAccessToken = targetPage?.access_token || userAccessToken;

		const self = this;
		const availableActions = allowedActions.length > 0 ? allowedActions : getAllActions();

		const tool = {
			name: 'facebook_operations',
			description: baseDescription,
			schema: {
				type: 'object',
				properties: {
					action: {
						type: 'string',
						enum: availableActions,
						description: `The Facebook action to perform. Available actions: ${availableActions.join(', ')}`
					},
					message: {
						type: 'string',
						description: 'Text content for posts or messages'
					},
					imageUrl: {
						type: 'string',
						description: 'URL of image for photo posts and image comments (system will automatically try multiple upload methods)'
					},
					imageBinary: {
						type: 'string',
						description: 'Base64 encoded image data for photo posts and image comments (alternative to imageUrl)'
					},
					videoUrl: {
						type: 'string',
						description: 'URL of video for video posts'
					},
					link: {
						type: 'string',
						description: 'URL for link posts'
					},
					postId: {
						type: 'string',
						description: 'Post ID for operations on specific posts'
					},
					commentId: {
						type: 'string',
						description: 'Comment ID for comment operations'
					},
					recipientId: {
						type: 'string',
						description: 'Recipient ID for sending messages'
					},
					limit: {
						type: 'number',
						description: 'Number of items to retrieve (default: 25)'
					}
				},
				required: ['action']
			},
			invoke: async (args: any) => {
				try {
					const { action } = args;
					
					// Enhanced console logging for n8n server
					console.log(`🔵 [FACEBOOK_TOOL] AI Agent invoked action: ${action}`, {
						pageId: pageId,
						args: args,
						timestamp: new Date().toISOString()
					});
					
					// Initialize AI Agent logging if enabled
					if (enableEnhancedLogging) {
						logAIAgentStart(action, pageId, args);
						logAIAgentInfo(`Executing Facebook action: ${action}`, {
							pageId: pageId,
							arguments: args,
							allowedActionsCount: allowedActions.length || 'unlimited',
							preset: actionPreset
						});
					}

					// Validate action is allowed
					const validation = validateActionPermission(action, allowedActions);
					if (!validation.isAllowed) {
						const eventType = validation.actionExists ? 'unauthorized_action' : 'invalid_action';
						logSecurityEvent(eventType, {
							action: action,
							allowedActions: allowedActions,
							pageId: pageId,
							nodeId: self.getNode().id || 'Unknown',
							nodeName: self.getNode().name || 'Unknown',
							timestamp: new Date().toISOString()
						});

						if (enableEnhancedLogging) {
							logAIAgentWarning(`Action '${action}' not permitted`, {
								validation: validation,
								allowedActions: allowedActions.slice(0, 5)
							});
						}

						const errorMessage = generateUnauthorizedActionError(action, allowedActions, validation);
						return enableEnhancedLogging ? logAIAgentError(action, errorMessage) : errorMessage;
					}

					// Execute the action
					switch (action) {
						case 'create_text_post':
							if (!args.message) {
								const errorMessage = `❌ Error: Message is required for text posts

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Error
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}
- Error: Missing required parameter 'message'

💡 Fix: Provide a message parameter with your text content.`;

								if (enableEnhancedLogging) {
									console.log(`❌ [FACEBOOK_TOOL] ${action} failed: Message required`);
									logAIAgentError(action, 'Message is required for text posts');
								}
								return errorMessage;
							}

							if (enableEnhancedLogging) {
								logAIAgentInfo('Creating text post', { messageLength: args.message.length });
							}

							const textPostResponse = await self.helpers.request({
								method: 'POST',
								url: `https://graph.facebook.com/v18.0/${pageId}/feed`,
								form: {
									message: args.message,
									access_token: pageAccessToken,
								},
								json: true,
							});

							const textSuccessData = { 
								postId: textPostResponse.id, 
								message: args.message,
								url: `https://facebook.com/${textPostResponse.id}`
							};
							
							// Enhanced logging for AI Agent visibility
							const textPostLogMessage = `✅ Text post created successfully!
📝 Post ID: ${textPostResponse.id}
💬 Message: ${args.message}
🔗 URL: https://facebook.com/${textPostResponse.id}

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Success
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}`;

							if (enableEnhancedLogging) {
								console.log(`✅ [FACEBOOK_TOOL] ${action} completed successfully`, textSuccessData);
								logAIAgentSuccess(action, 'Text post created successfully', textSuccessData);
							}
							
							return textPostLogMessage;

						case 'create_photo_post':
							if (!args.imageUrl) {
								const errorMessage = `❌ Error: Image URL is required for photo posts

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Error
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}
- Error: Missing required parameter 'imageUrl'

💡 Fix: Provide an imageUrl parameter with a publicly accessible image URL.`;

								if (enableEnhancedLogging) {
									console.log(`❌ [FACEBOOK_TOOL] ${action} failed: Image URL required`);
									logAIAgentError(action, 'Image URL is required for photo posts');
								}
								return errorMessage;
							}

							if (enableEnhancedLogging) {
								logAIAgentInfo('Creating photo post', { 
									imageUrl: args.imageUrl,
									hasCaption: !!args.message 
								});
							}

							const photoPostResponse = await self.helpers.request({
								method: 'POST',
								url: `https://graph.facebook.com/v18.0/${pageId}/photos`,
								form: {
									url: args.imageUrl,
									caption: args.message || '',
									access_token: pageAccessToken,
								},
								json: true,
							});

							const photoSuccessData = { 
								postId: photoPostResponse.post_id, 
								imageUrl: args.imageUrl,
								caption: args.message
							};
							
							// Enhanced logging for AI Agent visibility
							const photoPostLogMessage = `✅ Photo post created successfully!
📝 Post ID: ${photoPostResponse.post_id}
🖼️ Image URL: ${args.imageUrl}
💬 Caption: ${args.message || 'No caption'}

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Success
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}`;

							if (enableEnhancedLogging) {
								console.log(`✅ [FACEBOOK_TOOL] ${action} completed successfully`, photoSuccessData);
								logAIAgentSuccess(action, 'Photo post created successfully', photoSuccessData);
							}
							
							return photoPostLogMessage;

						case 'get_posts':
							const limit = args.limit || 25;

							if (enableEnhancedLogging) {
								logAIAgentInfo('Retrieving posts', { limit: limit });
							}

							const postsResponse = await self.helpers.request({
								method: 'GET',
								url: `https://graph.facebook.com/v18.0/${pageId}/posts`,
								qs: {
									fields: 'id,message,created_time,likes.summary(true),comments.summary(true)',
									limit: limit,
									access_token: pageAccessToken,
								},
								json: true,
							});

							const postsSuccessData = { 
								count: postsResponse.data.length, 
								limit: limit,
								posts: postsResponse.data.map((p: any) => ({ 
									id: p.id, 
									message: p.message?.substring(0, 50),
									likes: p.likes?.summary?.total_count || 0,
									comments: p.comments?.summary?.total_count || 0
								}))
							};
							
							// Format posts for display
							const postsDisplay = postsResponse.data.slice(0, 3).map((post: any, index: number) => 
								`${index + 1}. Post ID: ${post.id}
   Message: ${post.message?.substring(0, 100) || 'No text'}${post.message?.length > 100 ? '...' : ''}
   Likes: ${post.likes?.summary?.total_count || 0} | Comments: ${post.comments?.summary?.total_count || 0}
   Created: ${new Date(post.created_time).toLocaleDateString()}`
							).join('\n\n');

							const getPostsLogMessage = `📋 Posts Retrieved Successfully!
📊 Total Posts: ${postsResponse.data.length}
🔢 Limit: ${limit}

${postsResponse.data.length > 0 ? `📝 Recent Posts:\n${postsDisplay}${postsResponse.data.length > 3 ? `\n\n... and ${postsResponse.data.length - 3} more posts` : ''}` : 'No posts found'}

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Success
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}`;

							if (enableEnhancedLogging) {
								console.log(`✅ [FACEBOOK_TOOL] ${action} completed successfully`, postsSuccessData);
								logAIAgentSuccess(action, `Retrieved ${postsResponse.data.length} posts`, postsSuccessData);
							}
							
							return getPostsLogMessage;

						case 'get_comments':
							if (!args.postId) {
								const error = 'Post ID is required to get comments';
								return enableEnhancedLogging ? logAIAgentError(action, error) : `Error: ${error}`;
							}

							if (enableEnhancedLogging) {
								logAIAgentInfo('Retrieving comments', { 
									postId: args.postId,
									limit: args.limit || 25 
								});
							}

							const commentsResponse = await self.helpers.request({
								method: 'GET',
								url: `https://graph.facebook.com/v18.0/${args.postId}/comments`,
								qs: {
									fields: 'id,message,created_time,from,like_count',
									limit: args.limit || 25,
									access_token: pageAccessToken,
								},
								json: true,
							});

							const commentsSuccessData = {
								postId: args.postId,
								count: commentsResponse.data.length,
								limit: args.limit || 25,
								comments: commentsResponse.data.map((c: any) => ({
									id: c.id,
									author: c.from.name,
									message: c.message?.substring(0, 50),
									likes: c.like_count || 0
								}))
							};
							
							// Format comments for display
							const commentsDisplay = commentsResponse.data.slice(0, 3).map((comment: any, index: number) => 
								`${index + 1}. ${comment.from.name}: ${comment.message?.substring(0, 80) || 'No text'}${comment.message?.length > 80 ? '...' : ''}
   Likes: ${comment.like_count || 0} | Time: ${new Date(comment.created_time).toLocaleDateString()}`
							).join('\n\n');

							const getCommentsLogMessage = `💬 Comments Retrieved Successfully!
📊 Total Comments: ${commentsResponse.data.length}
📝 Post ID: ${args.postId}
🔢 Limit: ${args.limit || 25}

${commentsResponse.data.length > 0 ? `💬 Recent Comments:\n${commentsDisplay}${commentsResponse.data.length > 3 ? `\n\n... and ${commentsResponse.data.length - 3} more comments` : ''}` : 'No comments found'}

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Success
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}`;

							if (enableEnhancedLogging) {
								console.log(`✅ [FACEBOOK_TOOL] ${action} completed successfully`, commentsSuccessData);
								logAIAgentSuccess(action, `Retrieved ${commentsResponse.data.length} comments`, commentsSuccessData);
							}
							
							return getCommentsLogMessage;

						case 'create_comment':
							if (!args.postId || !args.message) {
								const error = 'Post ID and message are required';
								return enableEnhancedLogging ? logAIAgentError(action, error) : `Error: ${error}`;
							}

							const commentResponse = await self.helpers.request({
								method: 'POST',
								url: `https://graph.facebook.com/v18.0/${args.postId}/comments`,
								form: {
									message: args.message,
									access_token: pageAccessToken,
								},
								json: true,
							});

							const commentSuccessData = {
								commentId: commentResponse.id,
								postId: args.postId,
								message: args.message
							};
							
							const createCommentLogMessage = `✅ Comment created successfully!
💬 Comment ID: ${commentResponse.id}
📝 Post ID: ${args.postId}
💭 Message: ${args.message}

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Success
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}`;

							if (enableEnhancedLogging) {
								console.log(`✅ [FACEBOOK_TOOL] ${action} completed successfully`, commentSuccessData);
								logAIAgentSuccess(action, 'Comment created successfully', commentSuccessData);
							}
							
							return createCommentLogMessage;

						case 'create_comment_with_image':
							if (!args.postId || (!args.imageUrl && !args.imageBinary)) {
								const errorMessage = `❌ Error: Post ID and image (URL or binary data) are required for image comments

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Error
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}
- Error: Missing required parameters 'postId' and/or image data

💡 Fix: Provide postId and either imageUrl or imageBinary parameters. Message is optional.`;

								if (enableEnhancedLogging) {
									console.log(`❌ [FACEBOOK_TOOL] ${action} failed: Post ID and image data required`);
									logAIAgentError(action, 'Post ID and image data are required for image comments');
								}
								return errorMessage;
							}

							const inputType = args.imageUrl ? 'url' : 'binary';
							const imageSource = args.imageUrl || 'binary data';

							if (enableEnhancedLogging) {
								logAIAgentInfo('Creating comment with image', { 
									postId: args.postId,
									imageSource: imageSource,
									inputType: inputType,
									hasMessage: !!args.message 
								});
							}

							// Declare variables in outer scope
							let imageCommentResponse: any;
							let uploadMethod = 'direct_url';

							try {
								// Method 1: Try direct attachment_url first (only for URL inputs)
								
								if (inputType === 'url') {
									try {
										imageCommentResponse = await self.helpers.request({
											method: 'POST',
											url: `https://graph.facebook.com/v18.0/${args.postId}/comments`,
											form: {
												message: args.message || '',
												attachment_url: args.imageUrl,
												access_token: pageAccessToken,
											},
											json: true,
										});
									} catch (directUrlError: any) {
										if (enableEnhancedLogging) {
											logAIAgentWarning('Direct URL method failed, trying upload method', { 
												error: directUrlError.message 
											});
										}
										throw directUrlError; // Let it fall through to upload method
									}
								} else {
									// For binary data, skip direct URL method
									throw new Error('Binary data requires upload method');
								}

								// If we get here, direct URL method worked
								const imageCommentSuccessData = {
									commentId: imageCommentResponse.id,
									postId: args.postId,
									imageSource: imageSource,
									inputType: inputType,
									uploadMethod: uploadMethod,
									message: args.message || 'No text'
								};
								
								const createImageCommentLogMessage = `✅ Image comment created successfully!
💬 Comment ID: ${imageCommentResponse.id}
📝 Post ID: ${args.postId}
🖼️ Image: ${imageSource}
💭 Message: ${args.message || 'No text message'}
🔄 Method: ${uploadMethod}

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Success
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}`;

								if (enableEnhancedLogging) {
									console.log(`✅ [FACEBOOK_TOOL] ${action} completed successfully`, imageCommentSuccessData);
									logAIAgentSuccess(action, 'Image comment created successfully', imageCommentSuccessData);
								}
								
								return createImageCommentLogMessage;

							} catch (directUrlError: any) {
								// Method 2: Upload image first, then use attachment_id
								uploadMethod = 'upload_first';
								
								if (enableEnhancedLogging) {
									logAIAgentWarning('Direct method failed, trying upload method', { 
										error: directUrlError.message 
									});
								}

								try {
									let imageBuffer: Buffer;
									let fileName = 'comment_image.jpg';

									// Get image buffer based on input type
									if (inputType === 'url') {
										// Download the image
										imageBuffer = await self.helpers.request({
											method: 'GET',
											url: args.imageUrl,
											encoding: null, // Important: get binary data
										});
										fileName = args.imageUrl.split('/').pop() || 'comment_image.jpg';
									} else {
										// Convert base64 to buffer
										imageBuffer = Buffer.from(args.imageBinary, 'base64');
										fileName = 'comment_image.jpg'; // Could be improved with proper detection
									}

									// Step 2: Upload image to Facebook
									const uploadResponse = await self.helpers.request({
										method: 'POST',
										url: `https://graph.facebook.com/v18.0/${pageId}/photos`,
										formData: {
											source: {
												value: imageBuffer,
												options: {
													filename: fileName,
													contentType: 'image/jpeg',
												},
											},
											published: 'false', // Don't publish as post, just upload
											access_token: pageAccessToken,
										},
										json: true,
									});

									// Step 3: Create comment with uploaded image ID
									imageCommentResponse = await self.helpers.request({
										method: 'POST',
										url: `https://graph.facebook.com/v18.0/${args.postId}/comments`,
										form: {
											message: args.message || '',
											attachment_id: uploadResponse.id,
											access_token: pageAccessToken,
										},
										json: true,
									});

									const uploadSuccessData = {
										commentId: imageCommentResponse.id,
										postId: args.postId,
										imageSource: imageSource,
										inputType: inputType,
										uploadMethod: uploadMethod,
										message: args.message || 'No text'
									};
									
									const uploadLogMessage = `✅ Image comment created successfully!
💬 Comment ID: ${imageCommentResponse.id}
📝 Post ID: ${args.postId}
🖼️ Image: ${imageSource}
💭 Message: ${args.message || 'No text message'}
🔄 Method: ${uploadMethod}

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Success
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}`;

									if (enableEnhancedLogging) {
										console.log(`✅ [FACEBOOK_TOOL] ${action} completed successfully`, uploadSuccessData);
										logAIAgentSuccess(action, 'Image comment created successfully', uploadSuccessData);
									}
									
									return uploadLogMessage;

								} catch (uploadError: any) {
									// Method 3: Try resumable upload API
									uploadMethod = 'resumable_upload';
									
									if (enableEnhancedLogging) {
										logAIAgentWarning('Standard upload failed, trying resumable upload', { 
											error: uploadError.message 
										});
									}

									try {
										// Get app ID from credentials or use a default approach
										const appId = (credentials as any).clientId || (credentials as any).appId;
										if (!appId) {
											throw new Error('App ID not found in credentials. Cannot use resumable upload.');
										}

										let imageBuffer: Buffer;
										let fileName = 'comment_image.jpg';

										// Get image buffer based on input type
										if (inputType === 'url') {
											// Download the image
											imageBuffer = await self.helpers.request({
												method: 'GET',
												url: args.imageUrl,
												encoding: null,
											});
											fileName = args.imageUrl.split('/').pop() || 'image.jpg';
										} else {
											// Convert base64 to buffer
											imageBuffer = Buffer.from(args.imageBinary, 'base64');
											fileName = 'comment_image.jpg';
										}

										const fileLength = Buffer.byteLength(imageBuffer);
										const fileType = 'image/jpeg'; // Default, could be improved with proper detection

										// Step 2: Start upload session
										const uploadSessionResponse = await self.helpers.request({
											method: 'POST',
											url: `https://graph.facebook.com/v18.0/${appId}/uploads`,
											qs: {
												file_name: fileName,
												file_length: fileLength,
												file_type: fileType,
												access_token: userAccessToken,
											},
											json: true,
										});

										const uploadSessionId = uploadSessionResponse.id;

										// Step 3: Upload the file
										const uploadResponse = await self.helpers.request({
											method: 'POST',
											url: `https://graph.facebook.com/v18.0/${uploadSessionId}`,
											headers: {
												'Authorization': `OAuth ${userAccessToken}`,
												'file_offset': '0',
											},
											body: imageBuffer,
											json: true,
										});

										const fileHandle = uploadResponse.h;

										// Step 4: Create comment with file handle
										imageCommentResponse = await self.helpers.request({
											method: 'POST',
											url: `https://graph.facebook.com/v18.0/${args.postId}/comments`,
											form: {
												message: args.message || '',
												attachment_id: fileHandle,
												access_token: pageAccessToken,
											},
											json: true,
										});

										const resumableSuccessData = {
											commentId: imageCommentResponse.id,
											postId: args.postId,
											imageSource: imageSource,
											inputType: inputType,
											uploadMethod: uploadMethod,
											message: args.message || 'No text'
										};
										
										const resumableLogMessage = `✅ Image comment created successfully!
💬 Comment ID: ${imageCommentResponse.id}
📝 Post ID: ${args.postId}
🖼️ Image: ${imageSource}
💭 Message: ${args.message || 'No text message'}
🔄 Method: ${uploadMethod}

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Success
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}`;

										if (enableEnhancedLogging) {
											console.log(`✅ [FACEBOOK_TOOL] ${action} completed successfully via resumable upload`, resumableSuccessData);
											logAIAgentSuccess(action, 'Image comment created successfully via resumable upload', resumableSuccessData);
										}
										
										return resumableLogMessage;

									} catch (resumableError: any) {
										const finalError = `Failed to upload image using all methods: ${resumableError.message}`;
										if (enableEnhancedLogging) {
											logAIAgentError(action, finalError, { 
												originalError: uploadError.message,
												resumableError: resumableError.message 
											});
										}
										throw new Error(finalError);
									}
								}
							}

						case 'get_page_info':
							const pageInfoResponse = await self.helpers.request({
								method: 'GET',
								url: `https://graph.facebook.com/v18.0/${pageId}`,
								qs: {
									fields: 'id,name,category,fan_count,followers_count,about',
									access_token: pageAccessToken,
								},
								json: true,
							});

							const pageInfoData = {
								id: pageInfoResponse.id,
								name: pageInfoResponse.name,
								category: pageInfoResponse.category,
								fans: pageInfoResponse.fan_count,
								followers: pageInfoResponse.followers_count,
								about: pageInfoResponse.about
							};
							
							const getPageInfoLogMessage = `📋 Page Information Retrieved Successfully!
📄 Page Name: ${pageInfoResponse.name}
🆔 Page ID: ${pageInfoResponse.id}
📂 Category: ${pageInfoResponse.category}
👥 Fans: ${pageInfoResponse.fan_count || 'N/A'}
👥 Followers: ${pageInfoResponse.followers_count || 'N/A'}
📝 About: ${pageInfoResponse.about?.substring(0, 100) || 'No description'}${pageInfoResponse.about?.length > 100 ? '...' : ''}

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Success
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}`;

							if (enableEnhancedLogging) {
								console.log(`✅ [FACEBOOK_TOOL] ${action} completed successfully`, pageInfoData);
								logAIAgentSuccess(action, 'Page info retrieved successfully', pageInfoData);
							}
							
							return getPageInfoLogMessage;

						default:
							const error = `Unknown action: ${action}`;
							return enableEnhancedLogging ? logAIAgentError(action, error) : `Error: ${error}`;
					}

				} catch (error: any) {
					const errorMessage = error.message || 'Unknown error occurred';
					const action = args?.action || 'unknown_action';
					
					const formattedError = `❌ Facebook Tool Error: ${errorMessage}

📊 Execution Log:
- Tool: Facebook Tool
- Action: ${action}
- Status: Error
- Timestamp: ${new Date().toISOString()}
- Page ID: ${pageId}
- Error Details: ${errorMessage}

💡 Common Solutions:
- Check your Facebook page permissions
- Verify your access token is valid
- Ensure the page ID is correct
- Check if the action is allowed for your page role`;

					if (enableEnhancedLogging) {
						console.log(`❌ [FACEBOOK_TOOL] ${action} failed with error:`, {
							error: errorMessage,
							args: args,
							pageId: pageId,
							timestamp: new Date().toISOString()
						});
						logAIAgentError(action, errorMessage, {
							error: error,
							args: args,
							pageId: pageId,
							stack: error.stack
						});
					}
					
					return formattedError;
				}
			}
		};

		return {
			response: tool,
		};
	}
}