"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var node_1 = require("./node");
var NopNode = /** @class */ (function (_super) {
    tslib_1.__extends(NopNode, _super);
    function NopNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'nop';
        return _this;
    }
    return NopNode;
}(node_1.Node));
exports.NopNode = NopNode;
