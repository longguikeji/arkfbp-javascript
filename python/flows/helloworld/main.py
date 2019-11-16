from ark import (
    Flow,
    Graph,
)

from flows.helloworld.nodes.node1 import Node1
from flows.helloworld.nodes.node2 import Node2


class Main(Flow):

    def create_graph(self):
        g = Graph()
        g.nodes = [Node1, Node2]
        g.edges = ['']

        return g