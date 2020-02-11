export class Config {
    private _c: any | null

    constructor(){
        this._c = require('config-yml');
    }

    getDB(dbName: string){ // TODO
        return {
            "driver": "sqlite",
            "dsn": "crm.sqlite3",
        }
    }

    isDev():boolean{
        return this._c.dev
    }
}

