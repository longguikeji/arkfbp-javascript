"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var flow_1 = require("./flow");
function executeHook(appState, flowFilename) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ns, startupFlow;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fs_1.default.existsSync(flowFilename)) return [3 /*break*/, 3];
                    return [4 /*yield*/, flow_1.importWorkflowByFile(flowFilename)];
                case 1:
                    ns = _a.sent();
                    startupFlow = new ns.Main({
                        appState: appState,
                    });
                    return [4 /*yield*/, flow_1.runWorkflow(startupFlow)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.executeHook = executeHook;
