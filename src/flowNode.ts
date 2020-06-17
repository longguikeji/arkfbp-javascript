import { runWorkflowByClass } from './flow'
import { Node } from './node'

export class FlowNode extends Node {

    name = 'Flow'

    flow?: any

    buildOptions?: any

    buildInputs() {
        return this.inputs
    }

    async run() {
        if (typeof this.flow === 'undefined') {
            throw new Error('flow not set')
        }

        const flowOptions = this.buildOptions ? this.buildOptions() : undefined
        const outputs = await runWorkflowByClass(this.flow, this.buildInputs(), flowOptions)
        return outputs
    }

}