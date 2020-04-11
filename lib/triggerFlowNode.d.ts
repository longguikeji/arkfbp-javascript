import { Node } from './node';
export declare class TriggerFlowNode extends Node {
    name: string;
    flow?: any;
    buildOptions?: any;
    run(options2?: any): Promise<any>;
}
