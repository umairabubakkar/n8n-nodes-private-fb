import type {
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
	ICredentialDataDecryptedObject,
	IHttpRequestOptions,
} from 'n8n-workflow';

export class FacebookOAuth2Api implements ICredentialType {
	name = 'facebookOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'Facebook OAuth2 API';

	documentationUrl = 'facebook';

	properties: INodeProperties[] = [
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

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://graph.facebook.com/v18.0',
			url: '/me',
			qs: {
				fields: 'id,name',
			},
		},
	};

	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		// Add access token to query parameters for Facebook API
		if (credentials.accessToken) {
			requestOptions.qs = requestOptions.qs || {};
			requestOptions.qs.access_token = credentials.accessToken;
		}
		return requestOptions;
	}
}