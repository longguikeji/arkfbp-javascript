from flask import Flask


def run_flow(flow):
    pass


@app.route('/login')
def login():
    return run_flow('login')


@app.route('/logout')
def logout():
    return run_flow('logout')
