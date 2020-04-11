"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var cookie_1 = tslib_1.__importDefault(require("cookie"));
/**
 * HTTP Response
 */
var Response = /** @class */ (function () {
    function Response() {
        this._headers = {};
        this._status = 200;
        this._data = null;
    }
    Object.defineProperty(Response.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * set customized headers
     *
     * @FixMe: duplicated keys are not supported now
     *
     * @param name name
     * @param value value
     */
    Response.prototype.setHeader = function (name, value) {
        this._headers[name] = value;
    };
    Response.prototype.clearHeaders = function () {
        this._headers = {};
    };
    Response.prototype.setCookie = function (name, value, options) {
        if (options === void 0) { options = {}; }
        this.append('Set-Cookie', cookie_1.default.serialize(name, String(value), options));
    };
    Response.prototype.setContentType = function (value) {
        this._headers['Content-Type'] = value;
    };
    // sendFile() {}
    Response.prototype.redirect = function (url, status) {
        this.status = status ? status : 302;
        this.setHeader('Location', url);
    };
    Response.prototype.append = function (name, value) {
        var prev = this._headers[name];
        var newValue = value;
        if (prev) {
            // concat the new and prev vals
            newValue = Array.isArray(prev) ? prev.concat(value)
                : Array.isArray(value) ? [prev].concat(value)
                    : [prev, value];
        }
        return this._headers[name] = newValue;
    };
    return Response;
}());
exports.Response = Response;
