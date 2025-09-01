import type { ICredentialType, INodeProperties, ICredentialTestRequest, ICredentialDataDecryptedObject, IHttpRequestOptions } from 'n8n-workflow';
export declare class FacebookOAuth2Api implements ICredentialType {
    name: string;
    extends: string[];
    displayName: string;
    documentationUrl: string;
    properties: INodeProperties[];
    test: ICredentialTestRequest;
    authenticate(credentials: ICredentialDataDecryptedObject, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions>;
}
//# sourceMappingURL=FacebookOAuth2Api.credentials.d.ts.map