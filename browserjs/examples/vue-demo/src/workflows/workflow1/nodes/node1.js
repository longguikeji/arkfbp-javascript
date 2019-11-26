const StartNode = require('../../../ark').StartNode


class Node1 extends StartNode {

    async run() {
        console.info("START")

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

module.exports = Node1