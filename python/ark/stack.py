class Stack:

    def __init__(self):
        self._nodes = []

    @property
    def nodes(self):
        return self._nodes

    def push(self, node):
        self._nodes.append(node)

    def pop(self):
        if not len(self._nodes):
            return None

        node = self._nodes.pop()
        return node