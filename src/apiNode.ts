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

    buildParams?: () => {}

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

    _getParams(): any {
        if (typeof this.buildParams !== 'undefined') {
            return this.buildParams()
        }

        return this.params
    }

    async _requestDirect() {
        const options = {
            url: this.url,
            headers: this.headers,
            method: this.method as Method,
            data: this._getParams(),
        }

        const resp = await axios(options)

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