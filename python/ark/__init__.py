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
    if hasattr(f, 'created'):
        f.created()

    # f.state.request = request
    # f.state.data_dir = ''

    inputs = request.get_json()

    if hasattr(f, 'before_initialize'):
        f.before_initialize()

    f.init()

    if hasattr(f, 'initialized'):
        f.initialized()

    if hasattr(f, 'before_execute'):
        f.before_execute()

    ret = f.main(inputs=inputs)

    if hasattr(f, 'executed'):
        f.executed()

    if hasattr(f, 'before_destroy'):
        f.before_destroy()

    if ret is None:
        return ''

    return ret