import { Node } from './node'

export class IFNode extends Node {

    name = 'if'

    ret: boolean = false

    expression() {
        return true
    }

    positiveStatement() {}

    negativeStatement() {}

    async run() {
        const ret = !!this.expression()

        if (ret) {
            return this.positiveStatement()
        }

        return this.negativeStatement()

    }
}