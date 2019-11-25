import { FunctionNode } from './../../../../../../ark/src/functionNode'

import { debug } from 'debug'

const log = debug('mylib:randomid')

export class Node3 extends FunctionNode {

    async run(): Promise<any> {
        const users = []
        for (const record of this.inputs) {
            users.push(record.login)
        }

        return users
    }

}