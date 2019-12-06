import { FunctionNode } from '../../../../../../../../ark/src/functionNode'

export class Node1 extends FunctionNode {

    async run() {
        console.info('app started')
        this.$appState.commit((state: any) => {
            return state
        })
    }

}