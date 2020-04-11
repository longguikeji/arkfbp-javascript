"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var node_1 = require("./node");
var axios_1 = tslib_1.__importDefault(require("axios"));
var APINode = /** @class */ (function (_super) {
    tslib_1.__extends(APINode, _super);
    function APINode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'api';
        _this.mode = 'direct';
        _this.url = '';
        _this.method = 'GET';
        _this.auth = null;
        _this.headers = null;
        _this.params = null;
        /**
         * API Node执行结果，方便重载的时候获取更多除了data的额外信息
         */
        _this.resp = null;
        return _this;
    }
    APINode.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (this.mode) {
                    case 'direct':
                        return [2 /*return*/, this._requestDirect()];
                    case 'proxy':
                        return [2 /*return*/, this._requestProxy()];
                    default:
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    APINode.prototype._getParams = function () {
        if (typeof this.buildParams !== 'undefined') {
            return this.buildParams();
        }
        return this.params;
    };
    APINode.prototype._requestDirect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            url: this.url,
                            headers: this.headers,
                            method: this.method,
                            data: this._getParams(),
                        };
                        return [4 /*yield*/, axios_1.default(options)];
                    case 1:
                        resp = _a.sent();
                        this.resp = {
                            status: resp.status,
                            statusText: resp.statusText,
                            headers: resp.headers,
                            data: resp.data,
                        };
                        return [2 /*return*/, resp.data];
                }
            });
        });
    };
    APINode.prototype._requestProxy = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    return APINode;
}(node_1.Node));
exports.APINode = APINode;
