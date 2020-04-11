import { Node } from './node';
export declare class State {
    private _userData;
    private _nodes;
    private _steps;
    constructor();
    commit(cb: (state: any) => any): Promise<void>;
    fetch(): any;
    getOutputs(id: string): any;
    getInputs(id: string): any;
    push(node: Node): void;
    get steps(): any;
}
