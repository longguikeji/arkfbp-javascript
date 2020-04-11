import { NodeIDType, NodeType } from './node';
export declare class GraphNode {
    id?: NodeIDType;
    cls?: NodeType;
    next?: string | number;
    positiveNext?: NodeIDType;
    negativeNext?: NodeIDType;
    body?: NodeIDType;
    constructor(id?: string, cls?: NodeType, next?: string, positiveNext?: string, negativeNext?: string);
}
