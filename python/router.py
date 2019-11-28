from flask import Flask, escape, request
from ark.flow import run_flow

app = Flask(__name__)


@app.route('/login', methods=['POST'])
def login():
    inputs = request.get_json()
    return run_flow('flows.helloworld.login', inputs=inputs)


@app.route('/logout')
def logout():
    return run_flow('flows.helloworld.logout')


if __name__ == '__main__':
    app.run(debug=True)