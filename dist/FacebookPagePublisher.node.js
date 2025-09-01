"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookPagePublisher = void 0;
class FacebookPagePublisher {
    constructor() {
        this.description = {
            displayName: 'Facebook Page Actions',
            name: 'facebookPagePublisher',
            icon: 'file:facebook.svg',
            group: ['output'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Complete Facebook API integration - Posts, Comments, Messages, Insights & More',
            defaults: {
                name: 'Facebook Page Actions',
            },
            inputs: ["main" /* NodeConnectionType.Main */],
            outputs: ["main" /* NodeConnectionType.Main */],
            credentials: [
                {
                    name: 'facebookOAuth2Api',
                    required: true,
                },
            ],
            requestDefaults: {
                baseURL: 'https://graph.facebook.com/v18.0',
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Post',
                            value: 'post',
                            description: 'Manage Facebook Page posts',
                        },
                        {
                            name: 'Comment',
                            value: 'comment',
                            description: 'Manage comments on posts',
                        },
                        {
                            name: 'Message',
                            value: 'message',
                            description: 'Send and manage Messenger messages',
                        },
                        {
                            name: 'Conversation',
                            value: 'conversation',
                            description: 'Manage Messenger conversations',
                        },
                        {
                            name: 'Insights',
                            value: 'insights',
                            description: 'Get page and post analytics',
                        },
                        {
                            name: 'Media',
                            value: 'media',
                            description: 'Manage photos and videos',
                        },
                        {
                            name: 'Event',
                            value: 'event',
                            description: 'Manage Facebook events',
                        },
                    ],
                    default: 'post',
                },
                // POST OPERATIONS
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['post'],
                        },
                    },
                    options: [
                        {
                            name: 'Create Text Post',
                            value: 'createTextPost',
                            description: 'Create a simple text post on a Facebook Page',
                            action: 'Create a text post',
                        },
                        {
                            name: 'Create Text Post with Background',
                            value: 'createTextPostWithBackground',
                            description: 'Create a text post with colored background using preset ID',
                            action: 'Create a text post with background',
                        },
                        {
                            name: 'Create Link Post with Text',
                            value: 'createLinkPostWithText',
                            description: 'Create a post with a link and accompanying text',
                            action: 'Create a link post with text',
                        },
                        {
                            name: 'Create Photo Post',
                            value: 'createPhotoPost',
                            description: 'Create a photo post on a Facebook Page',
                            action: 'Create a photo post',
                        },
                        {
                            name: 'Create Video Post',
                            value: 'createVideoPost',
                            description: 'Create a video post on a Facebook Page',
                            action: 'Create a video post',
                        },
                        {
                            name: 'Create Link Post',
                            value: 'createLinkPost',
                            description: 'Create a link post with custom preview (no text)',
                            action: 'Create a link post',
                        },
                        {
                            name: 'Create Scheduled Post',
                            value: 'createScheduledPost',
                            description: 'Schedule a post for later publishing',
                            action: 'Create a scheduled post',
                        },
                        {
                            name: 'Get Posts',
                            value: 'getPosts',
                            description: 'Get posts from a Facebook Page',
                            action: 'Get posts',
                        },
                        {
                            name: 'Get Post',
                            value: 'getPost',
                            description: 'Get a specific post by ID',
                            action: 'Get a post',
                        },
                        {
                            name: 'Update Post',
                            value: 'updatePost',
                            description: 'Update an existing post',
                            action: 'Update a post',
                        },
                        {
                            name: 'Delete Post',
                            value: 'deletePost',
                            description: 'Delete a post',
                            action: 'Delete a post',
                        },
                    ],
                    default: 'createTextPost',
                },
                // COMMENT OPERATIONS
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['comment'],
                        },
                    },
                    options: [
                        {
                            name: 'Get Comments',
                            value: 'getComments',
                            description: 'Get comments from a post',
                            action: 'Get comments',
                        },
                        {
                            name: 'Create Comment',
                            value: 'createComment',
                            description: 'Comment on a post',
                            action: 'Create a comment',
                        },
                        {
                            name: 'Create Comment with Image',
                            value: 'createCommentWithImage',
                            description: 'Comment on a post with an image attachment',
                            action: 'Create a comment with image',
                        },
                        {
                            name: 'Reply to Comment',
                            value: 'replyToComment',
                            description: 'Reply to a specific comment',
                            action: 'Reply to a comment',
                        },
                        {
                            name: 'Update Comment',
                            value: 'updateComment',
                            description: 'Update an existing comment',
                            action: 'Update a comment',
                        },
                        {
                            name: 'Delete Comment',
                            value: 'deleteComment',
                            description: 'Delete a comment',
                            action: 'Delete a comment',
                        },
                        {
                            name: 'Hide Comment',
                            value: 'hideComment',
                            description: 'Hide a comment from public view',
                            action: 'Hide a comment',
                        },
                        {
                            name: 'Like Comment',
                            value: 'likeComment',
                            description: 'Like a comment',
                            action: 'Like a comment',
                        },
                    ],
                    default: 'getComments',
                },
                // MESSAGE OPERATIONS
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['message'],
                        },
                    },
                    options: [
                        {
                            name: 'Send Text Message',
                            value: 'sendTextMessage',
                            description: 'Send a text message via Messenger',
                            action: 'Send a text message',
                        },
                        {
                            name: 'Send Image Message',
                            value: 'sendImageMessage',
                            description: 'Send an image via Messenger',
                            action: 'Send an image message',
                        },
                        {
                            name: 'Send Quick Reply',
                            value: 'sendQuickReply',
                            description: 'Send a message with quick reply buttons',
                            action: 'Send a quick reply',
                        },
                        {
                            name: 'Get Messages',
                            value: 'getMessages',
                            description: 'Get messages from a conversation',
                            action: 'Get messages',
                        },
                    ],
                    default: 'sendTextMessage',
                },
                // CONVERSATION OPERATIONS
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['conversation'],
                        },
                    },
                    options: [
                        {
                            name: 'Get Conversations',
                            value: 'getConversations',
                            description: 'Get all conversations for the page',
                            action: 'Get conversations',
                        },
                        {
                            name: 'Get Conversation',
                            value: 'getConversation',
                            description: 'Get a specific conversation',
                            action: 'Get a conversation',
                        },
                    ],
                    default: 'getConversations',
                },
                // INSIGHTS OPERATIONS
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['insights'],
                        },
                    },
                    options: [
                        {
                            name: 'Get Page Insights',
                            value: 'getPageInsights',
                            description: 'Get analytics for the page',
                            action: 'Get page insights',
                        },
                        {
                            name: 'Get Post Insights',
                            value: 'getPostInsights',
                            description: 'Get analytics for a specific post',
                            action: 'Get post insights',
                        },
                    ],
                    default: 'getPageInsights',
                },
                // MEDIA OPERATIONS
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['media'],
                        },
                    },
                    options: [
                        {
                            name: 'Upload Photo',
                            value: 'uploadPhoto',
                            description: 'Upload a photo to the page',
                            action: 'Upload a photo',
                        },
                        {
                            name: 'Upload Video',
                            value: 'uploadVideo',
                            description: 'Upload a video to the page',
                            action: 'Upload a video',
                        },
                        {
                            name: 'Get Photos',
                            value: 'getPhotos',
                            description: 'Get photos from the page',
                            action: 'Get photos',
                        },
                        {
                            name: 'Get Videos',
                            value: 'getVideos',
                            description: 'Get videos from the page',
                            action: 'Get videos',
                        },
                    ],
                    default: 'uploadPhoto',
                },
                // EVENT OPERATIONS
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['event'],
                        },
                    },
                    options: [
                        {
                            name: 'Create Event',
                            value: 'createEvent',
                            description: 'Create a Facebook event',
                            action: 'Create an event',
                        },
                        {
                            name: 'Get Events',
                            value: 'getEvents',
                            description: 'Get events from the page',
                            action: 'Get events',
                        },
                        {
                            name: 'Update Event',
                            value: 'updateEvent',
                            description: 'Update an existing event',
                            action: 'Update an event',
                        },
                        {
                            name: 'Delete Event',
                            value: 'deleteEvent',
                            description: 'Delete an event',
                            action: 'Delete an event',
                        },
                    ],
                    default: 'createEvent',
                },
                // PAGE SELECTION (Common for all resources)
                {
                    displayName: 'Page',
                    name: 'pageId',
                    type: 'options',
                    typeOptions: {
                        loadOptionsMethod: 'getPages',
                    },
                    required: true,
                    default: '',
                    description: 'Select the Facebook Page (automatically loaded from your connected account)',
                    displayOptions: {
                        show: {
                            resource: ['post', 'comment', 'message', 'conversation', 'insights', 'media', 'event'],
                        },
                    },
                },
                // ===== POST PARAMETERS =====
                // Text Post Parameters (Text Only)
                {
                    displayName: 'Message',
                    name: 'message',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createTextPost', 'createScheduledPost', 'updatePost'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'The main text content of the post',
                },
                // Text Post with Background Parameters
                {
                    displayName: 'Message',
                    name: 'backgroundPostMessage',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createTextPostWithBackground'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'The text content for the background post',
                },
                {
                    displayName: 'Background Preset',
                    name: 'textFormatPresetId',
                    type: 'options',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createTextPostWithBackground'],
                        },
                    },
                    options: [
                        // Solid Colors
                        {
                            name: 'Solid Purple',
                            value: '106018623298955',
                            description: 'Solid purple background',
                        },
                        {
                            name: 'Solid Red',
                            value: '204187940028597',
                            description: 'Solid red background',
                        },
                        {
                            name: 'Solid Red (Alt)',
                            value: '621731364695726',
                            description: 'Solid red background (alternative)',
                        },
                        {
                            name: 'Solid Red (Dark)',
                            value: '1271157196337260',
                            description: 'Solid red background (dark)',
                        },
                        {
                            name: 'Solid Teal',
                            value: '301029513638534',
                            description: 'Solid teal background',
                        },
                        {
                            name: 'Solid Teal (Alt)',
                            value: '154977255088164',
                            description: 'Solid teal background (alternative)',
                        },
                        {
                            name: 'Solid Dark Purple',
                            value: '145893972683590',
                            description: 'Solid dark purple background',
                        },
                        {
                            name: 'Solid Blue',
                            value: '217761075370932',
                            description: 'Solid blue background',
                        },
                        {
                            name: 'Solid Purple (Alt)',
                            value: '433967226963128',
                            description: 'Solid purple background (alternative)',
                        },
                        {
                            name: 'Solid Black',
                            value: '1881421442117417',
                            description: 'Solid black background',
                        },
                        {
                            name: 'Solid Magenta',
                            value: '219266485227663',
                            description: 'Solid magenta background',
                        },
                        {
                            name: 'Solid Dark Red',
                            value: '1289741387813798',
                            description: 'Solid dark red background',
                        },
                        {
                            name: 'Solid Blue (Alt)',
                            value: '1365883126823705',
                            description: 'Solid blue background (alternative)',
                        },
                        // Gradients
                        {
                            name: 'Gradient Purple Magenta',
                            value: '1777259169190672',
                            description: 'Gradient purple magenta background (confirmed working)',
                        },
                        {
                            name: 'Gradient Dark Orange Red',
                            value: '901751159967576',
                            description: 'Gradient dark orange red background',
                        },
                        {
                            name: 'Gradient Teal Light Green',
                            value: '688479024672716',
                            description: 'Gradient teal light green background',
                        },
                        {
                            name: 'Gradient Grey Dark Grey',
                            value: '1941912679424590',
                            description: 'Gradient grey dark grey background',
                        },
                        {
                            name: 'Gradient Red Blue',
                            value: '249307305544279',
                            description: 'Gradient red blue background',
                        },
                        {
                            name: 'Gradient Dark Grey Black',
                            value: '122708641613922',
                            description: 'Gradient dark grey black background',
                        },
                        {
                            name: 'Gradient Red',
                            value: '446330032368780',
                            description: 'Gradient red background',
                        },
                        {
                            name: 'Pink and Yellow Gradient',
                            value: '175493843120364',
                            description: 'Pink and yellow gradient background',
                        },
                        {
                            name: 'Yellow Orange Pink Gradient',
                            value: '303063890126415',
                            description: 'Yellow orange pink gradient background',
                        },
                        // Emoji & 3D Backgrounds
                        {
                            name: '3D Hearts',
                            value: '191761991491375',
                            description: '3D hearts background',
                        },
                        {
                            name: '3D Heart Eyes Emojis',
                            value: '2193627793985415',
                            description: '3D heart eyes emojis background',
                        },
                        {
                            name: '3D Flame Emojis',
                            value: '200521337465306',
                            description: '3D flame emojis background',
                        },
                        {
                            name: '3D Smiling Emoji',
                            value: '248623902401250',
                            description: '3D smiling emoji background',
                        },
                        {
                            name: '3D Rose Emojis',
                            value: '240401816771706',
                            description: '3D rose emojis background',
                        },
                        {
                            name: '3D Crying Laughter Emoji',
                            value: '1868855943417360',
                            description: '3D crying laughter emoji background',
                        },
                        // Pattern & Illustration Backgrounds
                        {
                            name: 'Pink Tropical Plants',
                            value: '365653833956649',
                            description: 'Pink tropical plants background',
                        },
                        {
                            name: 'Brown Illustration',
                            value: '618093735238824',
                            description: 'Brown illustration background',
                        },
                        {
                            name: 'Walking Yellow Illustration',
                            value: '1821844087883360',
                            description: 'Walking yellow illustration background',
                        },
                        {
                            name: 'Light Purple 3D Cube Pattern',
                            value: '177465482945164',
                            description: 'Light purple 3D cube pattern background',
                        },
                        {
                            name: 'Orange with Pink Illustration',
                            value: '160419724814650',
                            description: 'Orange with pink illustration background',
                        },
                        {
                            name: 'Eye Pink Illustration',
                            value: '255989551804163',
                            description: 'Eye pink illustration background',
                        },
                        {
                            name: 'Light Grey Illustration',
                            value: '1654916007940525',
                            description: 'Light grey illustration background',
                        },
                        {
                            name: 'Light Blue Illustration',
                            value: '1679248482160767',
                            description: 'Light blue illustration background',
                        },
                        {
                            name: 'Pink Heart Pattern',
                            value: '518948401838663',
                            description: 'Pink heart pattern on pink background',
                        },
                        {
                            name: 'Pink and Purple Hearts (Pink BG)',
                            value: '217321755510854',
                            description: 'Pink and purple hearts on pink background',
                        },
                        {
                            name: 'Pink and Purple Hearts (Purple BG)',
                            value: '148862695775447',
                            description: 'Pink and purple hearts on purple background',
                        },
                        {
                            name: 'Grey Heart Pattern',
                            value: '228164237768720',
                            description: 'Grey heart pattern on black background',
                        },
                        {
                            name: 'Blue Clouds',
                            value: '143093446467972',
                            description: 'Blue clouds on dark blue background',
                        },
                        {
                            name: 'Rocket Heart Sky',
                            value: '161409924510923',
                            description: 'Rocket ship makes heart in sky background',
                        },
                        // Animal & Nature Illustrations
                        {
                            name: 'Cat Dark Orange',
                            value: '458988134561491',
                            description: 'Cat dark orange illustration background',
                        },
                        {
                            name: 'Cat Light Blue',
                            value: '238863426886624',
                            description: 'Cat light blue illustration background',
                        },
                        {
                            name: 'Unicorn Red',
                            value: '548109108916650',
                            description: 'Unicorn red illustration background',
                        },
                        {
                            name: 'Tree Red',
                            value: '134273813910336',
                            description: 'Tree red illustration background',
                        },
                        {
                            name: 'Apple Red',
                            value: '263789377694911',
                            description: 'Apple red illustration background',
                        },
                        {
                            name: 'Tulip Light Orange',
                            value: '606643333067842',
                            description: 'Tulip light orange illustration background',
                        },
                        {
                            name: 'Lemon Yellow',
                            value: '174496469882866',
                            description: 'Lemon yellow illustration background',
                        },
                        {
                            name: 'Egg Light Yellow',
                            value: '862667370603267',
                            description: 'Egg light yellow illustration background',
                        },
                        {
                            name: 'Ball Green',
                            value: '127541261450947',
                            description: 'Ball green illustration background',
                        },
                        {
                            name: 'Flower Teal',
                            value: '396343990807392',
                            description: 'Flower teal illustration background',
                        },
                        {
                            name: 'Watermelon Light Purple',
                            value: '172497526576609',
                            description: 'Watermelon light purple illustration background',
                        },
                        {
                            name: 'Donut Light Purple',
                            value: '197865920864520',
                            description: 'Donut light purple illustration background',
                        },
                        // Abstract & Geometric
                        {
                            name: 'Sunset Red',
                            value: '323371698179784',
                            description: 'Sunset red illustration background',
                        },
                        {
                            name: 'Stairs Beige',
                            value: '338976169966519',
                            description: 'Stairs beige illustration background',
                        },
                        {
                            name: 'Spiral Beige',
                            value: '206513879997925',
                            description: 'Spiral beige illustration background',
                        },
                        {
                            name: 'Cube Beige',
                            value: '168373304017982',
                            description: 'Cube beige illustration background',
                        },
                        {
                            name: 'Wave Blue',
                            value: '931584293685988',
                            description: 'Wave blue illustration background',
                        },
                        {
                            name: 'Deep Sea Blue',
                            value: '100114277230063',
                            description: 'Deep sea blue illustration background',
                        },
                        {
                            name: 'Spiral Purple',
                            value: '558836317844129',
                            description: 'Spiral purple illustration background',
                        },
                        {
                            name: 'Dark Blue Illustration',
                            value: '319468561816672',
                            description: 'Dark blue illustration background',
                        },
                        {
                            name: 'Blue Illustration',
                            value: '288211338285858',
                            description: 'Blue illustration background',
                        },
                        // Miscellaneous
                        {
                            name: 'Red Illustration',
                            value: '518596398537417',
                            description: 'Red illustration background',
                        },
                        {
                            name: 'Brown Illustration (Alt)',
                            value: '552118025129095',
                            description: 'Brown illustration background (alternative)',
                        },
                        {
                            name: 'General Illustration',
                            value: '423339708139719',
                            description: 'General illustration background',
                        },
                        {
                            name: 'Light Grey Illustration (Alt)',
                            value: '218067308976029',
                            description: 'Light grey illustration background (alternative)',
                        },
                        {
                            name: 'Pink Illustration',
                            value: '643122496026756',
                            description: 'Pink illustration background',
                        },
                        {
                            name: 'Pink Illustration (Alt)',
                            value: '121945541697934',
                            description: 'Pink illustration background (alternative)',
                        },
                        {
                            name: 'Balloon Light Grey',
                            value: '762009070855346',
                            description: 'Balloon light grey illustration background',
                        },
                        {
                            name: 'Rain Black',
                            value: '146487026137131',
                            description: 'Rain black illustration background',
                        },
                        {
                            name: 'Glasses Light Grey',
                            value: '221828835275596',
                            description: 'Glasses light grey illustration background',
                        },
                        {
                            name: 'Solid Red (Final)',
                            value: '1903718606535395',
                            description: 'Solid red background (final option)',
                        },
                    ],
                    default: '1777259169190672',
                    description: 'Select a background preset for the text post',
                },
                {
                    displayName: 'Custom Preset ID',
                    name: 'customPresetId',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createTextPostWithBackground'],
                        },
                    },
                    default: '',
                    description: 'Optional: Enter a custom text_format_preset_id if you know a specific one',
                },
                // Link Post with Text Parameters
                {
                    displayName: 'Message',
                    name: 'linkPostMessage',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createLinkPostWithText'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'The text content to accompany the link',
                },
                {
                    displayName: 'Link URL',
                    name: 'linkPostUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createLinkPostWithText'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'The URL to share with the text',
                },
                // Photo Post Parameters
                {
                    displayName: 'Input Type',
                    name: 'inputType',
                    type: 'options',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createPhotoPost'],
                        },
                    },
                    options: [
                        {
                            name: 'Image URL',
                            value: 'url',
                            description: 'Provide an image URL',
                        },
                        {
                            name: 'Binary Data',
                            value: 'binary',
                            description: 'Use binary data from previous node',
                        },
                    ],
                    default: 'url',
                    description: 'How to provide the image for the photo post',
                },
                {
                    displayName: 'Image URL',
                    name: 'imageUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createPhotoPost'],
                            inputType: ['url'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'URL of the image to post',
                },
                {
                    displayName: 'Binary Property',
                    name: 'binaryProperty',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createPhotoPost'],
                            inputType: ['binary'],
                        },
                    },
                    required: true,
                    default: 'data',
                    description: 'Name of the binary property containing the image data',
                },
                {
                    displayName: 'Caption',
                    name: 'caption',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createPhotoPost'],
                        },
                    },
                    default: '',
                    description: 'Optional caption for the photo',
                },
                {
                    displayName: 'Published',
                    name: 'published',
                    type: 'boolean',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createPhotoPost'],
                        },
                    },
                    default: true,
                    description: 'Whether to publish the photo immediately or save as draft',
                },
                // Video Post Parameters
                {
                    displayName: 'Video Input Type',
                    name: 'videoInputType',
                    type: 'options',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createVideoPost'],
                        },
                    },
                    options: [
                        {
                            name: 'Video URL',
                            value: 'url',
                            description: 'Provide a video URL',
                        },
                        {
                            name: 'Binary Data',
                            value: 'binary',
                            description: 'Use binary data from previous node',
                        },
                    ],
                    default: 'url',
                    description: 'How to provide the video for the post',
                },
                {
                    displayName: 'Video URL',
                    name: 'videoUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createVideoPost'],
                            videoInputType: ['url'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'URL of the video to post',
                },
                {
                    displayName: 'Video Binary Property',
                    name: 'videoBinaryProperty',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createVideoPost'],
                            videoInputType: ['binary'],
                        },
                    },
                    required: true,
                    default: 'data',
                    description: 'Name of the binary property containing the video data',
                },
                {
                    displayName: 'Video Description',
                    name: 'videoDescription',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createVideoPost'],
                        },
                    },
                    default: '',
                    description: 'Description for the video post',
                },
                // Link Post Parameters
                {
                    displayName: 'Link URL',
                    name: 'linkUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createLinkPost'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'The URL to share',
                },
                {
                    displayName: 'Link Message',
                    name: 'linkMessage',
                    type: 'string',
                    typeOptions: {
                        rows: 3,
                    },
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createLinkPost'],
                        },
                    },
                    default: '',
                    description: 'Optional message to accompany the link',
                },
                // Scheduled Post Parameters
                {
                    displayName: 'Scheduled Publish Time',
                    name: 'scheduledPublishTime',
                    type: 'dateTime',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['createScheduledPost'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'When to publish the post (must be at least 10 minutes in the future)',
                },
                // Post ID for operations that need it
                {
                    displayName: 'Post ID',
                    name: 'postId',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['getPost', 'updatePost', 'deletePost'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'The ID of the post',
                },
                // Get Posts Parameters
                {
                    displayName: 'Limit',
                    name: 'limit',
                    type: 'number',
                    displayOptions: {
                        show: {
                            resource: ['post'],
                            operation: ['getPosts'],
                        },
                    },
                    default: 25,
                    description: 'Number of posts to retrieve (max 100)',
                },
                // ===== COMMENT PARAMETERS =====
                {
                    displayName: 'Post ID',
                    name: 'commentPostId',
                    type: 'options',
                    typeOptions: {
                        loadOptionsMethod: 'getPostIds',
                    },
                    displayOptions: {
                        show: {
                            resource: ['comment'],
                            operation: ['getComments', 'createComment', 'createCommentWithImage'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'Select the post to get/create comments for',
                },
                {
                    displayName: 'Comment ID',
                    name: 'commentId',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['comment'],
                            operation: ['replyToComment', 'updateComment', 'deleteComment', 'hideComment', 'likeComment'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'The ID of the comment',
                },
                {
                    displayName: 'Comment Message',
                    name: 'commentMessage',
                    type: 'string',
                    typeOptions: {
                        rows: 3,
                    },
                    displayOptions: {
                        show: {
                            resource: ['comment'],
                            operation: ['createComment', 'replyToComment', 'updateComment'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'The text content of the comment',
                },
                {
                    displayName: 'Image Input Type',
                    name: 'imageInputType',
                    type: 'options',
                    displayOptions: {
                        show: {
                            resource: ['comment'],
                            operation: ['createCommentWithImage'],
                        },
                    },
                    options: [
                        {
                            name: 'Image URL',
                            value: 'url',
                            description: 'Provide an image URL (will try multiple upload methods automatically)',
                        },
                        {
                            name: 'Binary Data',
                            value: 'binary',
                            description: 'Use binary data from previous node',
                        },
                    ],
                    default: 'url',
                    description: 'How to provide the image for the comment',
                },
                {
                    displayName: 'Image URL',
                    name: 'imageUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['comment'],
                            operation: ['createCommentWithImage'],
                            imageInputType: ['url'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'URL of the image to attach to the comment. The system will automatically try multiple upload methods: direct URL, upload-first, and resumable upload.',
                    placeholder: 'https://example.com/image.jpg',
                },
                {
                    displayName: 'Binary Property',
                    name: 'imageBinaryProperty',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['comment'],
                            operation: ['createCommentWithImage'],
                            imageInputType: ['binary'],
                        },
                    },
                    required: true,
                    default: 'data',
                    description: 'Name of the binary property containing the image data',
                },
                {
                    displayName: 'Comment Message',
                    name: 'commentMessage',
                    type: 'string',
                    typeOptions: {
                        rows: 3,
                    },
                    displayOptions: {
                        show: {
                            resource: ['comment'],
                            operation: ['createCommentWithImage'],
                        },
                    },
                    required: false,
                    default: '',
                    description: 'Optional text content to accompany the image comment',
                },
                // ===== MESSAGE PARAMETERS =====
                {
                    displayName: 'Recipient ID',
                    name: 'recipientId',
                    type: 'options',
                    typeOptions: {
                        loadOptionsMethod: 'getRecipientIds',
                    },
                    displayOptions: {
                        show: {
                            resource: ['message'],
                            operation: ['sendTextMessage', 'sendImageMessage', 'sendQuickReply'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'Select the recipient to send the message to',
                },
                {
                    displayName: 'Message Text',
                    name: 'messageText',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    displayOptions: {
                        show: {
                            resource: ['message'],
                            operation: ['sendTextMessage', 'sendQuickReply'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'The text content of the message',
                },
                {
                    displayName: 'Image URL',
                    name: 'imageUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['message'],
                            operation: ['sendImageMessage'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'URL of the image to send',
                },
                {
                    displayName: 'Quick Replies',
                    name: 'quickReplies',
                    type: 'fixedCollection',
                    typeOptions: {
                        multipleValues: true,
                    },
                    displayOptions: {
                        show: {
                            resource: ['message'],
                            operation: ['sendQuickReply'],
                        },
                    },
                    default: {},
                    description: 'Quick reply buttons (optional - defaults to Yes/No)',
                    options: [
                        {
                            name: 'quickReply',
                            displayName: 'Quick Reply',
                            values: [
                                {
                                    displayName: 'Title',
                                    name: 'title',
                                    type: 'string',
                                    default: '',
                                    description: 'Button text (max 20 characters)',
                                },
                                {
                                    displayName: 'Payload',
                                    name: 'payload',
                                    type: 'string',
                                    default: '',
                                    description: 'Data sent back when button is pressed',
                                },
                            ],
                        },
                    ],
                },
                // ===== INSIGHTS PARAMETERS =====
                {
                    displayName: 'Post ID',
                    name: 'insightsPostId',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['insights'],
                            operation: ['getPostInsights'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'The ID of the post to get insights for',
                },
                // ===== CONVERSATION PARAMETERS =====
                {
                    displayName: 'Conversation ID',
                    name: 'conversationId',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['conversation', 'message'],
                            operation: ['getConversation', 'getMessages'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'The ID of the conversation',
                },
                // ===== EVENT PARAMETERS =====
                {
                    displayName: 'Event Name',
                    name: 'eventName',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['event'],
                            operation: ['createEvent', 'updateEvent'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'Name of the event',
                },
                {
                    displayName: 'Event Description',
                    name: 'eventDescription',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    displayOptions: {
                        show: {
                            resource: ['event'],
                            operation: ['createEvent', 'updateEvent'],
                        },
                    },
                    default: '',
                    description: 'Description of the event',
                },
                {
                    displayName: 'Start Time',
                    name: 'eventStartTime',
                    type: 'dateTime',
                    displayOptions: {
                        show: {
                            resource: ['event'],
                            operation: ['createEvent', 'updateEvent'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'Start date and time of the event',
                },
                {
                    displayName: 'Event ID',
                    name: 'eventId',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['event'],
                            operation: ['updateEvent', 'deleteEvent'],
                        },
                    },
                    required: true,
                    default: '',
                    description: 'The ID of the event',
                },
            ],
        };
        this.methods = {
            loadOptions: {
                async getPages() {
                    var _a;
                    try {
                        const credentials = await this.getCredentials('facebookOAuth2Api');
                        // Try multiple ways to get the access token
                        let userAccessToken = credentials.accessToken ||
                            credentials.access_token ||
                            ((_a = credentials.oauthTokenData) === null || _a === void 0 ? void 0 : _a.access_token);
                        // Debug logging
                        console.log('Credentials keys:', Object.keys(credentials));
                        console.log('Access token found:', !!userAccessToken);
                        if (!userAccessToken) {
                            // Try to get token from oauthTokenData if available
                            if (credentials.oauthTokenData && typeof credentials.oauthTokenData === 'object') {
                                const tokenData = credentials.oauthTokenData;
                                userAccessToken = tokenData.access_token || tokenData.accessToken;
                            }
                        }
                        if (!userAccessToken) {
                            throw new Error('No access token found. Please reconnect your Facebook account by clicking "Reconnect" in the credential settings.');
                        }
                        // First, verify the token is valid with minimal permissions
                        try {
                            await this.helpers.request({
                                method: 'GET',
                                url: 'https://graph.facebook.com/v18.0/me',
                                qs: {
                                    access_token: userAccessToken,
                                    fields: 'id,name',
                                },
                                json: true,
                            });
                        }
                        catch (tokenError) {
                            console.error('Token validation error:', tokenError);
                            throw new Error(`Invalid access token: ${tokenError.message}. Please reconnect your Facebook account.`);
                        }
                        // Fetch user's Pages with better error handling
                        let response;
                        try {
                            response = await this.helpers.request({
                                method: 'GET',
                                url: 'https://graph.facebook.com/v18.0/me/accounts',
                                qs: {
                                    access_token: userAccessToken,
                                    fields: 'id,name,access_token,tasks,category',
                                    limit: 100,
                                },
                                json: true,
                            });
                        }
                        catch (pagesError) {
                            console.error('Pages fetch error:', pagesError);
                            if (pagesError.message && pagesError.message.includes('2500')) {
                                throw new Error('Facebook API Error: Your access token may have expired or your app may not have the required permissions. Please reconnect your Facebook account and ensure your app has pages_show_list permission.');
                            }
                            throw new Error(`Failed to fetch Pages: ${pagesError.message}`);
                        }
                        if (!response.data || response.data.length === 0) {
                            throw new Error('No Pages found. Please ensure you have admin or task access on at least one Facebook Page, or that your Facebook app has the required permissions (pages_show_list, pages_read_engagement).');
                        }
                        return response.data.map((page) => ({
                            name: page.name,
                            value: page.id,
                        }));
                    }
                    catch (error) {
                        // Provide more specific error messages
                        if (error.message.includes('OAuthException')) {
                            throw new Error('Facebook authentication failed. Please reconnect your Facebook account and ensure your app has the required permissions.');
                        }
                        if (error.message.includes('2500')) {
                            throw new Error('Invalid access token. Please reconnect your Facebook account.');
                        }
                        throw new Error(`Failed to load Pages: ${error.message}`);
                    }
                },
                async getPostIds() {
                    var _a;
                    try {
                        const credentials = await this.getCredentials('facebookOAuth2Api');
                        const pageId = this.getCurrentNodeParameter('pageId');
                        if (!pageId) {
                            return [];
                        }
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
                        // Fetch recent posts
                        const postsResponse = await this.helpers.request({
                            method: 'GET',
                            url: `https://graph.facebook.com/v18.0/${pageId}/posts`,
                            qs: {
                                access_token: pageAccessToken,
                                fields: 'id,message,created_time',
                                limit: 50,
                            },
                            json: true,
                        });
                        if (!postsResponse.data || postsResponse.data.length === 0) {
                            return [{
                                    name: 'No posts found',
                                    value: '',
                                }];
                        }
                        return postsResponse.data.map((post) => ({
                            name: `${post.message ? post.message.substring(0, 50) + '...' : 'Post'} (${new Date(post.created_time).toLocaleDateString()})`,
                            value: post.id,
                        }));
                    }
                    catch (error) {
                        return [{
                                name: `Error loading posts: ${error.message}`,
                                value: '',
                            }];
                    }
                },
                async getRecipientIds() {
                    var _a;
                    try {
                        const credentials = await this.getCredentials('facebookOAuth2Api');
                        const pageId = this.getCurrentNodeParameter('pageId');
                        if (!pageId) {
                            return [];
                        }
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
                        // Fetch recent conversations to get recipient IDs
                        const conversationsResponse = await this.helpers.request({
                            method: 'GET',
                            url: `https://graph.facebook.com/v18.0/${pageId}/conversations`,
                            qs: {
                                access_token: pageAccessToken,
                                fields: 'participants,updated_time',
                                limit: 50,
                            },
                            json: true,
                        });
                        if (!conversationsResponse.data || conversationsResponse.data.length === 0) {
                            return [{
                                    name: 'No conversations found',
                                    value: '',
                                }];
                        }
                        const recipients = [];
                        const seenIds = new Set();
                        conversationsResponse.data.forEach((conversation) => {
                            if (conversation.participants && conversation.participants.data) {
                                conversation.participants.data.forEach((participant) => {
                                    if (participant.id !== pageId && !seenIds.has(participant.id)) {
                                        seenIds.add(participant.id);
                                        recipients.push({
                                            name: `${participant.name || 'User'} (${participant.id})`,
                                            value: participant.id,
                                        });
                                    }
                                });
                            }
                        });
                        if (recipients.length === 0) {
                            return [{
                                    name: 'No recipients found',
                                    value: '',
                                }];
                        }
                        return recipients;
                    }
                    catch (error) {
                        return [{
                                name: `Error loading recipients: ${error.message}`,
                                value: '',
                            }];
                    }
                },
            },
        };
    }
    async execute() {
        var _a;
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            try {
                const credentials = await this.getCredentials('facebookOAuth2Api');
                const resource = this.getNodeParameter('resource', i);
                const operation = this.getNodeParameter('operation', i);
                const pageId = this.getNodeParameter('pageId', i);
                // Try multiple ways to get the access token
                let userAccessToken = credentials.accessToken ||
                    credentials.access_token ||
                    ((_a = credentials.oauthTokenData) === null || _a === void 0 ? void 0 : _a.access_token);
                // Try to get token from oauthTokenData if available
                if (!userAccessToken && credentials.oauthTokenData && typeof credentials.oauthTokenData === 'object') {
                    const tokenData = credentials.oauthTokenData;
                    userAccessToken = tokenData.access_token || tokenData.accessToken;
                }
                if (!userAccessToken) {
                    throw new Error('No access token found. Please reconnect your Facebook account by clicking "Reconnect" in the credential settings.');
                }
                // Verify token is valid first
                try {
                    await this.helpers.request({
                        method: 'GET',
                        url: 'https://graph.facebook.com/v18.0/me',
                        qs: {
                            access_token: userAccessToken,
                            fields: 'id',
                        },
                        json: true,
                    });
                }
                catch (tokenError) {
                    throw new Error(`Invalid access token: ${tokenError.message}. Please reconnect your Facebook account.`);
                }
                // Get Page access token for operations that need it
                let pageAccessToken = userAccessToken;
                if (['post', 'comment', 'media', 'event'].includes(resource)) {
                    const pageResponse = await this.helpers.request({
                        method: 'GET',
                        url: 'https://graph.facebook.com/v18.0/me/accounts',
                        qs: {
                            access_token: userAccessToken,
                            fields: 'id,name,access_token,tasks',
                        },
                        json: true,
                    });
                    if (!pageResponse.data || pageResponse.data.length === 0) {
                        throw new Error('No Pages found. Please ensure you have admin or task access on at least one Facebook Page.');
                    }
                    const targetPage = pageResponse.data.find((page) => page.id === pageId);
                    if (!targetPage) {
                        throw new Error(`Page with ID ${pageId} not found or you don't have access to it. Available pages: ${pageResponse.data.map((p) => p.name).join(', ')}`);
                    }
                    pageAccessToken = targetPage.access_token || userAccessToken;
                }
                let result;
                // ===== POST OPERATIONS =====
                if (resource === 'post') {
                    if (operation === 'createTextPost') {
                        const message = this.getNodeParameter('message', i);
                        if (!message || message.trim().length === 0) {
                            throw new Error('Message cannot be empty. Please provide content for your post.');
                        }
                        const formData = {
                            message: message.trim(),
                            access_token: pageAccessToken,
                        };
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${pageId}/feed`,
                            form: formData,
                            json: true,
                        });
                        result = {
                            success: true,
                            postId: response.id,
                            message: 'Text post created successfully',
                            pageId: pageId,
                            content: {
                                message: message.trim(),
                            },
                        };
                    }
                    else if (operation === 'createTextPostWithBackground') {
                        const backgroundPostMessage = this.getNodeParameter('backgroundPostMessage', i);
                        const textFormatPresetId = this.getNodeParameter('textFormatPresetId', i);
                        const customPresetId = this.getNodeParameter('customPresetId', i, '');
                        if (!backgroundPostMessage || backgroundPostMessage.trim().length === 0) {
                            throw new Error('Message cannot be empty. Please provide content for your background post.');
                        }
                        // Use custom preset ID if provided, otherwise use selected preset
                        const presetId = customPresetId && customPresetId.trim().length > 0
                            ? customPresetId.trim()
                            : textFormatPresetId;
                        const formData = {
                            message: backgroundPostMessage.trim(),
                            text_format_preset_id: presetId,
                            access_token: pageAccessToken,
                        };
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${pageId}/feed`,
                            form: formData,
                            json: true,
                        });
                        result = {
                            success: true,
                            postId: response.id,
                            message: 'Text post with background created successfully',
                            pageId: pageId,
                            content: {
                                message: backgroundPostMessage.trim(),
                                text_format_preset_id: presetId,
                            },
                        };
                    }
                    else if (operation === 'createLinkPostWithText') {
                        const linkPostMessage = this.getNodeParameter('linkPostMessage', i);
                        const linkPostUrl = this.getNodeParameter('linkPostUrl', i);
                        if (!linkPostMessage || linkPostMessage.trim().length === 0) {
                            throw new Error('Message cannot be empty. Please provide text content for your link post.');
                        }
                        if (!linkPostUrl || linkPostUrl.trim().length === 0) {
                            throw new Error('Link URL is required.');
                        }
                        const formData = {
                            message: linkPostMessage.trim(),
                            link: linkPostUrl.trim(),
                            access_token: pageAccessToken,
                        };
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${pageId}/feed`,
                            form: formData,
                            json: true,
                        });
                        result = {
                            success: true,
                            postId: response.id,
                            message: 'Link post with text created successfully',
                            pageId: pageId,
                            content: {
                                message: linkPostMessage.trim(),
                                link: linkPostUrl.trim(),
                            },
                        };
                    }
                    else if (operation === 'createPhotoPost') {
                        const inputType = this.getNodeParameter('inputType', i);
                        const imageUrl = this.getNodeParameter('imageUrl', i, '');
                        const binaryProperty = this.getNodeParameter('binaryProperty', i, 'data');
                        const caption = this.getNodeParameter('caption', i, '');
                        const published = this.getNodeParameter('published', i, true);
                        let response;
                        if (inputType === 'url') {
                            if (!imageUrl || imageUrl.trim().length === 0) {
                                throw new Error('Image URL is required when using URL input type.');
                            }
                            const formData = {
                                url: imageUrl,
                                access_token: pageAccessToken,
                                published: published,
                            };
                            if (caption && caption.trim().length > 0) {
                                formData.caption = caption.trim();
                            }
                            response = await this.helpers.request({
                                method: 'POST',
                                url: `https://graph.facebook.com/v18.0/${pageId}/photos`,
                                form: formData,
                                json: true,
                            });
                        }
                        else {
                            const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
                            const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
                            const formData = {
                                access_token: pageAccessToken,
                                published: published,
                            };
                            if (caption && caption.trim().length > 0) {
                                formData.caption = caption.trim();
                            }
                            formData.source = {
                                value: dataBuffer,
                                options: {
                                    filename: binaryData.fileName || 'image.jpg',
                                    contentType: binaryData.mimeType || 'image/jpeg',
                                },
                            };
                            response = await this.helpers.request({
                                method: 'POST',
                                url: `https://graph.facebook.com/v18.0/${pageId}/photos`,
                                formData: formData,
                                json: true,
                            });
                        }
                        result = {
                            success: true,
                            postId: response.id,
                            message: 'Photo post created successfully',
                            pageId: pageId,
                            content: {
                                inputType: inputType,
                                imageUrl: inputType === 'url' ? imageUrl : undefined,
                                caption: caption || undefined,
                                published: published,
                            },
                        };
                    }
                    else if (operation === 'createVideoPost') {
                        const videoInputType = this.getNodeParameter('videoInputType', i);
                        const videoUrl = this.getNodeParameter('videoUrl', i, '');
                        const videoBinaryProperty = this.getNodeParameter('videoBinaryProperty', i, 'data');
                        const videoDescription = this.getNodeParameter('videoDescription', i, '');
                        let response;
                        if (videoInputType === 'url') {
                            if (!videoUrl || videoUrl.trim().length === 0) {
                                throw new Error('Video URL is required when using URL input type.');
                            }
                            const formData = {
                                file_url: videoUrl,
                                access_token: pageAccessToken,
                            };
                            if (videoDescription && videoDescription.trim().length > 0) {
                                formData.description = videoDescription.trim();
                            }
                            response = await this.helpers.request({
                                method: 'POST',
                                url: `https://graph.facebook.com/v18.0/${pageId}/videos`,
                                form: formData,
                                json: true,
                            });
                        }
                        else {
                            const binaryData = this.helpers.assertBinaryData(i, videoBinaryProperty);
                            const dataBuffer = await this.helpers.getBinaryDataBuffer(i, videoBinaryProperty);
                            const formData = {
                                access_token: pageAccessToken,
                            };
                            if (videoDescription && videoDescription.trim().length > 0) {
                                formData.description = videoDescription.trim();
                            }
                            formData.source = {
                                value: dataBuffer,
                                options: {
                                    filename: binaryData.fileName || 'video.mp4',
                                    contentType: binaryData.mimeType || 'video/mp4',
                                },
                            };
                            response = await this.helpers.request({
                                method: 'POST',
                                url: `https://graph.facebook.com/v18.0/${pageId}/videos`,
                                formData: formData,
                                json: true,
                            });
                        }
                        result = {
                            success: true,
                            postId: response.id,
                            message: 'Video post created successfully',
                            pageId: pageId,
                            content: {
                                inputType: videoInputType,
                                videoUrl: videoInputType === 'url' ? videoUrl : undefined,
                                description: videoDescription || undefined,
                            },
                        };
                    }
                    else if (operation === 'createLinkPost') {
                        const linkUrl = this.getNodeParameter('linkUrl', i);
                        const linkMessage = this.getNodeParameter('linkMessage', i, '');
                        if (!linkUrl || linkUrl.trim().length === 0) {
                            throw new Error('Link URL is required.');
                        }
                        const formData = {
                            link: linkUrl.trim(),
                            access_token: pageAccessToken,
                        };
                        if (linkMessage && linkMessage.trim().length > 0) {
                            formData.message = linkMessage.trim();
                        }
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${pageId}/feed`,
                            form: formData,
                            json: true,
                        });
                        result = {
                            success: true,
                            postId: response.id,
                            message: 'Link post created successfully',
                            pageId: pageId,
                            content: {
                                link: linkUrl.trim(),
                                message: linkMessage || undefined,
                            },
                        };
                    }
                    else if (operation === 'createScheduledPost') {
                        const message = this.getNodeParameter('message', i);
                        const scheduledPublishTime = this.getNodeParameter('scheduledPublishTime', i);
                        if (!message || message.trim().length === 0) {
                            throw new Error('Message cannot be empty.');
                        }
                        const publishTime = Math.floor(new Date(scheduledPublishTime).getTime() / 1000);
                        const now = Math.floor(Date.now() / 1000);
                        if (publishTime <= now + 600) { // Must be at least 10 minutes in the future
                            throw new Error('Scheduled time must be at least 10 minutes in the future.');
                        }
                        const formData = {
                            message: message.trim(),
                            published: false,
                            scheduled_publish_time: publishTime,
                            access_token: pageAccessToken,
                        };
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${pageId}/feed`,
                            form: formData,
                            json: true,
                        });
                        result = {
                            success: true,
                            postId: response.id,
                            message: 'Scheduled post created successfully',
                            pageId: pageId,
                            scheduledTime: scheduledPublishTime,
                            content: {
                                message: message.trim(),
                            },
                        };
                    }
                    else if (operation === 'getPosts') {
                        const limit = this.getNodeParameter('limit', i, 25);
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `https://graph.facebook.com/v18.0/${pageId}/posts`,
                            qs: {
                                access_token: pageAccessToken,
                                limit: Math.min(limit, 100),
                                fields: 'id,message,created_time,likes.summary(true),comments.summary(true),shares',
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Posts retrieved successfully',
                            pageId: pageId,
                            posts: response.data,
                            count: response.data.length,
                        };
                    }
                    else if (operation === 'getPost') {
                        const postId = this.getNodeParameter('postId', i);
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `https://graph.facebook.com/v18.0/${postId}`,
                            qs: {
                                access_token: pageAccessToken,
                                fields: 'id,message,created_time,likes.summary(true),comments.summary(true),shares,insights',
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Post retrieved successfully',
                            post: response,
                        };
                    }
                    else if (operation === 'updatePost') {
                        const postId = this.getNodeParameter('postId', i);
                        const message = this.getNodeParameter('message', i);
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${postId}`,
                            form: {
                                message: message.trim(),
                                access_token: pageAccessToken,
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Post updated successfully',
                            postId: postId,
                            updated: response.success,
                        };
                    }
                    else if (operation === 'deletePost') {
                        const postId = this.getNodeParameter('postId', i);
                        const response = await this.helpers.request({
                            method: 'DELETE',
                            url: `https://graph.facebook.com/v18.0/${postId}`,
                            qs: {
                                access_token: pageAccessToken,
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Post deleted successfully',
                            postId: postId,
                            deleted: response.success,
                        };
                    }
                    // ===== COMMENT OPERATIONS =====
                }
                else if (resource === 'comment') {
                    if (operation === 'getComments') {
                        const commentPostId = this.getNodeParameter('commentPostId', i);
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `https://graph.facebook.com/v18.0/${commentPostId}/comments`,
                            qs: {
                                access_token: pageAccessToken,
                                fields: 'id,message,created_time,from,like_count,comment_count',
                                limit: 100,
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Comments retrieved successfully',
                            postId: commentPostId,
                            comments: response.data,
                            count: response.data.length,
                        };
                    }
                    else if (operation === 'createComment') {
                        const commentPostId = this.getNodeParameter('commentPostId', i);
                        const commentMessage = this.getNodeParameter('commentMessage', i);
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${commentPostId}/comments`,
                            form: {
                                message: commentMessage.trim(),
                                access_token: pageAccessToken,
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Comment created successfully',
                            commentId: response.id,
                            postId: commentPostId,
                            content: {
                                message: commentMessage.trim(),
                            },
                        };
                    }
                    else if (operation === 'createCommentWithImage') {
                        const commentPostId = this.getNodeParameter('commentPostId', i);
                        const imageInputType = this.getNodeParameter('imageInputType', i, 'url');
                        const commentMessage = this.getNodeParameter('commentMessage', i, '');
                        let imageBuffer;
                        let fileName = 'comment_image.jpg';
                        let imageUrl = '';
                        // Handle different input types
                        if (imageInputType === 'binary') {
                            const binaryPropertyName = this.getNodeParameter('imageBinaryProperty', i);
                            const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
                            imageBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
                            fileName = binaryData.fileName || 'comment_image.jpg';
                        }
                        else {
                            imageUrl = this.getNodeParameter('imageUrl', i);
                            // Validate image URL
                            if (!imageUrl || !imageUrl.startsWith('http')) {
                                throw new Error('Please provide a valid image URL starting with http:// or https://');
                            }
                        }
                        let response;
                        let uploadMethod = 'direct_url';
                        try {
                            // Method 1: Try direct attachment_url first (only for URL inputs)
                            if (imageInputType === 'url') {
                                const formData = {
                                    access_token: pageAccessToken,
                                    attachment_url: imageUrl,
                                };
                                // Add message if provided
                                if (commentMessage && commentMessage.trim()) {
                                    formData.message = commentMessage.trim();
                                }
                                response = await this.helpers.request({
                                    method: 'POST',
                                    url: `https://graph.facebook.com/v18.0/${commentPostId}/comments`,
                                    form: formData,
                                    json: true,
                                });
                            }
                            else {
                                // For binary data, skip direct URL method
                                throw new Error('Binary data requires upload method');
                            }
                        }
                        catch (directUrlError) {
                            try {
                                // Method 2: Upload image first, then use attachment_id
                                uploadMethod = 'upload_first';
                                // Get image buffer
                                if (imageInputType === 'url') {
                                    // Download the image
                                    imageBuffer = await this.helpers.request({
                                        method: 'GET',
                                        url: imageUrl,
                                        encoding: null, // Important: get binary data
                                    });
                                    fileName = imageUrl.split('/').pop() || 'comment_image.jpg';
                                }
                                // For binary input, imageBuffer is already set
                                // Step 2: Upload image to Facebook
                                const uploadResponse = await this.helpers.request({
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
                                const formData = {
                                    access_token: pageAccessToken,
                                    attachment_id: uploadResponse.id,
                                };
                                if (commentMessage && commentMessage.trim()) {
                                    formData.message = commentMessage.trim();
                                }
                                response = await this.helpers.request({
                                    method: 'POST',
                                    url: `https://graph.facebook.com/v18.0/${commentPostId}/comments`,
                                    form: formData,
                                    json: true,
                                });
                            }
                            catch (uploadError) {
                                // Method 3: Try resumable upload API
                                uploadMethod = 'resumable_upload';
                                // Get app ID from credentials
                                const appId = credentials.clientId || credentials.appId;
                                if (!appId) {
                                    throw new Error('App ID not found in credentials. Cannot use resumable upload. Please check your Facebook OAuth2 credentials configuration.');
                                }
                                // Get image buffer if not already available
                                if (imageInputType === 'url' && !imageBuffer) {
                                    imageBuffer = await this.helpers.request({
                                        method: 'GET',
                                        url: imageUrl,
                                        encoding: null,
                                    });
                                    fileName = imageUrl.split('/').pop() || 'image.jpg';
                                }
                                const fileLength = Buffer.byteLength(imageBuffer);
                                const fileType = 'image/jpeg'; // Default, could be improved with proper detection
                                // Step 2: Start upload session
                                const uploadSessionResponse = await this.helpers.request({
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
                                const uploadResponse = await this.helpers.request({
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
                                const formData = {
                                    access_token: pageAccessToken,
                                    attachment_id: fileHandle,
                                };
                                if (commentMessage && commentMessage.trim()) {
                                    formData.message = commentMessage.trim();
                                }
                                response = await this.helpers.request({
                                    method: 'POST',
                                    url: `https://graph.facebook.com/v18.0/${commentPostId}/comments`,
                                    form: formData,
                                    json: true,
                                });
                            }
                        }
                        result = {
                            success: true,
                            message: `Comment with image created successfully (${uploadMethod})`,
                            commentId: response.id,
                            postId: commentPostId,
                            uploadMethod: uploadMethod,
                            inputType: imageInputType,
                            content: {
                                message: commentMessage.trim() || '',
                                imageUrl: imageInputType === 'url' ? imageUrl : 'Binary data',
                                fileName: fileName,
                                attachmentUrl: imageInputType === 'url' ? imageUrl : undefined,
                            },
                        };
                    }
                    else if (operation === 'replyToComment') {
                        const commentId = this.getNodeParameter('commentId', i);
                        const commentMessage = this.getNodeParameter('commentMessage', i);
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${commentId}/comments`,
                            form: {
                                message: commentMessage.trim(),
                                access_token: pageAccessToken,
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Reply created successfully',
                            replyId: response.id,
                            parentCommentId: commentId,
                            content: {
                                message: commentMessage.trim(),
                            },
                        };
                    }
                    else if (operation === 'updateComment') {
                        const commentId = this.getNodeParameter('commentId', i);
                        const commentMessage = this.getNodeParameter('commentMessage', i);
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${commentId}`,
                            form: {
                                message: commentMessage.trim(),
                                access_token: pageAccessToken,
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Comment updated successfully',
                            commentId: commentId,
                            updated: response.success,
                        };
                    }
                    else if (operation === 'deleteComment') {
                        const commentId = this.getNodeParameter('commentId', i);
                        const response = await this.helpers.request({
                            method: 'DELETE',
                            url: `https://graph.facebook.com/v18.0/${commentId}`,
                            qs: {
                                access_token: pageAccessToken,
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Comment deleted successfully',
                            commentId: commentId,
                            deleted: response.success,
                        };
                    }
                    else if (operation === 'hideComment') {
                        const commentId = this.getNodeParameter('commentId', i);
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${commentId}`,
                            form: {
                                is_hidden: true,
                                access_token: pageAccessToken,
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Comment hidden successfully',
                            commentId: commentId,
                            hidden: response.success,
                        };
                    }
                    else if (operation === 'likeComment') {
                        const commentId = this.getNodeParameter('commentId', i);
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${commentId}/likes`,
                            form: {
                                access_token: pageAccessToken,
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Comment liked successfully',
                            commentId: commentId,
                            liked: response.success,
                        };
                    }
                    // ===== MESSAGE OPERATIONS =====
                }
                else if (resource === 'message') {
                    if (operation === 'sendTextMessage') {
                        const recipientId = this.getNodeParameter('recipientId', i);
                        const messageText = this.getNodeParameter('messageText', i);
                        if (!messageText || messageText.trim().length === 0) {
                            throw new Error('Message text cannot be empty.');
                        }
                        if (!recipientId || recipientId.trim().length === 0) {
                            throw new Error('Recipient ID is required.');
                        }
                        // Use the correct Page-specific Messenger API endpoint
                        const messageData = {
                            recipient: {
                                id: recipientId.trim()
                            },
                            message: {
                                text: messageText.trim()
                            }
                        };
                        try {
                            const response = await this.helpers.request({
                                method: 'POST',
                                url: `https://graph.facebook.com/v18.0/${pageId}/messages`,
                                qs: {
                                    access_token: pageAccessToken,
                                },
                                body: messageData,
                                json: true,
                            });
                            result = {
                                success: true,
                                message: 'Text message sent successfully',
                                messageId: response.message_id,
                                recipientId: recipientId.trim(),
                                content: {
                                    text: messageText.trim(),
                                },
                            };
                        }
                        catch (error) {
                            // If page messages fail, try the alternative endpoint
                            if (error.message && error.message.includes('does not exist')) {
                                try {
                                    const alternativeResponse = await this.helpers.request({
                                        method: 'POST',
                                        url: `https://graph.facebook.com/v18.0/me/messages`,
                                        qs: {
                                            access_token: pageAccessToken,
                                        },
                                        body: messageData,
                                        json: true,
                                    });
                                    result = {
                                        success: true,
                                        message: 'Text message sent successfully (alternative endpoint)',
                                        messageId: alternativeResponse.message_id,
                                        recipientId: recipientId.trim(),
                                        content: {
                                            text: messageText.trim(),
                                        },
                                    };
                                }
                                catch (altError) {
                                    throw new Error(`Message sending failed. This may be due to: 1) Missing Messenger permissions on your Facebook app, 2) The recipient hasn't messaged your page first, 3) Invalid recipient ID. Original error: ${error.message}. Alternative error: ${altError.message}`);
                                }
                            }
                            else {
                                throw new Error(`Message sending failed: ${error.message}. Please ensure: 1) Your Facebook app has pages_messaging permission, 2) The recipient has messaged your page before, 3) The recipient ID is valid.`);
                            }
                        }
                    }
                    else if (operation === 'sendImageMessage') {
                        const recipientId = this.getNodeParameter('recipientId', i);
                        const imageUrl = this.getNodeParameter('imageUrl', i, '');
                        if (!imageUrl || imageUrl.trim().length === 0) {
                            throw new Error('Image URL is required for image messages.');
                        }
                        if (!recipientId || recipientId.trim().length === 0) {
                            throw new Error('Recipient ID is required.');
                        }
                        const messageData = {
                            recipient: {
                                id: recipientId.trim()
                            },
                            message: {
                                attachment: {
                                    type: 'image',
                                    payload: {
                                        url: imageUrl.trim(),
                                        is_reusable: true
                                    }
                                }
                            }
                        };
                        try {
                            const response = await this.helpers.request({
                                method: 'POST',
                                url: `https://graph.facebook.com/v18.0/${pageId}/messages`,
                                qs: {
                                    access_token: pageAccessToken,
                                },
                                body: messageData,
                                json: true,
                            });
                            result = {
                                success: true,
                                message: 'Image message sent successfully',
                                messageId: response.message_id,
                                recipientId: recipientId.trim(),
                                content: {
                                    imageUrl: imageUrl.trim(),
                                },
                            };
                        }
                        catch (error) {
                            throw new Error(`Image message sending failed: ${error.message}. Please ensure: 1) Your Facebook app has pages_messaging permission, 2) The recipient has messaged your page before, 3) The image URL is accessible.`);
                        }
                    }
                    else if (operation === 'sendQuickReply') {
                        const recipientId = this.getNodeParameter('recipientId', i);
                        const messageText = this.getNodeParameter('messageText', i);
                        const quickReplies = this.getNodeParameter('quickReplies', i, []);
                        if (!messageText || messageText.trim().length === 0) {
                            throw new Error('Message text cannot be empty.');
                        }
                        if (!recipientId || recipientId.trim().length === 0) {
                            throw new Error('Recipient ID is required.');
                        }
                        const messageData = {
                            recipient: {
                                id: recipientId.trim()
                            },
                            message: {
                                text: messageText.trim(),
                                quick_replies: quickReplies.length > 0 ? quickReplies : [
                                    {
                                        content_type: 'text',
                                        title: 'Yes',
                                        payload: 'YES'
                                    },
                                    {
                                        content_type: 'text',
                                        title: 'No',
                                        payload: 'NO'
                                    }
                                ]
                            }
                        };
                        try {
                            const response = await this.helpers.request({
                                method: 'POST',
                                url: `https://graph.facebook.com/v18.0/${pageId}/messages`,
                                qs: {
                                    access_token: pageAccessToken,
                                },
                                body: messageData,
                                json: true,
                            });
                            result = {
                                success: true,
                                message: 'Quick reply message sent successfully',
                                messageId: response.message_id,
                                recipientId: recipientId.trim(),
                                content: {
                                    text: messageText.trim(),
                                    quickReplies: messageData.message.quick_replies,
                                },
                            };
                        }
                        catch (error) {
                            throw new Error(`Quick reply message sending failed: ${error.message}. Please ensure: 1) Your Facebook app has pages_messaging permission, 2) The recipient has messaged your page before, 3) Quick reply format is valid.`);
                        }
                    }
                    else if (operation === 'getMessages') {
                        const conversationId = this.getNodeParameter('conversationId', i);
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `https://graph.facebook.com/v18.0/${conversationId}/messages`,
                            qs: {
                                access_token: pageAccessToken,
                                fields: 'id,message,created_time,from',
                                limit: 50,
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Messages retrieved successfully',
                            conversationId: conversationId,
                            messages: response.data,
                            count: response.data.length,
                        };
                    }
                    // ===== CONVERSATION OPERATIONS =====
                }
                else if (resource === 'conversation') {
                    if (operation === 'getConversations') {
                        try {
                            // Use the correct endpoint for page conversations
                            const response = await this.helpers.request({
                                method: 'GET',
                                url: `https://graph.facebook.com/v18.0/me/conversations`,
                                qs: {
                                    access_token: pageAccessToken,
                                    fields: 'id,updated_time,message_count,participants,snippet',
                                    limit: 50,
                                },
                                json: true,
                            });
                            result = {
                                success: true,
                                message: 'Conversations retrieved successfully',
                                pageId: pageId,
                                conversations: response.data || [],
                                count: response.data ? response.data.length : 0,
                                paging: response.paging,
                            };
                        }
                        catch (error) {
                            // Fallback to alternative endpoint if the first fails
                            try {
                                const fallbackResponse = await this.helpers.request({
                                    method: 'GET',
                                    url: `https://graph.facebook.com/v18.0/${pageId}/conversations`,
                                    qs: {
                                        access_token: pageAccessToken,
                                        fields: 'id,updated_time,message_count',
                                        limit: 50,
                                    },
                                    json: true,
                                });
                                result = {
                                    success: true,
                                    message: 'Conversations retrieved successfully (fallback)',
                                    pageId: pageId,
                                    conversations: fallbackResponse.data || [],
                                    count: fallbackResponse.data ? fallbackResponse.data.length : 0,
                                    note: 'Retrieved using fallback endpoint',
                                };
                            }
                            catch (fallbackError) {
                                throw new Error(`Failed to retrieve conversations: ${error.message}. Fallback also failed: ${fallbackError.message}. Please ensure your Facebook app has 'pages_messaging' permission and the page access token is valid.`);
                            }
                        }
                    }
                    else if (operation === 'getConversation') {
                        const conversationId = this.getNodeParameter('conversationId', i);
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `https://graph.facebook.com/v18.0/${conversationId}`,
                            qs: {
                                access_token: pageAccessToken,
                                fields: 'id,updated_time,message_count,participants,messages{id,message,created_time,from}',
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Conversation retrieved successfully',
                            conversation: response,
                        };
                    }
                    // ===== INSIGHTS OPERATIONS =====
                }
                else if (resource === 'insights') {
                    if (operation === 'getPageInsights') {
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `https://graph.facebook.com/v18.0/${pageId}/insights`,
                            qs: {
                                access_token: pageAccessToken,
                                metric: 'page_views_total,page_impressions,page_fans,page_engaged_users',
                                period: 'day',
                                since: Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000), // Last 7 days
                                until: Math.floor(Date.now() / 1000),
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Page insights retrieved successfully',
                            pageId: pageId,
                            insights: response.data,
                        };
                    }
                    else if (operation === 'getPostInsights') {
                        const insightsPostId = this.getNodeParameter('insightsPostId', i);
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `https://graph.facebook.com/v18.0/${insightsPostId}/insights`,
                            qs: {
                                access_token: pageAccessToken,
                                metric: 'post_impressions,post_reach,post_engaged_users,post_clicks,post_reactions_by_type_total',
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Post insights retrieved successfully',
                            postId: insightsPostId,
                            insights: response.data,
                        };
                    }
                    // ===== EVENT OPERATIONS =====
                }
                else if (resource === 'event') {
                    if (operation === 'createEvent') {
                        const eventName = this.getNodeParameter('eventName', i);
                        const eventDescription = this.getNodeParameter('eventDescription', i, '');
                        const eventStartTime = this.getNodeParameter('eventStartTime', i);
                        const formData = {
                            name: eventName,
                            start_time: new Date(eventStartTime).toISOString(),
                            access_token: pageAccessToken,
                        };
                        if (eventDescription && eventDescription.trim().length > 0) {
                            formData.description = eventDescription.trim();
                        }
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${pageId}/events`,
                            form: formData,
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Event created successfully',
                            eventId: response.id,
                            pageId: pageId,
                            content: {
                                name: eventName,
                                description: eventDescription || undefined,
                                startTime: eventStartTime,
                            },
                        };
                    }
                    else if (operation === 'getEvents') {
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `https://graph.facebook.com/v18.0/${pageId}/events`,
                            qs: {
                                access_token: pageAccessToken,
                                fields: 'id,name,description,start_time,end_time,place,attending_count,interested_count',
                                limit: 50,
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Events retrieved successfully',
                            pageId: pageId,
                            events: response.data,
                            count: response.data.length,
                        };
                    }
                    else if (operation === 'updateEvent') {
                        const eventId = this.getNodeParameter('eventId', i);
                        const eventName = this.getNodeParameter('eventName', i);
                        const eventDescription = this.getNodeParameter('eventDescription', i, '');
                        const formData = {
                            name: eventName,
                            access_token: pageAccessToken,
                        };
                        if (eventDescription && eventDescription.trim().length > 0) {
                            formData.description = eventDescription.trim();
                        }
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `https://graph.facebook.com/v18.0/${eventId}`,
                            form: formData,
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Event updated successfully',
                            eventId: eventId,
                            updated: response.success,
                        };
                    }
                    else if (operation === 'deleteEvent') {
                        const eventId = this.getNodeParameter('eventId', i);
                        const response = await this.helpers.request({
                            method: 'DELETE',
                            url: `https://graph.facebook.com/v18.0/${eventId}`,
                            qs: {
                                access_token: pageAccessToken,
                            },
                            json: true,
                        });
                        result = {
                            success: true,
                            message: 'Event deleted successfully',
                            eventId: eventId,
                            deleted: response.success,
                        };
                    }
                }
                else {
                    throw new Error(`Unknown resource: ${resource}`);
                }
                returnData.push({
                    json: result,
                    pairedItem: {
                        item: i,
                    },
                });
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error.message,
                        },
                        pairedItem: {
                            item: i,
                        },
                    });
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.FacebookPagePublisher = FacebookPagePublisher;
//# sourceMappingURL=FacebookPagePublisher.node.js.map