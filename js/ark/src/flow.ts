export class Flow {

    private _graph: any 
    private _state: any

    constructor() {
        this._graph = this.createGraph()
        this._state = {}
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
            node.state = this._state
            const outputs = await node.run()

            lastOutputs = outputs

            if (node.name === 'if') {
                // IF Node has two potential next and the ret stored current statement evaluated result
                if (node.ret) {
                    nextGraphNodeId = graphNode.positiveNext
                } else {
                    nextGraphNodeId = graphNode.negativeNext
                }
            } else {
                nextGraphNodeId = graphNode.next
            }

            graphNode = this._graph.getNodeById(graphNode.next)
        }

        return lastOutputs
    }
}

export async function runWorkflow(flowFile: string) {
    const ns = await import(flowFile)
    const flow = new ns.Main()
    const ret = await flow.main()
    return ret
}