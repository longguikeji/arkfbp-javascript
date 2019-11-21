from ark import (
    FunctionNode,
)


class Node2(FunctionNode):

    def run(self, *args, **kwargs):
        inputs = self.inputs

        username = inputs['username']
        password = inputs['password']

        if username == 'rock' and password == '123456':
            return {
                'msg': 'you logged in'
            }

        return {
            'msg': 'check failed, please entry correct credentials'
        }
