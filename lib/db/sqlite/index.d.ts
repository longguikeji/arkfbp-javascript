import { FunctionNode } from './../../functionNode';
export declare class QueryData extends FunctionNode {
    db: string;
    sql: string;
    params?: any[];
    run(): Promise<unknown>;
}
export declare class QueryAllData extends FunctionNode {
    db: string;
    sql: string;
    params?: any[];
    run(): Promise<unknown>;
}
export declare class InsertData extends FunctionNode {
    db: string;
    sql: string;
    params?: any[];
    run(): Promise<unknown>;
}
export declare class DeleteData extends FunctionNode {
    db: string;
    sql: string;
    params?: any[];
    run(): Promise<unknown>;
}
export declare class UpdateData extends FunctionNode {
    db: string;
    sql: string;
    params?: any[];
    run(): Promise<unknown>;
}
