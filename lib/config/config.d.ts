export declare class Config {
    private _c;
    constructor();
    getDB(dbName: string): {
        "driver": string;
        "dsn": string;
    };
    isDev(): boolean;
}
