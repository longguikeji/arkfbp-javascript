"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var fs_1 = require("fs");
var graph_1 = require("./graph");
var ifNode_1 = require("./ifNode");
var loopNode_1 = require("./loopNode");
var request_1 = require("./request");
var response_1 = require("./response");
var state_1 = require("./state");
var Flow = /** @class */ (function () {
    function Flow(options) {
        if (options === void 0) { options = {}; }
        this._state = null;
        this._appState = null;
        this._request = null;
        this._response = null;
        this._debug = false;
        this._debugStatePersistentFile = '';
        this._inputs = null;
        this._outputs = null;
        this._status = 'CREATED';
        this._verbose = false;
        this._step = 0;
        this._graph = this.createGraph();
        this._state = new state_1.State();
        this._request = new request_1.Request();
        this._options = options;
        if (options.request) {
            this._request.parse(options.request);
        }
        if (options.response) {
            this._response = options.response;
        }
        else {
            this._response = new response_1.Response();
        }
        if (options.appState) {
            this._appState = options.appState;
        }
        if (options.debug) {
            this._debug = options.debug;
        }
        if (options.debugStatePersistentFile) {
            this._debugStatePersistentFile = options.debugStatePersistentFile;
        }
        if (options.verbose) {
            this._verbose = options.verbose;
        }
    }
    Object.defineProperty(Flow.prototype, "request", {
        get: function () {
            return this._request;
        },
        set: function (v) {
            this._request = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Flow.prototype, "response", {
        get: function () {
            return this._response;
        },
        set: function (v) {
            this._response = v;
        },
        enumerable: true,
        configurable: true
    });
    Flow.prototype.createGraph = function () {
        return new graph_1.Graph();
    };
    // tslint:disable-next-line: no-empty
    Flow.prototype.init = function () { };
    Flow.prototype.getNextGraphNode = function (graphNode, node) {
        var nextGraphNodeId;
        if (node instanceof ifNode_1.IFNode) {
            // IF Node has two potential next and the ret stored current statement evaluated result
            if (node.ret) {
                nextGraphNodeId = graphNode.positiveNext;
            }
            else {
                nextGraphNodeId = graphNode.negativeNext;
            }
        }
        else {
            nextGraphNodeId = graphNode.next;
        }
        if (nextGraphNodeId) {
            return this._graph.getNodeById(nextGraphNodeId);
        }
        return null;
    };
    Flow.prototype.main = function (inputs) {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var lastOutputs, graphNode, canExecute, shouldStop, node, loopBodyCls, outputs, err_1, regEx, _e, filename, line, column;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        lastOutputs = null;
                        if (inputs !== null) {
                            lastOutputs = inputs;
                            this._inputs = inputs;
                        }
                        this._status = 'RUNNING';
                        this.dumpLogFile();
                        this._userOptions = inputs ? inputs : {};
                        graphNode = this._graph.nodes[0];
                        canExecute = false;
                        shouldStop = false;
                        _f.label = 1;
                    case 1:
                        if (!(graphNode !== null)) return [3 /*break*/, 18];
                        this._step += 1;
                        if (this._options.startId && !canExecute) {
                            if (graphNode.id === this._options.startId) {
                                canExecute = true;
                            }
                        }
                        else {
                            canExecute = true;
                        }
                        node = new graphNode.cls();
                        if (!canExecute) {
                            graphNode = this.getNextGraphNode(graphNode, node);
                            return [3 /*break*/, 1];
                        }
                        if (this.request) {
                            node.$request = this.request;
                        }
                        if (this.response) {
                            node.$response = this.response;
                        }
                        node.$options = this._userOptions;
                        if (!node.hasOwnProperty('created')) return [3 /*break*/, 3];
                        return [4 /*yield*/, node.created()];
                    case 2:
                        _f.sent();
                        _f.label = 3;
                    case 3:
                        if (!node.hasOwnProperty('beforeInitialize')) return [3 /*break*/, 5];
                        return [4 /*yield*/, node.beforeInitialize()];
                    case 4:
                        _f.sent();
                        _f.label = 5;
                    case 5:
                        node.init();
                        if (!node.hasOwnProperty('initialized')) return [3 /*break*/, 7];
                        return [4 /*yield*/, node.initialized()];
                    case 6:
                        _f.sent();
                        _f.label = 7;
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
                        _f.sent();
                        _f.label = 9;
                    case 9:
                        if (node instanceof loopNode_1.LoopNode) {
                            if (graphNode.body) {
                                loopBodyCls = this._graph.getNodeById(graphNode.body).cls;
                                if (typeof loopBodyCls !== 'undefined') {
                                    node.body = this._graph.getNodeById(graphNode.body).cls;
                                }
                            }
                        }
                        outputs = void 0;
                        _f.label = 10;
                    case 10:
                        _f.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, node.run()];
                    case 11:
                        outputs = _f.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        err_1 = _f.sent();
                        console.log(chalk_1.default.red.underline("\n>>> #STEP-" + this._step + " NODE[#" + node.id + ":" + node.name + "]ERROR"));
                        console.log('\t', chalk_1.default.bgGray("Inputs: " + JSON.stringify(lastOutputs)));
                        console.log('\t', chalk_1.default.bgMagenta("App State: " + JSON.stringify((_a = this._appState) === null || _a === void 0 ? void 0 : _a.fetch())));
                        console.log('\t', chalk_1.default.bgBlue("Flow State: " + JSON.stringify((_b = this._state) === null || _b === void 0 ? void 0 : _b.fetch())));
                        console.log('\t', chalk_1.default.bgCyan("Outputs: " + JSON.stringify(node.outputs)));
                        regEx = new RegExp(process.cwd() + "\\/(?!node_modules\\/)([\\/\\w-_\\.]+\\.js):(\\d*):(\\d*)");
                        _e = err_1.stack.match(regEx), filename = _e[1], line = _e[2], column = _e[3];
                        console.log('\t', chalk_1.default.bgRed("Error: " + err_1.name + " " + err_1.message + " " + filename + ":" + line + ":" + column));
                        this._status = 'ERROR';
                        // @Todo: 节点增加error属性，用于指定发生异常错误的处理节点
                        return [3 /*break*/, 18];
                    case 13:
                        /**
                         * if there's no error property set in this node, we will stop the flow
                         * otherwise we will redirect to the error setted node
                         */
                        if (this._status === 'RUNNING') {
                            if (this._verbose) {
                                console.log(chalk_1.default.green.underline("\n>>> #STEP - " + this._step + " NODE[#" + node.id + ":" + node.name + "]SUCCESS"));
                                console.log('\t', chalk_1.default.bgGray("Inputs: " + JSON.stringify(node.inputs)));
                                console.log('\t', chalk_1.default.bgMagenta("App State: " + JSON.stringify((_c = this._appState) === null || _c === void 0 ? void 0 : _c.fetch())));
                                console.log('\t', chalk_1.default.bgBlue("Flow State: " + JSON.stringify((_d = this._state) === null || _d === void 0 ? void 0 : _d.fetch())));
                                console.log('\t', chalk_1.default.bgCyan("Outputs: " + JSON.stringify(node.outputs)));
                            }
                        }
                        if (!node.hasOwnProperty('executed')) return [3 /*break*/, 15];
                        return [4 /*yield*/, node.executed()];
                    case 14:
                        _f.sent();
                        _f.label = 15;
                    case 15:
                        node.outputs = outputs;
                        if (!node.hasOwnProperty('beforeDestroy')) return [3 /*break*/, 17];
                        return [4 /*yield*/, node.beforeDestroy()];
                    case 16:
                        _f.sent();
                        _f.label = 17;
                    case 17:
                        lastOutputs = outputs;
                        if (this._state) {
                            this._state.push(node);
                        }
                        this.dumpLogFile();
                        if (this._options.stopId && this._options.stopId === graphNode.id) {
                            shouldStop = true;
                        }
                        graphNode = this.getNextGraphNode(graphNode, node);
                        if (graphNode === null) {
                            shouldStop = true;
                        }
                        if (shouldStop) {
                            return [3 /*break*/, 18];
                        }
                        return [3 /*break*/, 1];
                    case 18:
                        this._outputs = lastOutputs;
                        this.dumpLogFile();
                        this._status = 'STOPPED';
                        return [2 /*return*/, lastOutputs];
                }
            });
        });
    };
    Flow.prototype.dumpLogFile = function () {
        var _a;
        if (!this._debug)
            return;
        // tslint:disable-next-line: no-any
        var data = {};
        data.status = this._status;
        data.inputs = this._inputs;
        data.steps = (_a = this._state) === null || _a === void 0 ? void 0 : _a.steps;
        data.outputs = this._outputs;
        fs_1.writeFileSync(this._debugStatePersistentFile, JSON.stringify(data));
    };
    // tslint:disable-next-line: no-empty
    Flow.prototype.beforeInitialize = function () { };
    // tslint:disable-next-line: no-empty
    Flow.prototype.initialized = function () { };
    // tslint:disable-next-line: no-empty
    Flow.prototype.beforeExecute = function () { };
    // tslint:disable-next-line: no-empty
    Flow.prototype.executed = function () { };
    // tslint:disable-next-line: no-empty
    Flow.prototype.beforeDestroy = function () { };
    return Flow;
}());
exports.Flow = Flow;
function importWorkflowByFile(filename) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ns;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require(filename)); })];
                case 1:
                    ns = _a.sent();
                    return [2 /*return*/, ns];
            }
        });
    });
}
exports.importWorkflowByFile = importWorkflowByFile;
function runWorkflowByFile(filename, inputs, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ns, flow;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require(filename)); })];
                case 1:
                    ns = _a.sent();
                    flow = new ns.Main(options);
                    return [2 /*return*/, runWorkflow(flow, inputs)];
            }
        });
    });
}
exports.runWorkflowByFile = runWorkflowByFile;
function runWorkflowByClass(cls, inputs, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var flow;
        return tslib_1.__generator(this, function (_a) {
            flow = new cls(options);
            return [2 /*return*/, runWorkflow(flow, inputs)];
        });
    });
}
exports.runWorkflowByClass = runWorkflowByClass;
function runWorkflow(flow, inputs) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ret;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (flow.hasOwnProperty('beforeInitialize')) {
                        flow.beforeInitialize();
                    }
                    flow.init();
                    if (flow.hasOwnProperty('initialized')) {
                        flow.initialized();
                    }
                    if (flow.hasOwnProperty('beforeExecute')) {
                        flow.beforeExecute();
                    }
                    return [4 /*yield*/, flow.main(inputs)];
                case 1:
                    ret = _a.sent();
                    if (flow.hasOwnProperty('executed')) {
                        flow.executed();
                    }
                    if (flow.hasOwnProperty('beforeDestroy')) {
                        flow.beforeDestroy();
                    }
                    return [2 /*return*/, ret];
            }
        });
    });
}
exports.runWorkflow = runWorkflow;
