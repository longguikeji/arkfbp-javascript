import { Node } from './node'

export class IFNode extends Node {

    name = 'if'

    ret: boolean = false

    expression() {
        return true
    }

    // tslint:disable-next-line: no-empty
    positiveStatement() { }

    // tslint:disable-next-line: no-empty
    negativeStatement() { }

    async run() {
        const ret = !!this.expression()
        this.ret = ret

        if (ret) {
            return this.positiveStatement()
        }

        return this.negativeStatement()
    }
}