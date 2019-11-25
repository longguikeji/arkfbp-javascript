
import { Flow } from './../../../../../ark/src/flow'
import { Graph } from './../../../../../ark/src/graph'

import { Node1 } from './nodes/node1'
import { Node2 } from './nodes/node2'
import { Node3 } from './nodes/node3'
import { Node4 } from './nodes/node4'

export class Main extends Flow {

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