import { writeFileSync } from 'fs'
import { AppState } from './appState'
import { FlowOptions } from './flowOptions'
import { Graph } from './graph'
import { GraphNode } from './graphNode'
import { IFNode } from './ifNode'
import { LoopNode } from './loopNode'
import { NodeIDType, NodeType } from './node'
import { Request } from './request'
import { Response } from './response'
import { State } from './state'
import { TestNode } from './testNode'

export class Flow {

    private _graph: Graph

    private _state: State | null = null
    private _appState: AppState | null = null

    private _request: Request | null = null
    private _response: Response | null = null

    private _debug: boolean = false
    private _debugStatePersistentFile: string = ''

    private _inputs: any = null
    private _outputs: any = null
    private _status: string = 'CREATED'

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

        if (options.response) {
            this._response = options.response
        } else {
            this._response = new Response()
        }

        if (options.appState) {
            this._appState = options.appState
        }

        if (options.debug) {
            this._debug = options.debug
        }

        if (options.debugStatePersistentFile) {
            this._debugStatePersistentFile = options.debugStatePersistentFile
        }

    }

    createGraph(): Graph {
        return new Graph()
    }

    // tslint:disable-next-line: no-empty
    init() {}

    async executeTestNode(node: TestNode) {
        const cls = node.constructor as typeof TestNode
        let testcases = []
        testcases = Object.getOwnPropertyNames(Object.getPrototypeOf(node))
        testcases = testcases.sort().filter((e, i, arr) => {
            if (e !== arr[i + 1] && typeof (node as any)[e] === 'function' && e.startsWith('test')) return true
        })
        const n = testcases.length
        // tslint:disable-next-line: no-console
        console.info(`${n} testcases`)

        const flow = node.flow as typeof Flow
        const startNodeId = node.start
        const stopNodeId = node.stop

        for (let i = 0; i < n; ++i) {
            const testcase = testcases[i]
            const testFn = (node as any)[testcase]
            const isAsync = testFn.constructor.name === 'AsyncFunction'
            if (isAsync) {
                // tslint:disable-next-line: no-console
                console.info(`[skip] ${testcase}`)
                // testFn()
                //     .then(() => {
                //         console.info(`[ok] ${testcase}`)
                //     })
                //     .catch((error) => {
                //         console.info(`[fail] ${testcase}`)
                //     })
                continue
            }
            const instance = new cls()
            // setUp
            instance.setUp()

            // run workflow
            const inputs = {}
            const outputs = await runWorkflowByClass(flow, inputs)

            instance.outputs = outputs

            // run testcase function
            try {
                testFn()
                // tslint:disable-next-line: no-console
                console.info(`[ok] ${testcase}`)
            } catch (error) {
                // tslint:disable-next-line: no-console
                console.info(`[fail] ${testcase}`)
            }

            // tearDown
            instance.tearDown()
        }
    }

    async main(inputs?: any | null) {
        let lastOutputs = null

        if (inputs !== null) {
            lastOutputs = inputs
            this._inputs = inputs
        }

        this._status = 'RUNNING'
        this.dumpLogFile()

        let graphNode: GraphNode | null = this._graph.nodes[0]
        let nextGraphNodeId: NodeIDType | undefined
        while (graphNode !== null) {
            const node = new graphNode.cls!()

            if (this.request) {
                node.$request = this.request
            }
            if (this.response) {
                node.$response = this.response
            }

            if (node.hasOwnProperty('created')) {
                await node.created()
            }

            if (node.hasOwnProperty('beforeInitialize')) {
                await node.beforeInitialize()
            }

            node.init()

            if (node.hasOwnProperty('initialized')) {
                await node.initialized()
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
                await node.beforeExecute()
            }

            if (node instanceof LoopNode) {
                // @Todo: how to execute of the loop body?
            }

            let outputs
            if (node instanceof TestNode) {
                outputs = await this.executeTestNode(node)
            } else {
                outputs = await node.run()
            }

            if (node.hasOwnProperty('executed')) {
                await node.executed()
            }

            node.outputs = outputs

            if (node.hasOwnProperty('beforeDestroy')) {
                await node.beforeDestroy()
            }

            lastOutputs = outputs
            if (this._state) {
                this._state.push(node)
            }
            this.dumpLogFile()

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

        this._outputs = lastOutputs
        this.dumpLogFile()
        this._status = 'STOPPED'
        return lastOutputs
    }

    dumpLogFile() {
        if (!this._debug) return
        // tslint:disable-next-line: no-any
        const data: any = {}
        data.status = this._status
        data.inputs = this._inputs
        data.steps = this._state?.steps
        data.outputs = this._outputs
        writeFileSync(this._debugStatePersistentFile, JSON.stringify(data))
    }

    // tslint:disable-next-line: no-empty
    beforeInitialize() { }
    // tslint:disable-next-line: no-empty
    initialized() { }
    // tslint:disable-next-line: no-empty
    beforeExecute() { }
    // tslint:disable-next-line: no-empty
    executed() { }
    // tslint:disable-next-line: no-empty
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

export async function runWorkflowByClass(cls: typeof Flow, inputs?: any) {
    const flow = new cls()
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