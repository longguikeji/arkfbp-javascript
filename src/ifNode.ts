import { Node } from './node'

export class IFNode extends Node {

    name = 'if'

    ret: boolean = false

    condition() {
        return true
    }

    positive() { }

    negative() { }

    async run() {
        const ret = !!this.condition()
        this.ret = ret

        if (ret) {
            return this.positive()
        }

        return this.negative()
    }
}