import { Node } from './node';
export declare class LoopNode extends Node {
    name: string;
    body?: any;
    initStatement(): Promise<void>;
    conditionStatement(): Promise<boolean>;
    postStatement(): Promise<void>;
    process(): Promise<void>;
    executeBody(options?: any): Promise<any>;
    run(): Promise<void>;
}
