"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lodash_1 = tslib_1.__importDefault(require("lodash"));
/**
 * HTTP Binding Request
 */
var Request = /** @class */ (function () {
    function Request() {
        this.schema = 'http';
        this.hostname = '';
        this.method = 'GET';
        this.path = '';
        /**
         * 路由中的命名参数
         */
        this.params = {};
        /**
         * URL的QueryString
         */
        this.queryParams = {};
        this.cookies = {};
        this.headers = {};
        this.contentType = '';
        this.encodings = null;
        this.charsets = null;
        this.languages = null;
        /**
         * fields: form 表单提交的时候普通字段
         */
        this.fields = {};
        /**
         *
         */
        this.files = {};
        this.body = {};
    }
    Request.prototype.parse = function (req) {
        this.body = req.body;
        this.schema = req.protocol;
        this.hostname = req.hostname;
        this.method = req.method;
        this.path = req.path;
        this.encodings = req.acceptsEncodings();
        this.charsets = req.acceptsCharsets();
        this.languages = req.acceptsLanguages();
        var contentType = req.get('Content-Type');
        if (!!contentType) {
            this.contentType = contentType;
        }
        for (var key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                this.queryParams[key] = req.query[key];
            }
        }
        // @Todo: 同名HEADER的处理, 确认expressjs是否支持
        for (var key in req.headers) {
            if (req.headers.hasOwnProperty(key)) {
                this.headers[key] = req.headers[key];
            }
        }
        for (var key in req.cookies) {
            if (req.cookies.hasOwnProperty(key)) {
                this.cookies[key] = req.cookies[key];
            }
        }
        this.fields = lodash_1.default.cloneDeep(req.fields);
        for (var name_1 in req.files) {
            if (req.files.hasOwnProperty(name_1)) {
                this.files[name_1] = {
                    path: req.files[name_1].path,
                    name: req.files[name_1].name,
                    size: req.files[name_1].size,
                    type: req.files[name_1].type,
                };
            }
        }
        for (var name_2 in req.params) {
            if (req.params.hasOwnProperty(name_2)) {
                this.params[name_2] = req.params[name_2];
            }
        }
    };
    return Request;
}());
exports.Request = Request;
