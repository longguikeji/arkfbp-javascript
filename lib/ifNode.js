"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var node_1 = require("./node");
var IFNode = /** @class */ (function (_super) {
    tslib_1.__extends(IFNode, _super);
    function IFNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'if';
        _this.ret = false;
        return _this;
    }
    IFNode.prototype.expression = function () {
        return true;
    };
    IFNode.prototype.positiveStatement = function () { };
    IFNode.prototype.negativeStatement = function () { };
    IFNode.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                ret = !!this.expression();
                this.ret = ret;
                if (ret) {
                    return [2 /*return*/, this.positiveStatement()];
                }
                return [2 /*return*/, this.negativeStatement()];
            });
        });
    };
    return IFNode;
}(node_1.Node));
exports.IFNode = IFNode;
