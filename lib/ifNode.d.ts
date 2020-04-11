import { Node } from './node';
export declare class IFNode extends Node {
    name: string;
    ret: boolean;
    expression(): boolean;
    positiveStatement(): void;
    negativeStatement(): void;
    run(): Promise<void>;
}
