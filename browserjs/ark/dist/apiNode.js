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
        return _this;
    }
    APINode.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (this.mode) {
                    case 'direct':
                        return [2 /*return*/, this._request_direct()];
                    case 'proxy':
                        return [2 /*return*/, this._request_proxy()];
                    default:
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    APINode.prototype._request_direct = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var resp, resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.method === 'GET')) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get(this.url)];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.data];
                    case 2:
                        if (!(this.method === 'POST')) return [3 /*break*/, 4];
                        return [4 /*yield*/, axios_1.default.post(this.url, this.params)];
                    case 3:
                        resp = _a.sent();
                        return [2 /*return*/, resp.data];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    APINode.prototype._request_proxy = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    return APINode;
}(node_1.Node));
exports.APINode = APINode;
//# sourceMappingURL=apiNode.js.map