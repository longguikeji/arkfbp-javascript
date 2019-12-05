import { Graph } from './graph'
import { GraphNode } from './graphNode'
import { IFNode } from './ifNode'
import { NodeIDType, NodeType } from './node'
import { State } from './state'
import { LoopNode } from './loopNode'
import { Request } from './request'
import { Response } from './response'
import { AppState } from './appState'

import express from 'express'


export class FlowOptions {

    /**
     * request object from expressjs
     */
    request?: any;

    appState?: AppState;
}

export class Flow {

    private _graph: Graph

    private _state: any
    private _appState: any

    private _request: Request | null = null
    private _response: Response | null = null

    get request(): Request | null {
        return this._request
    }

    set request(v: Request | null) {
        this._request = v
    }

    get response(): Response | null {
        return this._response
    }

    set response(v: Response | null) {
        this._response = v
    }

    constructor(options: FlowOptions = {}) {
        this._graph = this.createGraph()
        this._state = new State()

        this._request = new Request()

        if (options.request) {
            this._request.parse(options.request)
        }

        if (options.appState) {
            this._appState = options.appState
        }

        this._response = new Response()
    }

    createGraph(): Graph {
        return new Graph()
    }

    init() {}

    async main(inputs?: any | null) {
        let lastOutputs = null

        if (inputs !== null) {
            lastOutputs = inputs
        }

        let graphNode: GraphNode | null = this._graph.nodes[0]
        let nextGraphNodeId: NodeIDType | undefined
        while (graphNode !== null) {
            const node = new graphNode.cls!()

            node.$request = this.request
            node.$response = this.response

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
            node.$state = this._state
            node.$appState = this._appState

            if (node.hasOwnProperty('beforeExecute')) {
                node.beforeExecute()
            }

            if (node instanceof LoopNode) {
                // @Todo: how to execute of the loop body?
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

            if (nextGraphNodeId) {
                graphNode = this._graph.getNodeById(nextGraphNodeId)
            } else {
                graphNode = null
            }

        }

        return lastOutputs
    }

    beforeInitialize() { }
    initialized() { }
    beforeExecute() { }
    executed() { }
    beforeDestroy() { }
}

export async function importWorkflowByFile(filename: string) {
    const ns = await import(filename)
    return ns
}

export async function runWorkflowByFile(filename: string, inputs?: any, options?: FlowOptions) {
    const ns = await import(filename)
    const flow = new ns.Main(options)
    return runWorkflow(flow, inputs)
}

export async function runWorkflow(flow: Flow, inputs?: any) {
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