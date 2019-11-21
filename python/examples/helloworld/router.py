from flask import Flask, escape, request, Blueprint

router = Blueprint('router', __name__)

def run_flow(flow, inputs=None):
    flow = 'flows.{}.main'.format(flow,)
    mod = __import__(flow)
    secs = flow.split('.')

    for s in secs[1:]:
        mod = getattr(mod, s)

    f = mod.Main()
    ret = f.main(inputs=inputs)
    if ret is None:
        return ''

    return ret


@router.route('/login', methods=['POST'])
def login():
    inputs = request.get_json()
    return run_flow('login', inputs=inputs)


@router.route('/logout')
def logout():
    return run_flow('logout')
