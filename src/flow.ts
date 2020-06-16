import chalk from 'chalk'
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
import { isAsync } from './utils'

export class Flow {

    private _userOptions: any

    private _options: FlowOptions
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

    private _verbose: boolean = false
    private _step: number = 0

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

        this._options = options

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

        if (options.verbose) {
            this._verbose = options.verbose
        }

    }

    createGraph(): Graph {
        return new Graph()
    }

    // tslint:disable-next-line: no-empty
    init() { }

    getNextGraphNode(graphNode: GraphNode, node: any): GraphNode | null {
        let nextGraphNodeId
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
            return this._graph.getNodeById(nextGraphNodeId)
        }

        return null
    }

    async main(inputs?: any | null) {
        let lastOutputs = null

        if (inputs !== null) {
            lastOutputs = inputs
            this._inputs = inputs
        }

        this._status = 'RUNNING'
        this.dumpLogFile()

        this._userOptions = inputs ? inputs : {}

        let graphNode: GraphNode | null = this._graph.nodes[0]
        let canExecute: boolean = false
        let shouldStop: boolean = false
        while (graphNode !== null) {
            this._step += 1
            if (this._options.startId && !canExecute) {
                if (graphNode.id === this._options.startId) {
                    canExecute = true
                }
            } else {
                canExecute = true
            }

            const node = new graphNode.cls!()

            if (!canExecute) {
                graphNode = this.getNextGraphNode(graphNode, node)
                continue
            }

            if (this.request) {
                node.$request = this.request
            }
            if (this.response) {
                node.$response = this.response
            }

            node.$options = this._userOptions

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
                if (graphNode.body) {
                    // if we defined the body in the graph then use it, otherwise we set empty
                    const loopBodyCls = this._graph.getNodeById(graphNode.body)!.cls
                    if (typeof loopBodyCls !== 'undefined') {
                        node.body = this._graph.getNodeById(graphNode.body)!.cls
                    }
                }
            }

            let outputs

            try {
                outputs = await node.run()
            } catch (err) {
                console.log(chalk.red.underline(`\n>>> #STEP-${this._step} NODE[#${node.id}]ERROR`))
                console.log('\t', chalk.bgGray(`Inputs: ${JSON.stringify(lastOutputs)}`))
                console.log('\t', chalk.bgMagenta(`App State: ${JSON.stringify(this._appState?.fetch())}`))
                console.log('\t', chalk.bgBlue(`Flow State: ${JSON.stringify(this._state?.fetch())}`))
                console.log('\t', chalk.bgCyan(`Outputs: ${JSON.stringify(node.outputs)}`))

                const regEx = new RegExp(`${process.cwd()}\\/(?!node_modules\\/)([\\/\\w-_\\.]+\\.js):(\\d*):(\\d*)`)
                const [, filename, line, column] = err.stack.match(regEx)

                console.log('\t', chalk.bgRed(`Error: ${err.name} ${err.message} ${filename}:${line}:${column}`))

                this._status = 'ERROR'

                // @Todo: 节点增加error属性，用于指定发生异常错误的处理节点
                break
            }

            /**
             * if there's no error property set in this node, we will stop the flow
             * otherwise we will redirect to the error setted node
             */

            if (this._status === 'RUNNING') {
                if (this._verbose) {
                    console.log(chalk.green.underline(`\n>>> #STEP - ${this._step} NODE[#${node.id}:${node.name}]SUCCESS`))
                    console.log('\t', chalk.bgGray(`Inputs: ${JSON.stringify(node.inputs)}`))
                    console.log('\t', chalk.bgMagenta(`App State: ${JSON.stringify(this._appState?.fetch())}`))
                    console.log('\t', chalk.bgBlue(`Flow State: ${JSON.stringify(this._state?.fetch())}`))
                    console.log('\t', chalk.bgCyan(`Outputs: ${JSON.stringify(node.outputs)}`))
                }
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

            if (this._options.stopId && this._options.stopId === graphNode.id) {
                shouldStop = true
            }

            graphNode = this.getNextGraphNode(graphNode, node)

            if (graphNode === null) {
                shouldStop = true
            }

            if (shouldStop) {
                break
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

export async function runWorkflowByClass(cls: typeof Flow, inputs?: any, options?: FlowOptions) {
    const flow = new cls(options)
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