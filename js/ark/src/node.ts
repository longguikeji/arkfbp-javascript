
export class Node {

    name: string = ''

    private _outputs: any | null = null
    private _inputs: any | null = null
    private _state: any | null = null

    private _next: Node | null = null
    private _errorNext: Node | null = null

    constructor() {
        this._outputs = null
        this._state = null
    }

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

    commitState(cb: (state: any) => any) {
        this._state = cb(this._state)
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
}