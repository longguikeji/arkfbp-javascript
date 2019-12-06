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

    /**
     *
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
                return await this._request_direct()

            case 'proxy':
                return await this._request_proxy()

            default:
                break
        }
    }

    async _request_direct() {
        const options = {
            url: this.url,
            headers: this.headers,
            method: this.method as Method,
            data: this.params,
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

    async _request_proxy() {
        return null
    }
}