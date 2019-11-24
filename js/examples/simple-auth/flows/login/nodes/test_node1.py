import unittest

from flows.helloworld.nodes.node1 import Node1


class TestNode1(unittest.TestCase):

    def test_run(self):
        node = Node1()
        self.assertEqual(node.run(), {
            'text': 'Say Hi'
        })

        node = Node1()
        node.inputs = {
            'dummy': True,
        }
        self.assertEqual(node.run(), {
            'text': 'Say Hi'
        })


if __name__ == '__main__':
    unittest.main()