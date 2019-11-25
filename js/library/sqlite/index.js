// import { sqlite3 } from 'sqlite3'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sqlite3 = require('sqlite3');
// import { FunctionNode } from './../../ark/src/functionNode'
class ORM {
    constructor() {
    }
    open(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._db = new sqlite3.Database(path, function (err) {
                    if (err)
                        reject("Open error: " + err.message);
                    else
                        resolve(path + " opened");
                });
            });
        });
    }
    get(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._db.get(sql, params, (err, row) => {
                    if (err)
                        reject(err.message);
                    else
                        resolve(row);
                });
            });
        });
    }
    getAll(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._db.all(sql, params, (err, rows) => {
                    if (err)
                        reject(err.message);
                    else
                        resolve(rows);
                });
            });
        });
    }
    run(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._db.run(sql, params, (err) => {
                    if (err)
                        reject(err.message);
                    else
                        resolve(true);
                });
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._db.close();
                resolve(true);
            });
        });
    }
}
class QueryData {
    constructor() {
        this.db = '';
        this.sql = '';
        this.params = [];
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const orm = new ORM();
            yield orm.open(this.db);
            const data = yield orm.get(this.sql, this.params);
            yield orm.close();
            return data;
        });
    }
}
class QueryAllData {
    constructor() {
        this.db = '';
        this.sql = '';
        this.params = [];
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const orm = new ORM();
            yield orm.open(this.db);
            const data = yield orm.getAll(this.sql, this.params);
            yield orm.close();
            return data;
        });
    }
}
class InsertData {
    constructor() {
        this.db = '';
        this.sql = '';
        this.params = [];
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const orm = new ORM();
            yield orm.open(this.db);
            const data = yield orm.run(this.sql, this.params);
            yield orm.close();
            return data;
        });
    }
}
class DeleteData {
    constructor() {
        this.db = '';
        this.sql = '';
        this.params = [];
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const orm = new ORM();
            yield orm.open(this.db);
            const data = yield orm.run(this.sql, this.params);
            yield orm.close();
            return data;
        });
    }
}
class MyQueryData extends QueryAllData {
    constructor() {
        super(...arguments);
        this.db = './db.sqlite3';
        this.sql = 'select * from users';
        this.params = [];
    }
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const orm = new MyQueryData();
        const data = yield orm.run();
        console.info(data);
    });
})();
