import { GraphNode } from './graphNode'
import { NodeIDType } from './node'

export class Graph {

    nodes: GraphNode[] = []

    getNodeById(id: NodeIDType): GraphNode | null {
        for (const node of this.nodes) {
            if (node.id === id) {
                return node
            }
        }

        return null
    }

}