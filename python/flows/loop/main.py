from ark import (
    Flow,
    Graph,
)

from flows.loop.nodes.node1 import Node1


class Main(Flow):

    def create_graph(self):
        g = Graph()
        g.nodes = [
            {
                'cls': Node1,
                'id': 1,
            }
        ]

        return g