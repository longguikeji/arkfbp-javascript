import { CookieSerializeOptions } from 'cookie';
/**
 * HTTP Response
 */
export declare class Response {
    private _headers;
    private _status;
    private _data;
    get headers(): {
        [key: string]: string | string[];
    };
    get status(): number;
    set status(value: number);
    get data(): any;
    set data(value: any);
    /**
     * set customized headers
     *
     * @FixMe: duplicated keys are not supported now
     *
     * @param name name
     * @param value value
     */
    setHeader(name: string, value: string): void;
    clearHeaders(): void;
    setCookie(name: string, value: string, options?: CookieSerializeOptions): void;
    setContentType(value: string): void;
    redirect(url: string, status?: number): void;
    append(name: string, value: string): string | string[];
}
