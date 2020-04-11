import { Flow } from './flow';
export declare class TFlow extends Flow {
    executeTestNode(cls: any, node: any): Promise<void>;
    main(inputs: any): Promise<any>;
}
