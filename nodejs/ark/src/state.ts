import { Node } from './node'
import { writeFileSync } from 'fs'

export class State {

    private _userData: any = {}
    private _nodes: Map<number | string, any>
    private _steps: any[] = []

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

        this._steps.push(node)
    }

    get steps() {
        const steps: any = []

        for (const step of this._steps) {
            const stepData = {
                id: step.id,
                name: step.name,
                inputs: {},
                outputs: {},
                state: {},
            }

            steps.push(stepData)
        }
        return steps
    }
}