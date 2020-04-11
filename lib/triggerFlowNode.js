"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var flow_1 = require("./flow");
var node_1 = require("./node");
var TriggerFlowNode = /** @class */ (function (_super) {
    tslib_1.__extends(TriggerFlowNode, _super);
    function TriggerFlowNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'triggerFlow';
        return _this;
    }
    TriggerFlowNode.prototype.run = function (options2) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var flowOptions, outputs;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // tslint:disable-next-line: no-console
                        console.info('options2', options2);
                        if (typeof this.flow === 'undefined') {
                            throw new Error('flow not set');
                        }
                        flowOptions = this.buildOptions ? this.buildOptions() : undefined;
                        // tslint:disable-next-line: no-console
                        console.info('TriggerFlowNode::run', this.inputs, flowOptions);
                        return [4 /*yield*/, flow_1.runWorkflowByClass(this.flow, this.inputs, flowOptions)];
                    case 1:
                        outputs = _a.sent();
                        return [2 /*return*/, outputs];
                }
            });
        });
    };
    return TriggerFlowNode;
}(node_1.Node));
exports.TriggerFlowNode = TriggerFlowNode;
