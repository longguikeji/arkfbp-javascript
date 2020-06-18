import { Node } from './node'

import axios, { AxiosAdapter, Method } from 'axios'

export class APINode extends Node {

    name = 'api'
    mode = 'direct'

    url = ''
    method = 'GET'
    auth = null
    headers: any | null = null
    params: any | null = null

    async buildParams() {
        return this.params
    }

    /**
     * API Node执行结果，方便重载的时候获取更多除了data的额外信息
     */
    resp: {
        status: number,
        statusText: string,
        headers?: any,
        data?: any,
    } | null = null

    async run() {
        switch (this.mode) {
            case 'direct':
                return this._requestDirect()

            case 'proxy':
                return this._requestProxy()

            default:
                break
        }
    }

    async _getParams() {
        if (typeof this.buildParams !== 'undefined') {
            const params = await this.buildParams()
            return params
        }

        return this.params
    }

    async _requestDirect() {
        const options = {
            url: this.url,
            headers: this.headers,
            method: this.method as Method,
            data: await this._getParams(),
        }

        let resp: any

        try {
            resp = await axios(options)
        } catch (err) {
            console.error('>><<><', err.toJSON())
        }

        this.resp = {
            status: resp.status,
            statusText: resp.statusText,
            headers: resp.headers,
            data: resp.data,
        }

        return resp.data
    }

    async _requestProxy() {
        return null
    }
}