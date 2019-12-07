import { APINode } from './../../../../../../ark/src/apiNode'

import { debug } from 'debug'

const log = debug('mylib:randomid')

export class InvokeGithub extends APINode {

    url = 'https://api.github.com/repos/longguikeji/arkid-core/stargazers'

    async run() {
        const data = this.$state.fetch()
        if (data.link) {
            this.url = data.link
        }

        await super.run()

        this.$state.commit((state: any) => {
            if (typeof state.datumx === 'undefined') {
                state.datumx = []
            }
            state.datumx.push(this.resp!.data)
            return state
        })

        return this.resp
    }
}