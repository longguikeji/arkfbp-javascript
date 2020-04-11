import { runWorkflowByClass } from './flow'
import { Node } from './node'

export class TriggerFlowNode extends Node {

    name = 'triggerFlow'

    flow?: any

    buildOptions?: any

    async run() {
        if (typeof this.flow === 'undefined') {
            throw new Error('flow not set')
        }

        const flowOptions = this.buildOptions ? this.buildOptions() : undefined
        const outputs = await runWorkflowByClass(this.flow, this.inputs, flowOptions)
        return outputs
    }

}