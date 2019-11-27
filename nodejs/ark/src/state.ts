import { Node } from './node'

export class State {

    private _userData: any = {}
    private _nodes: Map<number | string, any>

    constructor() {
        this._nodes = new Map()
    }

    async commit(cb: (state: any) => any) {
        // @Todo: refactor this
        await cb(this._userData)
    }

    fetch() {
        return this._userData
    }

    getOutputs(id: string) {
        if (this._nodes.has(id)) {
            const nodes = this._nodes.get(id)
            const node = nodes[nodes.length-1]
            return node.outputs
        }
    }

    getInputs(id: string) {
        if (this._nodes.has(id)) {
            const nodes = this._nodes.get(id)
            const node = nodes[nodes.length-1]
            return node.inputs
        }
    }

    push(node: Node) {
        if (!this._nodes.has(node.id)) {
            this._nodes.set(node.id, [node])
        } else {
            this._nodes.get(node.id).push(node)
        }
    }

}