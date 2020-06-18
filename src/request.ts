
import express from 'express'
import _ from 'lodash'

interface IFields {
    [key: string]: string,
}

interface IFile {
    path: string,
    name: string,
    size: number,
    type: string,
}

interface IFiles {
    [key: string]: IFile,
}

interface IRequest extends express.Request {
    // fields: IFields,
    // files: IFiles,
}

/**
 * HTTP Binding Request
 */
export class Request {

    schema: string = 'http'
    hostname: string = ''
    method: string = 'GET'
    path: string = ''

    /**
     * 路由中的命名参数
     */
    params: {
        [key: string]: any
    } = {}

    /**
     * URL的QueryString
     */
    queryParams: any = {}

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
    files: any = {}

    body: any = {}

    parse(req: any) {
        this.body = req.body
        this.schema = req.protocol
        this.hostname = req.hostname
        this.method = req.method
        this.path = req.path
        this.encodings = req.acceptsEncodings()
        this.charsets = req.acceptsCharsets()
        this.languages = req.acceptsLanguages()
        const contentType = req.get('Content-Type')
        if (!!contentType) {
            this.contentType = contentType
        }

        for (const key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                this.queryParams[key] = req.query[key]
                this.params[name] = this.queryParams[key]
            }
        }

        // @Todo: 同名HEADER的处理, 确认expressjs是否支持
        for (const key in req.headers) {
            if (req.headers.hasOwnProperty(key)) {
                this.headers[key] = req.headers[key]
            }
        }

        for (const key in req.cookies) {
            if (req.cookies.hasOwnProperty(key)) {
                this.cookies[key] = req.cookies[key]
            }
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

        for (const name in req.params) {
            if (req.params.hasOwnProperty(name)) {
                this.params[name] = req.params[name]
            }
        }
    }
}