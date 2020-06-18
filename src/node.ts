import { Request } from './request'
import { Response } from './response'
export class Node {

    get outputs() {
        return this._outputs
    }

    set outputs(v: any) {
        this._outputs = v
    }

    get $outputs() {
        return this._outputs
    }

    set $outputs(v: any) {
        this._outputs = v
    }

    get inputs() {
        return this._inputs
    }

    set inputs(v: any) {
        this._inputs = v
    }

    get $inputs() {
        return this._inputs
    }

    set $inputs(v: any) {
        this._inputs = v
    }

    get state() {
        return this._state
    }

    set state(v: any) {
        this._state = v
    }

    get $state() {
        return this._state
    }

    set $state(v: any) {
        this._state = v
    }

    get $appState() {
        return this._appState
    }

    set $appState(v: any) {
        this._appState = v
    }

    get $options() {
        return this._options
    }

    set $options(v: any) {
        this._options = v
    }

    get next() {
        return this._next
    }

    set next(v: any) {
        this._next = v
    }

    get errorNext() {
        return this._errorNext
    }

    set errorNext(v: any) {
        this._errorNext = v
    }

    id: NodeIDType = ''
    name: string = ''

    $request?: Request
    $response?: Response

    private _outputs: any | null = null
    private _inputs: any | null = null

    private _options: any // the options to start the flow

    /**
     * Flow level state sharing
     */
    private _state: any | null = null

    /**
     * App level state sharing
     */
    private _appState: any | null = null

    private _next: Node | null = null
    private _errorNext: Node | null = null

    constructor() {
        this._outputs = null
        this._state = null
    }

    init(): void { }

    async run(): Promise<any> { }

    async created(): Promise<void> { }

    async beforeInitialize(): Promise<void> { }
    async initialized(): Promise<void> { }
    async beforeExecute(): Promise<void> { }
    async executed(): Promise<void> { }
    async beforeDestroy(): Promise<void> { }
}

export type NodeIDType = string
export type NodeType = typeof Node