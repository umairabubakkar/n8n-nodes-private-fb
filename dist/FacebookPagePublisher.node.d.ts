import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
export declare class FacebookPagePublisher implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getPages(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getPostIds(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getRecipientIds(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
//# sourceMappingURL=FacebookPagePublisher.node.d.ts.map