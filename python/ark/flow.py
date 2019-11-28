from .stack import Stack
from .state import State
from .node import IFNode

class Flow:

    def __init__(self):
        self._stack = Stack()

        self.graph = self.create_graph()
        # self.state = State()
        self.state = {}

        new_state = self.create_state()
        if new_state is not None and isinstance(new_state, dict):
            self.state.update(new_state)

        # 根据 Nodes & Edges 设置 next

    def create_graph(self):
        raise NotImplementedError

    def create_state(self):
        '''工作流可以覆盖'''
        return None

    def main(self, inputs=None):
        last_outputs = None
        if inputs is not None:
            last_outputs = inputs

        graph_node = self.graph.nodes[0]
        while graph_node is not None:
            node = graph_node['cls']()
            if graph_node.get('id', None):
                node.id = graph_node['id']

            if not node.id:
                raise Exception('node id must be settled')

            node.state = self.state
            node.inputs = last_outputs

            outputs = node.run()
            node.outputs = outputs
            self._stack.push(node)
            print('node {} {} executed, with outputs: {}'.format(
                graph_node['id'],
                graph_node['cls'].__class__,
                outputs,
            ))
            print(node.next, node.name)
            last_outputs = outputs

            if isinstance(node, IFNode):
                # IF Node has two potential next
                if node.ret:
                    next_graph_node_id = graph_node.get('positive_next', None)
                else:
                    next_graph_node_id = graph_node.get('negative_next', None)
            else:
                next_graph_node_id = graph_node.get('next', None)

            if next_graph_node_id:
                graph_node = self.graph.get_node_by_id(next_graph_node_id)
            else:
                graph_node = None

        return last_outputs

    def debug(self):
        print('---------- DEBUG DEBUG INFORMATION -------------')

        for node in self._stack.nodes:
            print('****** NODE ******')
            print('Inputs: ', node.inputs)
            print('Outputs: ', node.outputs)
            print('****** END ******* ')

        print('---------- END DEBUG INFORMATION -------------')

