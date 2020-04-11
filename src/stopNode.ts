import { Node } from './node'

export class StopNode extends Node {

    name = 'stop'

    async run(): Promise<any> {
        return Promise.resolve(this.inputs)
    }

}