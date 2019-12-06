import { StopNode } from './../../../../../../ark/src/stopNode'


export class Node2 extends StopNode {

    async run() {
        console.info(this.$request.files)
        return {
            'loop': this.state.fetch().sum,
        }
    }

}