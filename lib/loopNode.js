"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var node_1 = require("./node");
var LoopNode = /** @class */ (function (_super) {
    tslib_1.__extends(LoopNode, _super);
    function LoopNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'loop';
        return _this;
    }
    LoopNode.prototype.initStatement = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    LoopNode.prototype.conditionStatement = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    LoopNode.prototype.postStatement = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    LoopNode.prototype.process = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    LoopNode.prototype.executeBody = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var node;
            return tslib_1.__generator(this, function (_a) {
                // tslint:disable-next-line: no-console
                console.info(options);
                if (this.body) {
                    node = new this.body();
                    node.inputs = options;
                    return [2 /*return*/, node.run()];
                }
                return [2 /*return*/];
            });
        });
    };
    LoopNode.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initStatement()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.conditionStatement()];
                    case 3:
                        if (!_a.sent()) return [3 /*break*/, 6];
                        options = this.process();
                        return [4 /*yield*/, this.executeBody(options)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.postStatement()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return LoopNode;
}(node_1.Node));
exports.LoopNode = LoopNode;
