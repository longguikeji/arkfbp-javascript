
import { Flow } from '@/ark/flow'
import { Graph } from '@/ark/graph'

import { InvokeGithub } from './nodes/invokeGithub'
import { SayHi } from './nodes/sayHi'
import { ProcessGithubData } from './nodes/processGithubData'


export class Main extends Flow {

    createGraph() {
        const g = new Graph()
        g.nodes = [
            {
                'cls': SayHi,
                'id': 1,
                'next': 2,
            },
            {
                'cls': InvokeGithub,
                'id': 2,
                'next': 3,
            },
            {
                'cls': ProcessGithubData,
                'id': 3,
                'next': 4,
            },
        ]

        return g
    }

}