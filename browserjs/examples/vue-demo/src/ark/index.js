class Node {

    id = -1
    type = "abstract"

}

export class StartNode extends Node {
}

export class APINode extends Node {
}

export class FunctionNode extends Node {
}

export class StopNode extends Node {
}


export class Workflow {

    async run() {
        console.info('run run run')

        // const nodes = this.spec.nodes
        // for (let i = 0; i < nodes.length; ++i) {
        //     const node = nodes[i]

        //     const path = './workflows' + '/workflow' + this.id + '/nodes' + '/node' + node.id
        //     const nodeCls = require(path)
        //     const instance = new nodeCls()

        //     const outputs = await instance.run()
        //     console.info('node' + node.id + '.outputs', outputs)
        // }
    }

}


