"use strict";
// import { sqlite3 } from 'sqlite3'
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sqlite3 = require('sqlite3');
var functionNode_1 = require("./../../functionNode");
var ORM = /** @class */ (function () {
    function ORM() {
    }
    ORM.prototype.open = function (path) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._db = new sqlite3.Database(path, function (err) {
                            if (err)
                                reject("Open error: " + err.message);
                            else
                                resolve(path + " opened");
                        });
                    })];
            });
        });
    };
    ORM.prototype.get = function (sql, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._db.get(sql, params, function (err, row) {
                            if (err)
                                reject(err.message);
                            else
                                resolve(row);
                        });
                    })];
            });
        });
    };
    ORM.prototype.getAll = function (sql, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._db.all(sql, params, function (err, rows) {
                            if (err)
                                reject(err.message);
                            else
                                resolve(rows);
                        });
                    })];
            });
        });
    };
    ORM.prototype.run = function (sql, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._db.run(sql, params, function (err) {
                            if (err)
                                reject(err.message);
                            else
                                resolve(true);
                        });
                    })];
            });
        });
    };
    ORM.prototype.close = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._db.close();
                        resolve(true);
                    })];
            });
        });
    };
    return ORM;
}());
var QueryData = /** @class */ (function (_super) {
    tslib_1.__extends(QueryData, _super);
    function QueryData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.db = '';
        _this.sql = '';
        _this.params = [];
        return _this;
    }
    QueryData.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orm, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orm = new ORM();
                        return [4 /*yield*/, orm.open(this.db)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, orm.get(this.sql, this.params)];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, orm.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return QueryData;
}(functionNode_1.FunctionNode));
exports.QueryData = QueryData;
var QueryAllData = /** @class */ (function (_super) {
    tslib_1.__extends(QueryAllData, _super);
    function QueryAllData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.db = '';
        _this.sql = '';
        _this.params = [];
        return _this;
    }
    QueryAllData.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orm, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orm = new ORM();
                        return [4 /*yield*/, orm.open(this.db)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, orm.getAll(this.sql, this.params)];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, orm.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return QueryAllData;
}(functionNode_1.FunctionNode));
exports.QueryAllData = QueryAllData;
var InsertData = /** @class */ (function (_super) {
    tslib_1.__extends(InsertData, _super);
    function InsertData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.db = '';
        _this.sql = '';
        _this.params = [];
        return _this;
    }
    InsertData.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orm, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orm = new ORM();
                        return [4 /*yield*/, orm.open(this.db)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, orm.run(this.sql, this.params)];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, orm.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return InsertData;
}(functionNode_1.FunctionNode));
exports.InsertData = InsertData;
var DeleteData = /** @class */ (function (_super) {
    tslib_1.__extends(DeleteData, _super);
    function DeleteData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.db = '';
        _this.sql = '';
        _this.params = [];
        return _this;
    }
    DeleteData.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orm, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orm = new ORM();
                        return [4 /*yield*/, orm.open(this.db)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, orm.run(this.sql, this.params)];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, orm.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return DeleteData;
}(functionNode_1.FunctionNode));
exports.DeleteData = DeleteData;
var UpdateData = /** @class */ (function (_super) {
    tslib_1.__extends(UpdateData, _super);
    function UpdateData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.db = '';
        _this.sql = '';
        _this.params = [];
        return _this;
    }
    UpdateData.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orm, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orm = new ORM();
                        return [4 /*yield*/, orm.open(this.db)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, orm.run(this.sql, this.params)];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, orm.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return UpdateData;
}(functionNode_1.FunctionNode));
exports.UpdateData = UpdateData;
