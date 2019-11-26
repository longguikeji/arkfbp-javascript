const StopNode = require('../../../ark').StopNode


class Node4 extends StopNode {

    async run() {
        console.info("STOP")

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

module.exports = Node4