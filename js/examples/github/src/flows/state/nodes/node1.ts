import { FunctionNode } from '../../../../../../ark/src/functionNode'

import { debug } from 'debug'

const log = debug('mylib:randomid')

export class Node1 extends FunctionNode {

    async run() {
        this.commitState((state) => {
            this.state.now = new Date()
            return this.state
        })
    }

}