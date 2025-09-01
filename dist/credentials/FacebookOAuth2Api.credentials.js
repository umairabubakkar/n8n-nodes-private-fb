"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookOAuth2Api = void 0;
class FacebookOAuth2Api {
    constructor() {
        this.name = 'facebookOAuth2Api';
        this.extends = ['oAuth2Api'];
        this.displayName = 'Facebook OAuth2 API';
        this.documentationUrl = 'facebook';
        this.properties = [
            {
                displayName: 'Grant Type',
                name: 'grantType',
                type: 'hidden',
                default: 'authorizationCode',
            },
            {
                displayName: 'Authorization URL',
                name: 'authUrl',
                type: 'hidden',
                default: 'https://www.facebook.com/v18.0/dialog/oauth',
            },
            {
                displayName: 'Access Token URL',
                name: 'accessTokenUrl',
                type: 'hidden',
                default: 'https://graph.facebook.com/v18.0/oauth/access_token',
            },
            {
                displayName: 'Scope',
                name: 'scope',
                type: 'hidden',
                default: 'pages_manage_posts,pages_read_engagement,pages_show_list,pages_messaging,pages_messaging_subscriptions,public_profile,instagram_basic,read_insights',
            },
            {
                displayName: 'Auth URI Query Parameters',
                name: 'authQueryParameters',
                type: 'hidden',
                default: '',
            },
            {
                displayName: 'Authentication',
                name: 'authentication',
                type: 'hidden',
                default: 'body',
            },
        ];
        this.test = {
            request: {
                baseURL: 'https://graph.facebook.com/v18.0',
                url: '/me',
                qs: {
                    fields: 'id,name',
                },
            },
        };
    }
    async authenticate(credentials, requestOptions) {
        // Add access token to query parameters for Facebook API
        if (credentials.accessToken) {
            requestOptions.qs = requestOptions.qs || {};
            requestOptions.qs.access_token = credentials.accessToken;
        }
        return requestOptions;
    }
}
exports.FacebookOAuth2Api = FacebookOAuth2Api;
//# sourceMappingURL=FacebookOAuth2Api.credentials.js.map