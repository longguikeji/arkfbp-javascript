
import express from 'express'
import _ from 'lodash'

/**
 * HTTP Binding
 */
export class Request {

    schema: string = 'http'
    hostname: string = ''
    method: string = 'GET'
    path: string = ''

    /**
     * 路由中的命名参数
     */
    params: any = {}

    /**
     * URL的QueryString
     */
    queryParams: any = {}
    body: string = ''

    cookies: any = {}


    headers: any = {}

    contentType: string = ''
    encodings: string[] | null = null
    charsets: string[] | null = null
    languages: string[] | null = null

    /**
     * fields: form 表单提交的时候普通字段
     */
    fields: any = {}

    /**
     *
     */
    files: any = []

    constructor() {}

    parse(req: express.Request) {
        this.schema = req.protocol
        this.hostname = req.hostname
        this.method = req.method
        this.path = req.path
        this.encodings = req.acceptsEncodings()
        this.charsets = req.acceptsCharsets()
        this.languages = req.acceptsLanguages()
        let contentType = req.get('Content-Type')
        if (!!contentType) {
            this.contentType = contentType
        }

        for (const key in req.query) {
            this.queryParams[key] = req.query[key]
        }

        // @Todo: 同名HEADER的处理, 确认expressjs是否支持
        for (const key in req.headers) {
            this.headers[key] = req.headers[key]
        }

        for (const key in req.cookies) {
            this.cookies[key] = req.cookies[key]
        }

        this.fields = _.cloneDeep(req.fields)

        for (const name in req.files) {
            if (req.files.hasOwnProperty(name)) {
                this.files[name] = {
                    path: req.files[name].path,
                    name: req.files[name].name,
                    size: req.files[name].size,
                    type: req.files[name].type,
                }
            }
        }
    }
}