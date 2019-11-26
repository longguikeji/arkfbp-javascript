import sys
import os


if __name__ == '__main__':
    name = sys.argv[1]

    flow_dir = os.path.join('flows', name)
    print(flow_dir)

    if os.path.exists(flow_dir):
        raise Exception('directory exists, ignored')

    # create flow main folder
    if not os.path.exists(flow_dir):
        os.makedirs(flow_dir)

    with open(os.path.join(flow_dir, '__init__.py'), 'w'): pass

    # create entry file

    with open(os.path.join(flow_dir, 'main.py'), 'w') as fp:
        tpl = '''from ark import (
    Flow,
    Graph,
)


from .nodes.node1 import Node1


class Main(Flow):

    def create_graph(self):
        g = Graph()
        g.nodes = [Node1]
        g.edges = ['']

        return g
        '''

        fp.write(tpl)


    # create nodes folder
    nodes_dir = os.path.join(flow_dir, 'nodes')
    if not os.path.exists(nodes_dir):
        os.makedirs(nodes_dir)

    with open(os.path.join(nodes_dir, '__init__.py'), 'w'): pass

    with open(os.path.join(nodes_dir, 'node1.py'), 'w') as fp:
        tpl = '''from ark import (
    FunctionNode,
)


class Node1(FunctionNode):

    def run(self, *args, **kwargs):
        print('Say Hi')

        '''
        fp.write(tpl)


