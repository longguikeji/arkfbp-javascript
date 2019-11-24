
import { APINode } from './apiNode'
import { debug } from 'debug'
import { Flow } from './flow'
import { FunctionNode } from './functionNode'
import { Graph } from './graph'

const log = debug('mylib:randomid')

// https://oapi.dingtalk.com/robot/send?access_token=bb80b4f172e0c4531408f6f34172e68257d95c15a9d7d4608bb72327abdc87d4

class Node1 extends FunctionNode {

    async run() {
        log('node1')
    }
}

class Node2 extends APINode {

    url = 'https://api.github.com/repos/longguikeji/arkid-core/stargazers'

}

class Node3 extends FunctionNode {

    async run(): Promise<any> {
        let users = []
        for (const record of this.inputs) {
            users.push(record.login)
        }

        return users
    }

}

class Node4 extends APINode {

    // url = 'https://api.github.com/users/longguikeji'
    url = 'https://oapi.dingtalk.com/robot/send?access_token=bb80b4f172e0c4531408f6f34172e68257d95c15a9d7d4608bb72327abdc87d4'

    method = 'POST'
    headers = {
        'Content-Type': 'application/json',
        'Charset': 'utf-8'
    }


    async run() {
        const users = this.inputs
        this.params = {
            "msgtype": "text",
            "text": {
                "content": 'arkid共有' + users.length + 'star'
            },
        }
        log(this.params)
        return super.run()
    }

}


class Helloworld extends Flow {

    createGraph() {
        const g = new Graph()
        g.nodes = [
            {
                'cls': Node1,
                'id': 1,
                'next': 2,
            },
            {
                'cls': Node2,
                'id': 2,
                'next': 3,
            },
            {
                'cls': Node3,
                'id': 3,
                'next': 4,
            },
            {
                'cls': Node4,
                'id': 4,
            },
        ]

        return g
    }

}


async function x() {
    const hello = new Helloworld()
    const ret = await hello.main()

    log(ret)
}

x()