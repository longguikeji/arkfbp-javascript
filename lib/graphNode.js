"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GraphNode = /** @class */ (function () {
    function GraphNode(id, cls, next, positiveNext, negativeNext) {
        this.id = id;
        this.cls = cls;
        this.next = next;
        this.positiveNext = positiveNext;
        this.negativeNext = negativeNext;
    }
    return GraphNode;
}());
exports.GraphNode = GraphNode;
