from ark import FunctionNode

import sqlite3


class OpenDBNode(FunctionNode):

    def run(self):
        sqlite3.connect()