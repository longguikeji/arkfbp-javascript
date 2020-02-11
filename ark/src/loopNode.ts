import { Node } from './node'

export class LoopNode extends Node {

    name = 'loop'

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

    async run() {
        await this.initStatement()

        while (await this.conditionStatement()) {
            await this.process()
            await this.postStatement()
        }
        /**
         * for (let i = 0; i < 10; ++i )}
         *      process(i)
         * }
         */

    }

}