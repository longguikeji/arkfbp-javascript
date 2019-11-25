import { Node } from './node';
export class FunctionNode extends Node {
    constructor() {
        super(...arguments);
        this.name = 'function';
    }
}
