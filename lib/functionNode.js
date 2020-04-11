"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var node_1 = require("./node");
var FunctionNode = /** @class */ (function (_super) {
    tslib_1.__extends(FunctionNode, _super);
    function FunctionNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'function';
        return _this;
    }
    return FunctionNode;
}(node_1.Node));
exports.FunctionNode = FunctionNode;
