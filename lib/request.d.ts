/**
 * HTTP Binding Request
 */
export declare class Request {
    schema: string;
    hostname: string;
    method: string;
    path: string;
    /**
     * 路由中的命名参数
     */
    params: {
        [key: string]: any;
    };
    /**
     * URL的QueryString
     */
    queryParams: any;
    cookies: any;
    headers: any;
    contentType: string;
    encodings: string[] | null;
    charsets: string[] | null;
    languages: string[] | null;
    /**
     * fields: form 表单提交的时候普通字段
     */
    fields: any;
    /**
     *
     */
    files: any;
    body: any;
    parse(req: any): void;
}
