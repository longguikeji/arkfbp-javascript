import { Node } from './node'

interface SwitchCondition {
    condition: string | boolean
    next: string
    positive?: string
    negative?: string
}

export class SwitchNode extends Node {

    name = 'switch'

    route: SwitchCondition[] = []

    async run() {
        for (const condition of this.route) {
            const cond = condition.condition
            const next = condition.next

            let condFunction: Function | undefined
            let positiveFunction: Function | undefined
            let negativeFunction: Function | undefined
            let ret = false

            if (typeof cond !== 'boolean') {
                condFunction = this._getFunction(cond as string)
            }

            if (typeof condition.positive !== 'undefined') {
                positiveFunction = this._getFunction(condition.positive as string)
            }

            if (typeof condition.negative !== 'undefined') {
                negativeFunction = this._getFunction(condition.negative as string)
            }

            if (typeof cond === 'boolean') {
                ret = cond
            } else {
                if (typeof condFunction !== 'undefined') {
                    ret = condFunction()
                }
            }

            if (ret) {
                if (typeof positiveFunction !== 'undefined') {
                    this.next = condition.next
                    return (positiveFunction as Function)()
                }
            } else {
                if (typeof negativeFunction !== 'undefined') {
                    // do not return here
                    (negativeFunction as Function)()
                }
            }

        }
    }

    _getFunction(key: string): Function {
        return (this as any)[key]
    }
}