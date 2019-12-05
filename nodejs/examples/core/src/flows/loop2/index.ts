import { Flow } from './../../../../../ark/src/flow'
import { Graph } from './../../../../../ark/src/graph'
import { StopNode } from './../../../../../ark/src/stopNode'

import { MyLoopNode } from './nodes/node1'
import { LoopBody, LoopBody2 } from './nodes/node2'

export class Main extends Flow {

    createGraph() {
        const g = new Graph()
        g.nodes = [
            {
                'cls': MyLoopNode,
                'id': 1,
                'next': 4,
                'body': [
                    {
                        'cls': LoopBody,
                        'id': 2,
                        'next': LoopBody2,
                    },
                    {
                        'cls': LoopBody2,
                        'id': 3,
                    },
                ]
            },
            {
                'cls': StopNode,
                'id': 4,
            }
        ]

        return g
    }

}