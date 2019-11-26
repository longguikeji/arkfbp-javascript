import { State } from './state'

export class Flow {

    private _graph: any
    private _state: any

    constructor() {
        this._graph = this.createGraph()
        this._state = new State()
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
            node.id = graphNode.id.toString()
            node.inputs = lastOutputs
            node.state = this._state
            const outputs = await node.run()
            node.outputs = outputs

            lastOutputs = outputs
            this._state.push(node)

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

export async function runWorkflow(flow: Flow) {
    // const ns = await import(flowFile)
    // const flow = new ns.Main()
    // const ret = await flow.main()
    // return ret
    const instance = new flow()
    const ret = await instance.main()
    return ret
}