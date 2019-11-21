from ark import (
    FunctionNode,
)


class Node2(FunctionNode):

    def run(self, *args, **kwargs):
        print('Say Hi Again')

        inputs = self.inputs

        return {
            'name': inputs['username'],
            'password': inputs['password'],
        }
