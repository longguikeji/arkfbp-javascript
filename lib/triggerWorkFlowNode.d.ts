import { Node } from './node';
export declare class TriggerWorkflowNode extends Node {
    name: string;
    flow?: any;
    buildOptions?: any;
    run(): Promise<any>;
}
