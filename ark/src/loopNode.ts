import { Node } from './node'

export class LoopNode extends Node {

    name = 'loop'

    body?: any

    async initStatement() {
        return
    }

    async conditionStatement() {
        return false
    }

    async postStatement() {
        return
    }

    async process() {
        return
    }

    async executeBody(options?: any) {
        if (this.body) {
            const node = new this.body()
            node.inputs = options
            return node.run()
        }

        return
    }

    async run() {
        await this.initStatement()

        while (await this.conditionStatement()) {
            const options = this.process()
            await this.executeBody(options)
            await this.postStatement()
        }
    }

}