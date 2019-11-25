
import { Flow } from './../../../../../ark/src/flow'
import { Graph } from './../../../../../ark/src/graph'

import { Node1 } from './nodes/node1'
import { Node2 } from './nodes/node2'

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
            },
        ]

        return g
    }

}