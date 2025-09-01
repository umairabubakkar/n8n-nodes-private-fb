import type { INodeType, INodeTypeDescription, ITriggerFunctions, ITriggerResponse, IWebhookFunctions, IWebhookResponseData, ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
export declare class FacebookPageTrigger implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getPages(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    webhook(this: IWebhookFunctions): Promise<IWebhookResponseData>;
    trigger(this: ITriggerFunctions): Promise<ITriggerResponse>;
}
//# sourceMappingURL=FacebookPageTrigger.node.d.ts.map