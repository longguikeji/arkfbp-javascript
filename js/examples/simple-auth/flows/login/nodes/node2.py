from ark import (
    IFNode,
)


class Node2(IFNode):

    def expression(self):
        user_info = self.inputs
        if user_info:
            return True

        return False
