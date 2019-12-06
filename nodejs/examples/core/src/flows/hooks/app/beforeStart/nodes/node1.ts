import { FunctionNode } from '../../../../../../../../ark/src/functionNode'

export class Node1 extends FunctionNode {

    async run() {
        console.info('app before start')
        this.$appState.commit((state: any) => {
            return state
        })
    }

}