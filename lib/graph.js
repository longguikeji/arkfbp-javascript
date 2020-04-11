"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Graph = /** @class */ (function () {
    function Graph() {
        this.nodes = [];
    }
    Graph.prototype.getNodeById = function (id) {
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.id === id) {
                return node;
            }
        }
        return null;
    };
    return Graph;
}());
exports.Graph = Graph;
