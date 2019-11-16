from ark import (
    FunctionNode,
)


class Node2(FunctionNode):

    def run(self, *args, **kwargs):
        print('Say Hi Again')
