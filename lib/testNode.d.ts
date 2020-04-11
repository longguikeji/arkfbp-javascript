import { Node, NodeIDType } from './node';
export declare class TestNode extends Node {
    name: string;
    flow: any;
    start: NodeIDType | null | undefined;
    stop: NodeIDType | null | undefined;
    outputs: any;
    setUp(): void;
    tearDown(): void;
    run(): Promise<void>;
}
