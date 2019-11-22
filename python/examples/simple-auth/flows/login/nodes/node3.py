from ark import (
    FunctionNode,
)


class Node3(FunctionNode):

    def run(self):
        import sqlite3
        import uuid

        user_info = self.state['user_info']

        token = uuid.uuid4().hex

        conn = sqlite3.connect('./db.sqlite3')
        cursor = conn.cursor()
        cursor.execute('delete from tokens where user_id=?', (user_info['id'],))
        cursor.execute('insert into tokens(user_id, token) values(?, ?)', (user_info['id'], token))
        conn.commit()
        cursor.close()
        conn.close()

        return {
            'user_id': user_info['id'],
            'username': user_info['username'],
            'name': user_info['name'],
            'token': token,
        }


