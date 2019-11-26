"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Node = /** @class */ (function () {
    function Node() {
        this.name = '';
        this._outputs = null;
        this._inputs = null;
        this._state = null;
        this._next = null;
        this._errorNext = null;
        this._outputs = null;
        this._state = null;
    }
    Object.defineProperty(Node.prototype, "outputs", {
        get: function () {
            return this._outputs;
        },
        set: function (v) {
            this._outputs = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "inputs", {
        get: function () {
            return this._inputs;
        },
        set: function (v) {
            this._inputs = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (v) {
            this._state = v;
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    Object.defineProperty(Node.prototype, "next", {
        get: function () {
            return this._next;
        },
        set: function (v) {
            this._next = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "errorNext", {
        get: function () {
            return this._errorNext;
        },
        set: function (v) {
            this._errorNext = v;
        },
        enumerable: true,
        configurable: true
    });
    return Node;
}());
exports.Node = Node;
//# sourceMappingURL=node.js.map