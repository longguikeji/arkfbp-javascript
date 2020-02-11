import {Config} from "../config/config"
export class DBMateData {
    private _config: any | null
    constructor() {
        this._config = new Config()
    }

    getDSN(dbName: string): string{
        if (this._config.isDev()){
            return "todo"
        } else {
            return this._config.getDB(dbName).dsn
        }
    }
}
