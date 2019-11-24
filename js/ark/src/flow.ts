export class Flow {

    private _graph: any 

    constructor() {
        this._graph = this.createGraph()
    }

    createGraph(): any {
        return null
    }

    async main(inputs?: any | null) {
        let lastOutputs = null

        if (inputs === null) {
            lastOutputs = inputs
        }

        let graphNode = this._graph.nodes[0]
        let nextGraphNodeId
        while(graphNode !== null) {
            const node = new graphNode.cls()
            node.inputs = lastOutputs
            const outputs = await node.run()
            

            lastOutputs = outputs

            nextGraphNodeId = graphNode.next
            graphNode = this._graph.getNodeById(graphNode.next)
            
        }

        return lastOutputs
    }
}