"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var flow_1 = require("./flow");
var flowOptions_1 = require("./flowOptions");
var node_1 = require("./node");
var utils_1 = require("./utils");
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
            var cls, testcases, n, flow, startNodeId, stopNodeId, i, testcase, instance, testFn, caseSetUpFunction, flowOptions, outputs, caseTearDownFunction;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cls = this.constructor;
                        testcases = [];
                        testcases = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
                        testcases = testcases.sort().filter(function (e, i, arr) {
                            if (e !== arr[i + 1] && typeof _this[e] === 'function' && e.startsWith('test') && e.indexOf('SetUp') === -1 && e.indexOf('TearDown') === -1)
                                return true;
                            return false;
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
                        if (!(i < n)) return [3 /*break*/, 5];
                        testcase = testcases[i];
                        if (testcase.indexOf('SetUp') >= 0 || testcase.indexOf('TearDown') >= 0) {
                            return [3 /*break*/, 4];
                        }
                        instance = new cls();
                        testFn = instance[testcase];
                        if (utils_1.isAsync(testFn)) {
                            // tslint:disable-next-line: no-console
                            console.info("[skip] " + testcase);
                            return [3 /*break*/, 4];
                        }
                        // setUp
                        instance.setUp();
                        caseSetUpFunction = this[testcase + "SetUp"];
                        if (typeof caseSetUpFunction === 'function') {
                            caseSetUpFunction.bind(instance)();
                        }
                        flowOptions = new flowOptions_1.FlowOptions();
                        if (startNodeId) {
                            flowOptions.startId = startNodeId;
                        }
                        if (stopNodeId) {
                            flowOptions.stopId = stopNodeId;
                        }
                        if (!(typeof flow !== 'undefined')) return [3 /*break*/, 3];
                        return [4 /*yield*/, flow_1.runWorkflowByClass(flow, instance.inputs, flowOptions)];
                    case 2:
                        outputs = _a.sent();
                        instance.outputs = outputs;
                        _a.label = 3;
                    case 3:
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
                        caseTearDownFunction = this[testcase + "TearDown"];
                        if (typeof caseTearDownFunction === 'function') {
                            caseTearDownFunction.bind(instance)();
                        }
                        // tearDown
                        instance.tearDown();
                        _a.label = 4;
                    case 4:
                        ++i;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return TestNode;
}(node_1.Node));
exports.TestNode = TestNode;
