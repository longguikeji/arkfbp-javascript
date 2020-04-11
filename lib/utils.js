"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAsync(fn) {
    return fn.constructor.name === 'AsyncFunction';
}
exports.isAsync = isAsync;
