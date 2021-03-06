import { Node } from './node'

export class StartNode extends Node {

    name = 'start'

    async run(): Promise<any> {
        return Promise.resolve(this.inputs)
    }

}