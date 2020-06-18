import { Node } from './node'

interface SwitchCondition {
    expression: string | boolean
    next: string
    positive?: string
    negative?: string
}

export class SwitchNode extends Node {

    name = 'switch'

    route: SwitchCondition[] = []

    async run() {
        for (const condition of this.route) {
            const expression = condition.expression
            const next = condition.next

            let expressionFunction: Function | undefined
            let positiveFunction: Function | undefined
            let negativeFunction: Function | undefined

            if (typeof expression !== 'boolean') {
                expressionFunction = this._getFunction(expression as string)
            }

            if (typeof condition.positive !== 'undefined') {
                positiveFunction = this._getFunction(condition.positive as string)
            }

            if (typeof condition.negative !== 'undefined') {
                negativeFunction = this._getFunction(condition.negative as string)
            }

            let ret = false

            if (typeof expression === 'boolean') {
                ret = expression
            } else {
                if (typeof expressionFunction !== 'undefined') {
                    ret = expressionFunction()
                }
            }

            if (ret) {
                if (typeof positiveFunction !== 'undefined') {
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