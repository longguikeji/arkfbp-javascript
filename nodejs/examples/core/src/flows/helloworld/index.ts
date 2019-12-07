
import { Flow } from './../../../../../ark/src/flow'
import { Graph } from './../../../../../ark/src/graph'

import { CheckGithubData } from './nodes/checkGithubData'
import { SendDingDingMessage } from './nodes/dingding'
import { InvokeGithub } from './nodes/invokeGithub'
import { ProcessGithubData } from './nodes/processGithubData'
import { SayHi } from './nodes/sayHi'

export class Main extends Flow {

    createGraph() {
        const g = new Graph()
        g.nodes = [
            {
                cls: SayHi,
                id: 1,
                next: 2,
            },
            {
                cls: InvokeGithub,
                id: 2,
                next: 3,
            },
            {
                cls: CheckGithubData,
                id: 3,
                positiveNext: 2,
                negativeNext: 4,
            },
            {
                cls: ProcessGithubData,
                id: 4,
                next: 5,
            },
            {
                cls: SendDingDingMessage,
                id: 5,
            },
        ]

        return g
    }

}