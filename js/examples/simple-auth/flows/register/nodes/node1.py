from ark import (
    FunctionNode,
)


class Node1(FunctionNode):

    def run(self, *args, **kwargs):
        import sqlite3

        inputs = self.inputs
        print(inputs)

        username = inputs['username']
        password = inputs['password']
        name = inputs['name']

        user_info = {}

        conn = sqlite3.connect('./db.sqlite3')
        cursor = conn.cursor()
        cursor.execute('select username from users where username=?', (username,))
        values = cursor.fetchall()
        if len(values):
            cursor.close()
            conn.close()

            return {
                'error': 1002,
                'message': 'username has been taken',
            }

        cursor.execute('insert into users(username, name, password) values(?, ?, ?)', (username, name, password))
        conn.commit()

        cursor.close()
        conn.close()

        return {
            'error': 0,
            'message': 'register successfully',
        }
