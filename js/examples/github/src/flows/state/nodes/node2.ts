import { FunctionNode } from '../../../../../../ark/src/functionNode'

import { debug } from 'debug'

const log = debug('mylib:randomid')

export class Node2 extends FunctionNode {
    
    async run() {
        console.info(this.state.now)
    }

}