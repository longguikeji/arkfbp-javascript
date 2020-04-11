"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var node_1 = require("./node");
var StartNode = /** @class */ (function (_super) {
    tslib_1.__extends(StartNode, _super);
    function StartNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'start';
        return _this;
    }
    StartNode.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(this.inputs)];
            });
        });
    };
    return StartNode;
}(node_1.Node));
exports.StartNode = StartNode;
