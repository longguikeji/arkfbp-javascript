export class Node {

    id: NodeIDType = ''
    name: string = ''

    private _outputs: any | null = null
    private _inputs: any | null = null
    private _state: any | null = null

    private _next: Node | null = null
    private _errorNext: Node | null = null

    $request: any | null = null
    $response: any | null = null

    constructor() {
        this._outputs = null
        this._state = null
    }

    init(): void {}

    get outputs() {
        return this._outputs
    }

    set outputs(v: any) {
        this._outputs = v
    }

    get inputs() {
        return this._inputs
    }

    set inputs(v: any) {
        this._inputs = v
    }

    get state() {
        return this._state
    }

    set state(v: any) {
        this._state = v
    }

    async run(): Promise<any> {}

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

    created(): void {}
    beforeInitialize(): void {}
    initialized(): void {}
    beforeExecute(): void {}
    executed(): void {}
    beforeDestroy(): void {}
}

export type NodeIDType = string | number
export type NodeType = typeof Node