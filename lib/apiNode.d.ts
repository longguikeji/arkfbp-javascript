import { Node } from './node';
export declare class APINode extends Node {
    name: string;
    mode: string;
    url: string;
    method: string;
    auth: null;
    headers: any | null;
    params: any | null;
    buildParams?: () => {};
    /**
     * API Node执行结果，方便重载的时候获取更多除了data的额外信息
     */
    resp: {
        status: number;
        statusText: string;
        headers?: any;
        data?: any;
    } | null;
    run(): Promise<any>;
    _getParams(): any;
    _requestDirect(): Promise<any>;
    _requestProxy(): Promise<null>;
}
