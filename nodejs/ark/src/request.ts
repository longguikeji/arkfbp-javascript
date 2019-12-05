
import express from 'express'

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
    files: any = []

    headers: any = {}

    contentType: string = ''
    encodings: string[] | null = null
    charsets: string[] | null = null
    languages: string[] | null = null

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
    }

}