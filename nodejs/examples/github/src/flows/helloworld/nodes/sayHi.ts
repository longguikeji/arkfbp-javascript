import { FunctionNode } from './../../../../../../ark/src/functionNode'

import { debug } from 'debug'

const log = debug('mylib:randomid')

export class SayHi extends FunctionNode {

    async run() {
        log('node1')
    }

}