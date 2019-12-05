import { LoopNode } from './../../../../../../ark/src/loopNode'
import { State } from './../../../../../../ark/src/state'
import { ark } from './../../../../../../ark/src/index'


export class Node1 extends LoopNode {

    private _i: number = 0

    private _sum: number = 0

    async initStatement() {
        this._i = 1
        this.state.commit((state: any) => {
            state.values! = []
            return state
        })
    }

    async conditionStatement() {
        return this._i < 10
    }

    async postStatement() {
        this._i += 1
    }

    async process() {
        console.info(this.$appState.fetch())
        this._sum += this._i
        this.state.commit((state: any) => {
            state.sum = this._sum
            return state
        })
    }

}