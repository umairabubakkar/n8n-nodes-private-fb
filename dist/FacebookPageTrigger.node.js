"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookPageTrigger = void 0;
class FacebookPageTrigger {
    constructor() {
        this.description = {
            displayName: 'Facebook Page Trigger',
            name: 'facebookPageTrigger',
            icon: 'file:facebook.svg',
            group: ['trigger'],
            version: 1,
            subtitle: '={{$parameter["triggerOn"]}}',
            description: 'Triggers on Facebook Page events (posts, comments, messages)',
            defaults: {
                name: 'Facebook Page Trigger',
            },
            inputs: [],
            outputs: ["main" /* NodeConnectionType.Main */],
            credentials: [
                {
                    name: 'facebookOAuth2Api',
                    required: true,
                },
            ],
            webhooks: [
                {
                    name: 'default',
                    httpMethod: 'GET',
                    responseMode: 'onReceived',
                    path: 'facebook-page-webhook',
                },
                {
                    name: 'default',
                    httpMethod: 'POST',
                    responseMode: 'onReceived',
                    path: 'facebook-page-webhook',
                },
            ],
            properties: [
                {
                    displayName: 'Page',
                    name: 'pageId',
                    type: 'options',
                    typeOptions: {
                        loadOptionsMethod: 'getPages',
                    },
                    required: true,
                    default: '',
                    description: 'Select the Facebook Page to monitor',
                },
                {
                    displayName: 'Trigger On',
                    name: 'triggerOn',
                    type: 'options',
                    options: [
                        {
                            name: 'New Post',
                            value: 'newPost',
                            description: 'Trigger when a new post is published on the page',
                        },
                        {
                            name: 'New Comment',
                            value: 'newComment',
                            description: 'Trigger when a new comment is made on page posts',
                        },
                        {
                            name: 'New Message',
                            value: 'newMessage',
                            description: 'Trigger when a new message is received',
                        },
                        {
                            name: 'Page Mention',
                            value: 'pageMention',
                            description: 'Trigger when the page is mentioned in posts or comments',
                        },
                    ],
                    default: 'newPost',
                    description: 'What event should trigger the workflow',
                },
                {
                    displayName: 'Trigger Method',
                    name: 'triggerMethod',
                    type: 'options',
                    options: [
                        {
                            name: 'Webhook (Real-time)',
                            value: 'webhook',
                            description: 'Use Facebook webhooks for real-time notifications (recommended)',
                        },
                        {
                            name: 'Polling',
                            value: 'polling',
                            description: 'Check for new events at regular intervals',
                        },
                    ],
                    default: 'webhook',
                    description: 'How to detect new events',
                },
                {
                    displayName: 'Polling Interval',
                    name: 'pollingInterval',
                    type: 'number',
                    displayOptions: {
                        show: {
                            triggerMethod: ['polling'],
                        },
                    },
                    default: 60,
                    description: 'How often to check for new events (in seconds)',
                },
                {
                    displayName: 'Webhook URL',
                    name: 'webhookUrl',
                    type: 'notice',
                    displayOptions: {
                        show: {
                            triggerMethod: ['webhook'],
                        },
                    },
                    default: 'The webhook URL will be displayed here when the workflow is saved. Copy it to your Facebook App webhook configuration.',
                    typeOptions: {
                        theme: 'info',
                    },
                },
                {
                    displayName: 'Webhook Verify Token',
                    name: 'verifyToken',
                    type: 'string',
                    displayOptions: {
                        show: {
                            triggerMethod: ['webhook'],
                        },
                    },
                    default: 'n8n_facebook_webhook_verify',
                    description: 'Verification token for Facebook webhook - use this same token in Facebook App',
                },
                {
                    displayName: 'Setup Instructions',
                    name: 'setupInstructions',
                    type: 'notice',
                    displayOptions: {
                        show: {
                            triggerMethod: ['webhook'],
                        },
                    },
                    default: '1. Save this workflow to get the webhook URL\n2. Copy the webhook URL\n3. Go to Facebook Developers Console\n4. Add webhook subscription with the URL and verify token\n5. Subscribe your page to the webhook\n6. Activate this workflow and test!',
                    typeOptions: {
                        theme: 'info',
                    },
                },
            ],
        };
        this.methods = {
            loadOptions: {
                async getPages() {
                    var _a;
                    try {
                        const credentials = await this.getCredentials('facebookOAuth2Api');
                        // Get access token
                        let userAccessToken = credentials.accessToken ||
                            credentials.access_token ||
                            ((_a = credentials.oauthTokenData) === null || _a === void 0 ? void 0 : _a.access_token);
                        if (!userAccessToken) {
                            throw new Error('No access token found. Please reconnect your Facebook account.');
                        }
                        // Fetch user's Pages
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
                        return response.data.map((page) => ({
                            name: page.name,
                            value: page.id,
                        }));
                    }
                    catch (error) {
                        throw new Error(`Failed to load Pages: ${error.message}`);
                    }
                },
            },
        };
    }
    async webhook() {
        var _a;
        const req = this.getRequestObject();
        const res = this.getResponseObject();
        const query = this.getQueryData();
        const body = this.getBodyData();
        try {
            // Handle Facebook webhook verification (GET request)
            if (req.method === 'GET') {
                const mode = query['hub.mode'];
                const token = query['hub.verify_token'];
                const challenge = query['hub.challenge'];
                const verifyToken = this.getNodeParameter('verifyToken') || 'n8n_facebook_webhook_verify';
                if (mode === 'subscribe' && token === verifyToken) {
                    console.log('Facebook webhook verified successfully');
                    // Send response immediately and return
                    res.status(200).send(challenge);
                    return {
                        noWebhookResponse: true,
                    };
                }
                else {
                    console.log('Facebook webhook verification failed - mode:', mode, 'token match:', token === verifyToken);
                    res.status(403).send('Forbidden');
                    return {
                        noWebhookResponse: true,
                    };
                }
            }
            // Handle Facebook webhook events (POST request)
            if (req.method === 'POST') {
                const triggerOn = this.getNodeParameter('triggerOn');
                const pageId = this.getNodeParameter('pageId');
                console.log('🔔 Facebook webhook received:', JSON.stringify(body, null, 2));
                console.log(`📋 Configuration - pageId: ${pageId}, triggerOn: ${triggerOn}`);
                // Send immediate acknowledgment to Facebook (CRITICAL - must be first!)
                res.status(200).send('EVENT_RECEIVED');
                // Process the webhook data
                if (body.object === 'page') {
                    const entries = body.entry || [];
                    const results = [];
                    console.log(`📦 Processing ${entries.length} entries`);
                    for (const entry of entries) {
                        console.log(`🔍 Entry ID: ${entry.id} (looking for: ${pageId})`);
                        // Only process events for the configured page
                        if (entry.id !== pageId) {
                            console.log(`⏭️ Skipping entry ${entry.id} - doesn't match configured page`);
                            continue;
                        }
                        // Process Facebook Page changes (posts, comments, etc.)
                        if (entry.changes) {
                            console.log(`📝 Processing ${entry.changes.length} page changes`);
                            for (const change of entry.changes) {
                                console.log(`🔄 Change field: ${change.field}, value:`, change.value);
                                let shouldTrigger = false;
                                let eventData = {};
                                switch (change.field) {
                                    case 'feed':
                                        const item = (_a = change.value) === null || _a === void 0 ? void 0 : _a.item;
                                        console.log(`📰 Feed change - item: ${item}, trigger: ${triggerOn}`);
                                        if (triggerOn === 'newPost' && item === 'post') {
                                            shouldTrigger = true;
                                            eventData = {
                                                type: 'new_post',
                                                postId: change.value.post_id,
                                                message: change.value.message || '',
                                                createdTime: change.value.created_time,
                                                from: change.value.from,
                                            };
                                            console.log('✅ New post trigger matched!');
                                        }
                                        else if (triggerOn === 'newComment' && item === 'comment') {
                                            shouldTrigger = true;
                                            eventData = {
                                                type: 'new_comment',
                                                commentId: change.value.comment_id,
                                                postId: change.value.post_id,
                                                message: change.value.message || '',
                                                createdTime: change.value.created_time,
                                                from: change.value.from,
                                            };
                                            console.log('✅ New comment trigger matched!');
                                        }
                                        break;
                                    case 'mention':
                                        if (triggerOn === 'pageMention') {
                                            shouldTrigger = true;
                                            eventData = {
                                                type: 'page_mention',
                                                postId: change.value.post_id,
                                                message: change.value.message || '',
                                                createdTime: change.value.created_time,
                                                from: change.value.from,
                                            };
                                            console.log('✅ Page mention trigger matched!');
                                        }
                                        break;
                                }
                                if (shouldTrigger) {
                                    const resultData = {
                                        json: {
                                            ...eventData,
                                            pageId: entry.id,
                                            timestamp: entry.time,
                                            rawEvent: change,
                                        },
                                    };
                                    results.push(resultData);
                                    console.log('📤 Added result:', JSON.stringify(resultData.json, null, 2));
                                }
                            }
                        }
                        // Process Messenger events (messages, postbacks, etc.)
                        if (entry.messaging) {
                            console.log(`💬 Processing ${entry.messaging.length} messaging events`);
                            for (const messagingEvent of entry.messaging) {
                                console.log('📨 Messaging event:', JSON.stringify(messagingEvent, null, 2));
                                // Handle incoming messages
                                if (messagingEvent.message && triggerOn === 'newMessage') {
                                    const messageData = {
                                        json: {
                                            type: 'new_message',
                                            messageId: messagingEvent.message.mid,
                                            text: messagingEvent.message.text || '',
                                            senderId: messagingEvent.sender.id,
                                            recipientId: messagingEvent.recipient.id,
                                            timestamp: messagingEvent.timestamp,
                                            pageId: entry.id,
                                            rawEvent: messagingEvent,
                                        },
                                    };
                                    results.push(messageData);
                                    console.log('✅ New message trigger matched!');
                                    console.log('📤 Added message:', JSON.stringify(messageData.json, null, 2));
                                }
                                // Handle postbacks (button clicks)
                                if (messagingEvent.postback && triggerOn === 'newMessage') {
                                    const postbackData = {
                                        json: {
                                            type: 'postback',
                                            payload: messagingEvent.postback.payload,
                                            title: messagingEvent.postback.title,
                                            senderId: messagingEvent.sender.id,
                                            recipientId: messagingEvent.recipient.id,
                                            timestamp: messagingEvent.timestamp,
                                            pageId: entry.id,
                                            rawEvent: messagingEvent,
                                        },
                                    };
                                    results.push(postbackData);
                                    console.log('✅ Postback trigger matched!');
                                    console.log('📤 Added postback:', JSON.stringify(postbackData.json, null, 2));
                                }
                            }
                        }
                    }
                    console.log(`🎯 Total results found: ${results.length}`);
                    if (results.length > 0) {
                        console.log('🚀 Triggering workflow with results');
                        // Return the workflow data but don't send another response
                        return {
                            workflowData: [results],
                            noWebhookResponse: true,
                        };
                    }
                    else {
                        console.log('❌ No matching results found for trigger criteria');
                    }
                }
                else {
                    console.log('❌ Webhook object is not "page", received:', body.object);
                }
                // Already sent response above
                return {
                    noWebhookResponse: true,
                };
            }
            // For any other method, send OK response
            res.status(200).send('OK');
            return {
                noWebhookResponse: true,
            };
        }
        catch (error) {
            console.error('Facebook webhook error:', error);
            // Send error response if not already sent
            if (!res.headersSent) {
                res.status(500).send('Internal Server Error');
            }
            return {
                noWebhookResponse: true,
            };
        }
    }
    async trigger() {
        const triggerMethod = this.getNodeParameter('triggerMethod');
        if (triggerMethod === 'webhook') {
            // Webhook mode - the webhook method handles everything
            return {
                closeFunction: async () => {
                    // Cleanup webhook subscription if needed
                },
            };
        }
        else {
            // Polling mode
            const triggerOn = this.getNodeParameter('triggerOn');
            const pageId = this.getNodeParameter('pageId');
            const pollingInterval = this.getNodeParameter('pollingInterval');
            let lastCheck = Date.now();
            const poll = async () => {
                var _a;
                try {
                    const credentials = await this.getCredentials('facebookOAuth2Api');
                    // Get access token
                    let userAccessToken = credentials.accessToken ||
                        credentials.access_token ||
                        ((_a = credentials.oauthTokenData) === null || _a === void 0 ? void 0 : _a.access_token);
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
                    const targetPage = pageResponse.data.find((page) => page.id === pageId);
                    const pageAccessToken = (targetPage === null || targetPage === void 0 ? void 0 : targetPage.access_token) || userAccessToken;
                    const results = [];
                    const currentTime = Date.now();
                    const since = Math.floor(lastCheck / 1000);
                    switch (triggerOn) {
                        case 'newPost':
                            const postsResponse = await this.helpers.request({
                                method: 'GET',
                                url: `https://graph.facebook.com/v18.0/${pageId}/posts`,
                                qs: {
                                    access_token: pageAccessToken,
                                    fields: 'id,message,created_time,from,type',
                                    since: since,
                                    limit: 50,
                                },
                                json: true,
                            });
                            for (const post of postsResponse.data || []) {
                                const createdTime = new Date(post.created_time).getTime();
                                if (createdTime > lastCheck) {
                                    results.push({
                                        json: {
                                            type: 'new_post',
                                            postId: post.id,
                                            message: post.message,
                                            createdTime: post.created_time,
                                            from: post.from,
                                            postType: post.type,
                                            pageId: pageId,
                                        },
                                    });
                                }
                            }
                            break;
                        case 'newComment':
                            // Get recent posts first, then check for new comments
                            const recentPostsResponse = await this.helpers.request({
                                method: 'GET',
                                url: `https://graph.facebook.com/v18.0/${pageId}/posts`,
                                qs: {
                                    access_token: pageAccessToken,
                                    fields: 'id',
                                    limit: 10,
                                },
                                json: true,
                            });
                            for (const post of recentPostsResponse.data || []) {
                                const commentsResponse = await this.helpers.request({
                                    method: 'GET',
                                    url: `https://graph.facebook.com/v18.0/${post.id}/comments`,
                                    qs: {
                                        access_token: pageAccessToken,
                                        fields: 'id,message,created_time,from',
                                        since: since,
                                        limit: 50,
                                    },
                                    json: true,
                                });
                                for (const comment of commentsResponse.data || []) {
                                    const createdTime = new Date(comment.created_time).getTime();
                                    if (createdTime > lastCheck) {
                                        results.push({
                                            json: {
                                                type: 'new_comment',
                                                commentId: comment.id,
                                                postId: post.id,
                                                message: comment.message,
                                                createdTime: comment.created_time,
                                                from: comment.from,
                                                pageId: pageId,
                                            },
                                        });
                                    }
                                }
                            }
                            break;
                        case 'newMessage':
                            try {
                                const conversationsResponse = await this.helpers.request({
                                    method: 'GET',
                                    url: `https://graph.facebook.com/v18.0/me/conversations`,
                                    qs: {
                                        access_token: pageAccessToken,
                                        fields: 'id,updated_time',
                                        limit: 20,
                                    },
                                    json: true,
                                });
                                for (const conversation of conversationsResponse.data || []) {
                                    const updatedTime = new Date(conversation.updated_time).getTime();
                                    if (updatedTime > lastCheck) {
                                        const messagesResponse = await this.helpers.request({
                                            method: 'GET',
                                            url: `https://graph.facebook.com/v18.0/${conversation.id}/messages`,
                                            qs: {
                                                access_token: pageAccessToken,
                                                fields: 'id,message,created_time,from',
                                                since: since,
                                                limit: 10,
                                            },
                                            json: true,
                                        });
                                        for (const message of messagesResponse.data || []) {
                                            const createdTime = new Date(message.created_time).getTime();
                                            if (createdTime > lastCheck) {
                                                results.push({
                                                    json: {
                                                        type: 'new_message',
                                                        messageId: message.id,
                                                        text: message.message,
                                                        createdTime: message.created_time,
                                                        from: message.from,
                                                        conversationId: conversation.id,
                                                        pageId: pageId,
                                                    },
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                            catch (error) {
                                // Messages might not be available, skip silently
                                console.log('Could not fetch messages:', error);
                            }
                            break;
                    }
                    lastCheck = currentTime;
                    if (results.length > 0) {
                        this.emit([results]);
                    }
                }
                catch (error) {
                    console.error('Facebook polling error:', error);
                }
            };
            // Initial poll
            await poll();
            // Set up interval
            const interval = setInterval(poll, pollingInterval * 1000);
            return {
                closeFunction: async () => {
                    clearInterval(interval);
                },
            };
        }
    }
}
exports.FacebookPageTrigger = FacebookPageTrigger;
//# sourceMappingURL=FacebookPageTrigger.node.js.map