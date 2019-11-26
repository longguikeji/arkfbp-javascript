const APINode = require('../../../ark').APINode


class Node2 extends APINode {

    async run() {
        console.info("Invoke Weather report API")

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

module.exports = Node2