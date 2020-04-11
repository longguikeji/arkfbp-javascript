"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config/config");
var DBMateData = /** @class */ (function () {
    function DBMateData() {
        this._config = new config_1.Config();
    }
    DBMateData.prototype.getDSN = function (dbName) {
        if (this._config.isDev()) {
            return "todo";
        }
        else {
            return this._config.getDB(dbName).dsn;
        }
    };
    return DBMateData;
}());
exports.DBMateData = DBMateData;
