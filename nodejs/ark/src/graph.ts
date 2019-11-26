export class Graph {

    nodes: any[] = []

    getNodeById(id: string): any | null {
        for (const node of this.nodes) {
            if (node.id === id) {
                return node
            }
        }

        return null
    }

}