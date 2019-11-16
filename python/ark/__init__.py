from abc import abstractmethod
import copy


class State:

    def __init__(self, init_data=None):
        self._request = None
        self._response = None
        self._data = None
        if init_data:
            self._data = copy.deepcopy(init_data)

    @property
    def request(self):
        return self._request

    @request.setter
    def request(self, v):
        self._request = v

    @property
    def response(self):
        return self._response

    @request.setter
    def response(self, v):
        self._response = v


class Node:

    name = ''

    def __init__(self, *args, **kwargs):
        self._state = None
        self._inputs = None
        self._outputs = None

    def commit_state(self, cb):
        '''
        commit state
        '''
        self.state = cb(self.state)

    @property
    def state(self):
        return self._state

    @state.setter
    def state(self, v):
        self._state = v

    @abstractmethod
    def run(self, *args, **kwargs):
        raise NotImplementedError

    @property
    def outputs(self):
        return self._outputs

    @outputs.setter
    def outputs(self, v):
        self._outputs = v

    @property
    def inputs(self):
        return self._inputs

    @inputs.setter
    def inputs(self, v):
        self._inputs = v

    next = None
    error = None


class StartNode(Node):

    name = 'start'

    def run(self):
        print('start node')


class StopNode(Node):

    name = 'stop'

    def run(self):
        print('stop node')


class FunctionNode(Node):

    name = 'function'

    def run(self):
        print('function node')


class NopNode(Node):

    name = 'nop'

    def run(self):
        print('nop node')


class APINode(Node):

    def run(self):
        print('api node')


class IFNode(Node):

    name = 'if'

    ret = False

    def run(self, *args, **kwargs):
        ret_code = self.expression()
        self.ret = bool(ret_code)

        if ret_code:
            return self.positive_statement()

        return self.negative_statement()

    def expression(self):
        return True

    def positive_statement(self):
        pass

    def negative_statement(self):
        pass


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


class Stack:

    def __init__(self):
        self._nodes = []

    @property
    def nodes(self):
        return self._nodes

    def push(self, node):
        self._nodes.append(node)

    def pop(self):
        if not len(self._nodes):
            return None

        node = self._nodes.pop()
        return node


class Flow:

    def __init__(self):
        self._stack = Stack()

        self.graph = self.create_graph()
        self.state = self.create_state()

        # 根据 Nodes & Edges 设置 next

    def create_graph(self):
        raise NotImplementedError

    def create_state(self):
        return None

    def main(self):
        # previous_outputs = None

        # for node_cls in self.graph.nodes:
        #     node = node_cls()
        #     node.state = self.state

        #     if not isinstance(node, Node):
        #         raise Exception('{} is not instance of Node', node_cls)

        #     if previous_outputs is not None:
        #         node.inputs = previous_outputs

        #     outputs = node.run()
        #     node.outputs = outputs
        #     self._stack.push(node)

        #     previous_outputs = outputs

        last_outputs = None

        graph_node = self.graph.nodes[0]
        while graph_node is not None:
            node = graph_node['cls']()
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

            if node.name == 'if':
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

    def debug(self):
        print('---------- DEBUG DEBUG INFORMATION -------------')

        for node in self._stack.nodes:
            print('****** NODE ******')
            print('Inputs: ', node.inputs)
            print('Outputs: ', node.outputs)
            print('****** END ******* ')

        print('---------- END DEBUG INFORMATION -------------')

