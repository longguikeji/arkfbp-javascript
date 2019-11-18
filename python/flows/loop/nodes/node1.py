from ark import (
    LoopNode,
)


class Node1(LoopNode):

    def init(self):
        self.i = 0

    def condition(self):
        return self.i < 10

    def post(self):
        print(self.i)
        self.i += 1