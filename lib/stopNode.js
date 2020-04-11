"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var node_1 = require("./node");
var StopNode = /** @class */ (function (_super) {
    tslib_1.__extends(StopNode, _super);
    function StopNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'stop';
        return _this;
    }
    StopNode.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(this.inputs)];
            });
        });
    };
    return StopNode;
}(node_1.Node));
exports.StopNode = StopNode;
