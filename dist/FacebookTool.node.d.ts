import type { ILoadOptionsFunctions, ISupplyDataFunctions, INodeType, INodeTypeDescription, INodePropertyOptions, SupplyData } from 'n8n-workflow';
export declare class FacebookTool implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getPages(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    supplyData(this: ISupplyDataFunctions, itemIndex: number): Promise<SupplyData>;
}
//# sourceMappingURL=FacebookTool.node.d.ts.map