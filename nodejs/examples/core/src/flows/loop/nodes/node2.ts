import { StopNode } from './../../../../../../ark/src/stopNode'


export class Node2 extends StopNode {

    async run() {
        return {
            'loop': this.state.fetch().sum,
        }
    }

}