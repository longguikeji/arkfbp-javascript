"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var flow_1 = require("./flow");
var node_1 = require("./node");
var utils_1 = require("./utils");
var flowOptions_1 = require("./flowOptions");
var TestNode = /** @class */ (function (_super) {
    tslib_1.__extends(TestNode, _super);
    function TestNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'test';
        return _this;
    }
    // tslint:disable-next-line: no-empty
    TestNode.prototype.setUp = function () { };
    // tslint:disable-next-line: no-empty
    TestNode.prototype.tearDown = function () { };
    TestNode.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cls, testcases, n, flow, startNodeId, stopNodeId, i, testcase, instance, testFn, inputs, flowOptions, outputs;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cls = this.constructor;
                        testcases = [];
                        testcases = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
                        testcases = testcases.sort().filter(function (e, i, arr) {
                            if (e !== arr[i + 1] && typeof _this[e] === 'function' && e.startsWith('test'))
                                return true;
                        });
                        n = testcases.length;
                        // tslint:disable-next-line: no-console
                        console.info(n + " testcases");
                        flow = this.flow;
                        startNodeId = this.start;
                        stopNodeId = this.stop;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < n)) return [3 /*break*/, 4];
                        testcase = testcases[i];
                        instance = new cls();
                        testFn = instance[testcase];
                        if (utils_1.isAsync(testFn)) {
                            // tslint:disable-next-line: no-console
                            console.info("[skip] " + testcase);
                            return [3 /*break*/, 3];
                        }
                        // setUp
                        instance.setUp();
                        inputs = {};
                        flowOptions = new flowOptions_1.FlowOptions();
                        if (startNodeId) {
                            flowOptions.startId = startNodeId;
                        }
                        if (stopNodeId) {
                            flowOptions.stopId = stopNodeId;
                        }
                        return [4 /*yield*/, flow_1.runWorkflowByClass(flow, inputs, flowOptions)];
                    case 2:
                        outputs = _a.sent();
                        instance.outputs = outputs;
                        // run testcase function
                        try {
                            testFn.call(instance);
                            // tslint:disable-next-line: no-console
                            console.info("[ok] " + testcase);
                        }
                        catch (error) {
                            // tslint:disable-next-line: no-console
                            console.info("[fail] " + testcase);
                            // tslint:disable-next-line: no-console
                            console.info(error);
                        }
                        // tearDown
                        instance.tearDown();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TestNode;
}(node_1.Node));
exports.TestNode = TestNode;
