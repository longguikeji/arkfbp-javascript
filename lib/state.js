"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var State = /** @class */ (function () {
    function State() {
        this._userData = {};
        this._steps = [];
        this._nodes = new Map();
    }
    State.prototype.commit = function (cb) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // @Todo: refactor this
                    return [4 /*yield*/, cb(this._userData)];
                    case 1:
                        // @Todo: refactor this
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    State.prototype.fetch = function () {
        return this._userData;
    };
    State.prototype.getOutputs = function (id) {
        if (this._nodes.has(id)) {
            var nodes = this._nodes.get(id);
            var node = nodes[nodes.length - 1];
            return node.outputs;
        }
    };
    State.prototype.getInputs = function (id) {
        if (this._nodes.has(id)) {
            var nodes = this._nodes.get(id);
            var node = nodes[nodes.length - 1];
            return node.inputs;
        }
    };
    State.prototype.push = function (node) {
        if (!this._nodes.has(node.id)) {
            this._nodes.set(node.id, [node]);
        }
        else {
            this._nodes.get(node.id).push(node);
        }
        this._steps.push(node);
    };
    Object.defineProperty(State.prototype, "steps", {
        get: function () {
            var steps = [];
            for (var _i = 0, _a = this._steps; _i < _a.length; _i++) {
                var step = _a[_i];
                var stepData = {
                    id: step.id,
                    name: step.name,
                    inputs: {},
                    outputs: {},
                    state: {},
                };
                steps.push(stepData);
            }
            return steps;
        },
        enumerable: true,
        configurable: true
    });
    return State;
}());
exports.State = State;
