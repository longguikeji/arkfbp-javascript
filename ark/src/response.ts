import cookie, { CookieSerializeOptions } from 'cookie'

/**
 * HTTP Response
 */
export class Response {

    private _headers: {
        [key: string]: string | string[],
    } = {}

    private _status: number = 200

    private _data: any = null

    get headers() {
        return this._headers
    }

    get status() {
        return this._status
    }

    set status(value: number) {
        this._status = value
    }

    get data() {
        return this._data
    }

    set data(value: any) {
        this._data = value
    }

    /**
     * set customized headers
     *
     * @FixMe: duplicated keys are not supported now
     *
     * @param name name
     * @param value value
     */
    setHeader(name: string, value: string) {
        this._headers[name] = value
    }

    clearHeaders() {
        this._headers = {}
    }

    setCookie(name: string, value: string, options: CookieSerializeOptions = {}) {
        this.append('Set-Cookie', cookie.serialize(name, String(value), options))
    }

    setContentType(value: string) {
        this._headers['Content-Type'] = value
    }

    // sendFile() {}

    redirect(url: string, status?: number) {
        this.status = status ? status : 302
        this.setHeader('Location', url)
    }

    append(name: string, value: string) {
        const prev = this._headers[name]
        let newValue: string | string[] = value

        if (prev) {
            // concat the new and prev vals
            newValue = Array.isArray(prev) ? prev.concat(value)
                : Array.isArray(value) ? [prev].concat(value)
                    : [prev, value]
        }

        return this._headers[name] = newValue
    }

}