// import { sqlite3 } from 'sqlite3'

const sqlite3 = require('sqlite3')

import { FunctionNode } from './../../functionNode'

class ORM {

    private _db: any | null

    constructor() {
    }

    async open(path: string) {
        return new Promise((resolve, reject) => {
            this._db = new sqlite3.Database(path,
                function (err: Error) {
                    if (err) reject("Open error: " + err.message)
                    else resolve(path + " opened")
                }
            )
        })
    }

    async get(sql: string, params?: any[]) {
        return new Promise((resolve, reject) => {
            this._db.get(sql, params, (err: Error, row: []) => {
                if (err) reject(err.message)
                else resolve(row)
            })
        })
    }

    async getAll(sql: string, params?: any[]) {
        return new Promise((resolve, reject) => {
            this._db.all(sql, params, (err :Error, rows: []) => {
                if (err) reject(err.message)
                else resolve(rows)
            })
        })
    }

    async run(sql: string, params?: any[]) {
        return new Promise((resolve, reject) => {
            this._db.run(sql, params, (err: Error) => {
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


export class QueryData extends FunctionNode {

    db: string = ''
    sql:string = ''
    params?:any[] = []

    async run() {
        const orm = new ORM()
        await orm.open(this.db)
        const data = await orm.get(this.sql, this.params)
        await orm.close()
        return data
    }
}

export class QueryAllData extends FunctionNode {

    db: string = ''
    sql:string = ''
    params?:any[] = []

    async run() {
        const orm = new ORM()
        await orm.open(this.db)
        const data = await orm.getAll(this.sql, this.params)
        await orm.close()
        return data
    }
}

export class InsertData extends FunctionNode {

    db: string = ''
    sql:string = ''
    params?:any[] = []

    async run() {
        const orm = new ORM()
        await orm.open(this.db)
        const data = await orm.run(this.sql, this.params)
        await orm.close()
        return data
    }
}

export class DeleteData extends FunctionNode {

    db: string = ''
    sql:string = ''
    params?:any[] = []

    async run() {
        const orm = new ORM()
        await orm.open(this.db)
        const data = await orm.run(this.sql, this.params)
        await orm.close()
        return data
    }
}


export class UpdateData extends FunctionNode {

    db: string = ''
    sql:string = ''
    params?:any[] = []

    async run() {
        const orm = new ORM()
        await orm.open(this.db)
        const data = await orm.run(this.sql, this.params)
        await orm.close()
        return data
    }
}