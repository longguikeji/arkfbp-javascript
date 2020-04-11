"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var flow_1 = require("./flow");
var TFlow = /** @class */ (function (_super) {
    tslib_1.__extends(TFlow, _super);
    function TFlow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TFlow.prototype.executeTestNode = function (cls, node) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var testcases, n, flow, startNodeId, stopNodeId, i, testcase, testFn, isAsync, instance, flowDirectory, flowFilename, inputs, outputs;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testcases = [];
                        testcases = Object.getOwnPropertyNames(Object.getPrototypeOf(node));
                        testcases = testcases.sort().filter(function (e, i, arr) {
                            if (e != arr[i + 1] && typeof node[e] == 'function' && e.startsWith('test'))
                                return true;
                        });
                        console.info(testcases);
                        n = testcases.length;
                        console.info(n + " testcases");
                        flow = node.flow;
                        startNodeId = node.start;
                        stopNodeId = node.stop;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < n)) return [3 /*break*/, 4];
                        testcase = testcases[i];
                        testFn = node[testcase];
                        isAsync = testFn.constructor.name === "AsyncFunction";
                        if (isAsync) {
                            console.info("[skip] " + testcase);
                            // testFn()
                            //     .then(() => {
                            //         console.info(`[ok] ${testcase}`)
                            //     })
                            //     .catch((error) => {
                            //         console.info(`[fail] ${testcase}`)
                            //     })
                            return [3 /*break*/, 3];
                        }
                        instance = new cls();
                        // setUp
                        instance.setUp();
                        flowDirectory = __dirname + '/' + '../..';
                        flowFilename = flowDirectory + '/' + 'flows' + '/' + flow;
                        inputs = {};
                        return [4 /*yield*/, runWorkflowByFile(flowFilename, inputs, {})];
                    case 2:
                        outputs = _a.sent();
                        instance.outputs = outputs;
                        // run testcase function
                        try {
                            testFn();
                            console.info("[ok] " + testcase);
                        }
                        catch (error) {
                            console.info("[fail] " + testcase);
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
    TFlow.prototype.main = function (inputs) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var lastOutputs, graphNode, nextGraphNodeId, node, outputs;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lastOutputs = null;
                        if (inputs !== null) {
                            lastOutputs = inputs;
                            this._inputs = inputs;
                        }
                        this._status = 'RUNNING';
                        this.dumpLogFile();
                        graphNode = this._graph.nodes[0];
                        nextGraphNodeId = undefined;
                        _a.label = 1;
                    case 1:
                        if (!(graphNode !== null)) return [3 /*break*/, 15];
                        node = new graphNode.cls();
                        if (this.request) {
                            node.$request = this.request;
                        }
                        if (this.response) {
                            node.$response = this.response;
                        }
                        if (!node.hasOwnProperty('created')) return [3 /*break*/, 3];
                        return [4 /*yield*/, node.created()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!node.hasOwnProperty('beforeInitialize')) return [3 /*break*/, 5];
                        return [4 /*yield*/, node.beforeInitialize()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        node.init();
                        if (!node.hasOwnProperty('initialized')) return [3 /*break*/, 7];
                        return [4 /*yield*/, node.initialized()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        if (typeof graphNode.id !== 'undefined') {
                            node.id = graphNode.id.toString();
                        }
                        if (typeof node.id === 'undefined') {
                            throw new Error("node must has the id property settled");
                        }
                        node.inputs = lastOutputs;
                        node.$state = this._state;
                        node.$appState = this._appState;
                        if (!node.hasOwnProperty('beforeExecute')) return [3 /*break*/, 9];
                        return [4 /*yield*/, node.beforeExecute()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [4 /*yield*/, node.run()];
                    case 10:
                        outputs = _a.sent();
                        if (!node.hasOwnProperty('executed')) return [3 /*break*/, 12];
                        return [4 /*yield*/, node.executed()];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        node.outputs = outputs;
                        if (!node.hasOwnProperty('beforeDestroy')) return [3 /*break*/, 14];
                        return [4 /*yield*/, node.beforeDestroy()];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        lastOutputs = outputs;
                        if (this._state) {
                            this._state.push(node);
                        }
                        this.dumpLogFile();
                        if (!(node instanceof TestNode) && !(node instanceof StartNode) && !(node instanceof StopNode)) {
                            throw new Error('in testflow all nodes must be test node' + node.id);
                        }
                        if (node instanceof TestNode) {
                            this.executeTestNode(graphNode.cls, node);
                        }
                        nextGraphNodeId = graphNode.next;
                        if (nextGraphNodeId) {
                            graphNode = this._graph.getNodeById(nextGraphNodeId);
                        }
                        else {
                            graphNode = null;
                        }
                        return [3 /*break*/, 1];
                    case 15:
                        this._outputs = lastOutputs;
                        this.dumpLogFile();
                        this._status = 'STOPPED';
                        return [2 /*return*/, lastOutputs];
                }
            });
        });
    };
    return TFlow;
}(flow_1.Flow));
exports.TFlow = TFlow;
