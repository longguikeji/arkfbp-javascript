import { FunctionNode } from '@/ark/functionNode'


export class SayHi extends FunctionNode {

    async run() {
        console.info('say hi')
    }

}