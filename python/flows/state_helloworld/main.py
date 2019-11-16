from ark import (
    Flow,
    Graph,
)


from .nodes.increment_counter import IncrementCounter


class Main(Flow):

    def create_graph(self):
        g = Graph
        g.nodes = [IncrementCounter, IncrementCounter, IncrementCounter]
        g.edges = ['']

        return g

    def create_state(self):
        state = {
            'count': 0
        }

        return state

