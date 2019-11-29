import { Graph } from './graph'
import { GraphNode } from './graphNode'
import { IFNode } from './ifNode'
import { NodeIDType } from './node'
import { State } from './state'

export class Flow {

    private _graph: Graph
    private _state: any

    constructor() {
        this._graph = this.createGraph()
        this._state = new State()
    }

    createGraph(): Graph {
        return new Graph()
    }

    init() {
    }

    async main(inputs?: any | null) {
        let lastOutputs = null

        if (inputs !== null) {
            lastOutputs = inputs
        }

        let graphNode: GraphNode | null = this._graph.nodes[0]
        let nextGraphNodeId: NodeIDType | undefined
        while(graphNode !== null) {
            const node = new graphNode.cls!()

            if (node.hasOwnProperty('created')) {
                node.created()
            }

            if (node.hasOwnProperty('beforeInitialize')) {
                node.beforeInitialize()
            }

            node.init()

            if (node.hasOwnProperty('initialized')) {
                node.initialized()
            }

            if (typeof graphNode.id !== 'undefined') {
                node.id = graphNode.id.toString()
            }

            if (typeof node.id === 'undefined') {
                throw new Error(`node must has the id property settled`)
            }

            node.inputs = lastOutputs
            node.state = this._state

            if (node.hasOwnProperty('beforeExecute')) {
                node.beforeExecute()
            }

            const outputs = await node.run()

            if (node.hasOwnProperty('executed')) {
                node.executed()
            }

            node.outputs = outputs

            if (node.hasOwnProperty('beforeDestroy')) {
                node.beforeDestroy()
            }

            lastOutputs = outputs
            this._state.push(node)

            if (node instanceof IFNode) {
                // IF Node has two potential next and the ret stored current statement evaluated result
                if (node.ret) {
                    nextGraphNodeId = graphNode.positiveNext
                } else {
                    nextGraphNodeId = graphNode.negativeNext
                }
            } else {
                nextGraphNodeId = graphNode.next
            }

            if(nextGraphNodeId){
                graphNode = this._graph.getNodeById(nextGraphNodeId)
            } else {
                graphNode = null
            }

        }

        return lastOutputs
    }
}

export async function runWorkflow(flowFile: string, inputs?: any | null) {
    const ns = await import(flowFile)
    const flow = new ns.Main()

    if (flow.hasOwnProperty('beforeInitialize')) {
        flow.beforeInitialize()
    }
    flow.init()
    if (flow.hasOwnProperty('initialized')) {
        flow.initialized()
    }

    if (flow.hasOwnProperty('beforeExecute')) {
        flow.beforeExecute()
    }
    const ret = await flow.main(inputs)
    if (flow.hasOwnProperty('executed')) {
        flow.executed()
    }

    if (flow.hasOwnProperty('beforeDestroy')) {
        flow.beforeDestroy()
    }

    return ret
}