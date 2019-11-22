from ark import (
    FunctionNode,
)


class Node1(FunctionNode):

    def run(self, *args, **kwargs):
        import sqlite3

        inputs = self.inputs

        user_id = inputs['user_id']
        token = inputs['token']

        user_info = {}

        conn = sqlite3.connect('./db.sqlite3')
        cursor = conn.cursor()
        cursor.execute('delete from tokens where user_id=? and token=?', (user_id, token))
        conn.commit()
        cursor.close()
        conn.close()

        return {
            'error': 0
        }
