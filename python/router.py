from flask import Flask, escape, request

app = Flask(__name__)

def run_flow(flow, inputs=None):
    # flows.helloworld.main
    flow = 'flows.helloworld.main'
    mod = __import__(flow)
    secs = flow.split('.')

    for s in secs[1:]:
        mod = getattr(mod, s)

    print(mod)

    f = mod.Main()
    ret = f.main(inputs=inputs)
    if ret is None:
        return ''

    return ret


@app.route('/login', methods=['POST'])
def login():
    inputs = request.get_json()
    return run_flow('login', inputs=inputs)


@app.route('/logout')
def logout():
    return run_flow('logout')


if __name__ == '__main__':
    app.run(debug=True)