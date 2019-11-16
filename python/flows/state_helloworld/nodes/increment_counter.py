from ark import (
    FunctionNode,
)



class IncrementCounter(FunctionNode):

    def run(self):

        def my_commit_state(state):
        	state['count'] += 1
        	return state

        self.commit_state(my_commit_state)
