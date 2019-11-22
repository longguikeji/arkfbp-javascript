class GraphNode:

    def __init__(self, node):
        pass


class Graph:

    def __init__(self):
        self.nodes = []

    def get_node_by_id(self, id):
        for node in self.nodes:
            if node['id'] == id:
                return node

        raise Exception('node id not found {}'.format(id))

