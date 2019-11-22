from flask import Flask, escape, request, Blueprint
from ark import run_flow

router = Blueprint('router', __name__)


@router.route('/login', methods=['POST'])
def login():
    return run_flow('login', request=request)


@router.route('/logout', methods=['POST'])
def logout():
    return run_flow('logout', request=request)


@router.route('/register', methods=['POST'])
def register():
    return run_flow('register', request=request)