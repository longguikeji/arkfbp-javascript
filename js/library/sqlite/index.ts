// import { sqlite3 } from 'sqlite3'

const sqlite3 = require('sqlite3')

import { FunctionNode } from './../../ark/src/functionNode'

class ORM {

    private _db: any | null

    constructor() {
    }

    async open(path: string) {
        return new Promise((resolve, reject) => {
            this._db = new sqlite3.Database(path,
                function (err) {
                    if (err) reject("Open error: " + err.message)
                    else resolve(path + " opened")
                }
            )
        })
    }

    async get(sql: string, params?: any[]) {
        return new Promise((resolve, reject) => {
            this._db.get(sql, params, (err, row) => {
                if (err) reject(err.message)
                else resolve(row)
            })
        })
    }

    async getAll(sql: string, params?: any[]) {
        return new Promise((resolve, reject) => {
            this._db.all(sql, params, (err, rows) => {
                if (err) reject(err.message)
                else resolve(rows)
            })
        })
    }

    async run(sql: string, params?: any[]) {
        return new Promise((resolve, reject) => {
            this._db.run(sql, params, (err) => {
                if (err) reject(err.message)
                else resolve(true)
            })
        })
    }

    async close() {
        return new Promise((resolve, reject) => {
            this._db.close()
            resolve(true)
        })
    }
}


class QueryData extends FunctionNode {

    db: string = ''
    sql = ''
    params = []

    async run() {
        const orm = new ORM()
        await orm.open(this.db)
        const data = await orm.get(this.sql, this.params)
        await orm.close()
        return data
    }
}

class QueryAllData extends FunctionNode {

    db: string = ''
    sql = ''
    params = []

    async run() {
        const orm = new ORM()
        await orm.open(this.db)
        const data = await orm.getAll(this.sql, this.params)
        await orm.close()
        return data
    }
}

class InsertData extends FunctionNode {

    db: string = ''
    sql = ''
    params = []

    async run() {
        const orm = new ORM()
        await orm.open(this.db)
        const data = await orm.run(this.sql, this.params)
        await orm.close()
        return data
    }
}

class DeleteData extends FunctionNode {

    db: string = ''
    sql = ''
    params = []

    async run() {
        const orm = new ORM()
        await orm.open(this.db)
        const data = await orm.run(this.sql, this.params)
        await orm.close()
        return data
    }
}


class UpdateData extends FunctionNode {

    db: string = ''
    sql = ''
    params = []

    async run() {
        const orm = new ORM()
        await orm.open(this.db)
        const data = await orm.run(this.sql, this.params)
        await orm.close()
        return data
    }
}