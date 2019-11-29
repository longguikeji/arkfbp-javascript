import requests
from abc import abstractmethod
import copy


class Node:

    id = ''
    name = ''

    def __init__(self, *args, **kwargs):
        self._state = None
        self._inputs = None
        self._outputs = None

    def init():
        pass

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
    error_next = None

    def on_completed(self):
        pass

    def on_error(self):
        pass

    def created(self):
        pass

    def before_initialized(self):
        pass

    def initialized(self):
        pass

    def before_execute(self):
        pass

    def executed(self):
        pass

    def before_destroy(self):
        pass


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

    name = 'api'
    mode = 'direct' # proxy

    url = ''
    method = 'GET'
    auth = None
    headers = None
    params = None

    def run(self):
        print('api node', self.mode)
        if self.mode == 'direct':
            return self._request_direct()

        elif self.mode == 'proxy':
            return self._request_proxy()

    def _request_direct(self):
        kwargs = {}
        if self.auth is not None:
            kwargs['auth'] = self.auth

        if self.params is not None:
            kwargs['data'] = self.params

        if self.headers is not None:
            kwargs['headers'] = self.headers

        if self.method == 'GET':
            res = requests.get(self.url, **kwargs)
            return res.json()

        elif self.method == 'POST':
            res = requests.post(self.url, **kwargs)
            return res.json()

    def _request_proxy(self):
        return None


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


class LoopNode(Node):

    init = None
    condition = None
    post = None

    def init_statement(self):
        pass

    def condition_statement(self):
        return False

    def post_statement(self):
        pass

    def process(self):
        pass

    def run(self, *args, **kwargs):
        self.init()

        while bool(self.condition()):
            self.process()
            self.post()
