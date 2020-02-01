import { Node, NodeIDType } from './node'

export class TestNode extends Node {

    name = 'test'

    flow: any
    start: NodeIDType | null | undefined
    stop: NodeIDType | null | undefined

    // tslint:disable-next-line: no-empty
    setUp() {}

    // tslint:disable-next-line: no-empty
    tearDown() {}

}