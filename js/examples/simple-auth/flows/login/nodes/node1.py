from ark import (
    FunctionNode,
)


class Node1(FunctionNode):

    def run(self, *args, **kwargs):
        import sqlite3

        inputs = self.inputs

        username = inputs['username']
        password = inputs['password']

        user_info = {}

        conn = sqlite3.connect('./db.sqlite3')
        cursor = conn.cursor()
        cursor.execute('select id, username, name from users where username=? and password=?', (username, password))
        values = cursor.fetchall()
        if values:
            user_info = {
                'id': values[0][0],
                'username': values[0][1],
                'name': values[0][2],
            }

        cursor.close()
        conn.close()

        def my_commit_state(state):
        	state['user_info'] = user_info
        	return state

        self.commit_state(my_commit_state)
        return user_info
