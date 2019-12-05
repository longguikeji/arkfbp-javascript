import { FunctionNode } from './../../../../../../../ark/src/functionNode'

export class Node1 extends FunctionNode {

    async run() {
        console.info('app startup, you can set anything you like here')
        this.$appState.commit((state: any) => {
            state.started = new Date()
            return state
        })
    }

}