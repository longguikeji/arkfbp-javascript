import { GraphNode } from './graphNode';
import { NodeIDType } from './node';
export declare class Graph {
    nodes: GraphNode[];
    getNodeById(id: NodeIDType): GraphNode | null;
}
