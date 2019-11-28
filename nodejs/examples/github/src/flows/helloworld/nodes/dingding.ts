import { APINode } from './../../../../../../ark/src/apiNode'

import { debug } from 'debug'

const log = debug('mylib:randomid')

export class SendDingDingMessage extends APINode {

    url = 'https://oapi.dingtalk.com/robot/send?access_token=bb80b4f172e0c4531408f6f34172e68257d95c15a9d7d4608bb72327abdc87d4'

    method = 'POST'
    headers = {
        'Content-Type': 'application/json',
        'Charset': 'utf-8',
    }

    async run() {
        const users = this.inputs
        this.params = {
            'msgtype': 'text',
            'text': {
                'content': 'arkid共有' + users.length + 'star',
            },
        }
        log(this.params)

        return super.run()
    }

}