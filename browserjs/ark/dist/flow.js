"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Flow = /** @class */ (function () {
    function Flow() {
        this._graph = this.createGraph();
    }
    Flow.prototype.createGraph = function () {
        return null;
    };
    Flow.prototype.main = function (inputs) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var lastOutputs, graphNode, nextGraphNodeId, node, outputs;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lastOutputs = null;
                        if (inputs === null) {
                            lastOutputs = inputs;
                        }
                        graphNode = this._graph.nodes[0];
                        _a.label = 1;
                    case 1:
                        if (!(graphNode !== null)) return [3 /*break*/, 3];
                        node = new graphNode.cls();
                        node.inputs = lastOutputs;
                        return [4 /*yield*/, node.run()];
                    case 2:
                        outputs = _a.sent();
                        lastOutputs = outputs;
                        nextGraphNodeId = graphNode.next;
                        graphNode = this._graph.getNodeById(graphNode.next);
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, lastOutputs];
                }
            });
        });
    };
    return Flow;
}());
exports.Flow = Flow;
//# sourceMappingURL=flow.js.map