import { Node } from './node'

export class State {

    private _userData: any = {}
    private _nodes: Map<number | string, any>

    constructor() {
        this._nodes = new Map()
    }

    commit(cb: (state: any) => any) {
        this._userData = cb(this._userData)
    }

    fetch() {
        return this._userData
    }

    getOutputs(id: string) {
        console.info('getOutputs')
        if (this._nodes.has(id)) {
            const node = this._nodes.get(id)[0]
            return node.outputs
        }
        console.info('xxx')
    }

    getInputs(id: string) {
        if (this._nodes.has(id)) {
            const node = this._nodes.get(id)[0]
            return node.inputs
        }
    }

    push(node: Node) {
        // @Todo: support multiple executions
        this._nodes.set(node.id, [node])
    }

}