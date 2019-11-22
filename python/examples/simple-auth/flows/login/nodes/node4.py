from ark import (
    FunctionNode,
)


class Node4(FunctionNode):

    def run(self):
        return {
            'error': 1001,
            'message': 'username or password not matched'
        }
