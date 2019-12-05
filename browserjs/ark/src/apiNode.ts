import { Node } from './node'

import axios from 'axios'

export class APINode extends Node {

    name = 'api'
    mode = 'direct'

    url = ''
    method = 'GET'
    auth = null
    headers: any | null = null
    params: any | null = null

    async run() {
        switch (this.mode) {
            case 'direct':
                return this._request_direct()

            case 'proxy':
                return this._request_proxy()

            default:
                break
        }

    }

    async _request_direct() {
        if (this.method === 'GET') {
            const resp = await axios.get(this.url, {headers: this.headers})
            return resp.data
        }

        else if (this.method === 'POST') {
            const resp = await axios.post(this.url, this.params, {headers: this.headers})
            return resp.data
        }
    }

    async _request_proxy() {
        return null
    }
}