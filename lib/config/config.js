"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
        this._c = require('config-yml');
    }
    Config.prototype.getDB = function (dbName) {
        return {
            "driver": "sqlite",
            "dsn": "crm.sqlite3",
        };
    };
    Config.prototype.isDev = function () {
        return this._c.dev;
    };
    return Config;
}());
exports.Config = Config;
