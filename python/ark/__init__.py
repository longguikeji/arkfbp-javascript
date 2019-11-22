from .node import Node, StartNode, StopNode, FunctionNode, NopNode, APINode, IFNode, LoopNode
from .graph import Graph, GraphNode
from .state import State
from .stack import Stack
from .flow import Flow
from .request import Request


def run_flow(flow, request):
    flow = 'flows.{}.main'.format(flow,)
    mod = __import__(flow)
    secs = flow.split('.')

    for s in secs[1:]:
        mod = getattr(mod, s)

    f = mod.Main()

    # f.state.request = request
    # f.state.data_dir = ''

    inputs = request.get_json()

    ret = f.main(inputs=inputs)
    if ret is None:
        return ''

    return ret