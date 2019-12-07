import { FunctionNode } from './../../../../../../ark/src/functionNode'

import { debug } from 'debug'

const log = debug('mylib:randomid')

export class ProcessGithubData extends FunctionNode {

    async run() {
        const state = this.$state.fetch()
        const users = []
        for (const data of state.datumx) {
            for (const record of data) {
                users.push(record.login)
            }
        }

        return users
    }

}