from ark import (
    Flow,
    Graph,
)

from flows.login.nodes.node1 import Node1
from flows.login.nodes.node2 import Node2
from flows.login.nodes.node3 import Node3
from flows.login.nodes.node4 import Node4


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
                'positive_next': 3,
                'negative_next': 4,
            },
            {
                'cls': Node3,
                'id': 3,
            },
            {
                'cls': Node4,
                'id': 4,
            },
        ]

        return g