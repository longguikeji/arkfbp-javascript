from ark import (
    FunctionNode,
)


class Node1(FunctionNode):

    def run(self, *args, **kwargs):
        print('Say Hi')

        