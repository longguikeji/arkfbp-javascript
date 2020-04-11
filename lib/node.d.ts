import { Request } from './request';
import { Response } from './response';
export declare class Node {
    get outputs(): any;
    set outputs(v: any);
    get inputs(): any;
    set inputs(v: any);
    get state(): any;
    set state(v: any);
    get $state(): any;
    set $state(v: any);
    get $appState(): any;
    set $appState(v: any);
    get $options(): any;
    set $options(v: any);
    get next(): any;
    set next(v: any);
    get errorNext(): any;
    set errorNext(v: any);
    id: NodeIDType;
    name: string;
    $request?: Request;
    $response?: Response;
    private _outputs;
    private _inputs;
    private _options;
    /**
     * Flow level state sharing
     */
    private _state;
    /**
     * App level state sharing
     */
    private _appState;
    private _next;
    private _errorNext;
    constructor();
    init(): void;
    run(): Promise<any>;
    created(): Promise<void>;
    beforeInitialize(): Promise<void>;
    initialized(): Promise<void>;
    beforeExecute(): Promise<void>;
    executed(): Promise<void>;
    beforeDestroy(): Promise<void>;
}
export declare type NodeIDType = string | number;
export declare type NodeType = typeof Node;
