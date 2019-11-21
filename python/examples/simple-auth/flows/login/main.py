from ark import (
    Flow,
    Graph,
)

from flows.login.nodes.node1 import Node1
from flows.login.nodes.node2 import Node2


class Main(Flow):

    def create_graph(self):
        g = Graph()
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