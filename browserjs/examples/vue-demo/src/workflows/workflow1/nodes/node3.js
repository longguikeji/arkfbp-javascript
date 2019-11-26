const FunctionNode = require('../../../ark').FunctionNode


class Node3 extends FunctionNode {

    async run() {
        console.info("Process JSON Result")

        return {
            timestamp: Math.round(new Date().getTime() / 1000),
        }
    }

    // Hook
    beforeStart() { }
    afterStart() { }
    beforeStop() { }
    afterStop() { }

    // Event
    onStart() { }
    onStop() { }

}

module.exports = Node3