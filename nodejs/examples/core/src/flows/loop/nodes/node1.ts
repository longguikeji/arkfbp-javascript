import { LoopNode } from './../../../../../../ark/src/loopNode'


export class Node1 extends LoopNode {

    private _i: number = 0

    async initStatement() {
        this._i = 0
        this.state.commit((state: any) => {
            state.values = []
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
        this.state.commit((state: any) => {
            state.values.push(this._i)
            return state
        })
    }

}