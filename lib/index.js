"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ark = /** @class */ (function () {
    function Ark() {
    }
    Object.defineProperty(Ark.prototype, "plugin", {
        get: function () {
            return this._plugin;
        },
        set: function (v) {
            this._plugin = v;
        },
        enumerable: true,
        configurable: true
    });
    Ark.prototype.hello = function () {
        console.info('hello world');
    };
    Ark.prototype.registerPlugin = function (plugin, options) {
        plugin(this, options);
    };
    return Ark;
}());
exports.Ark = Ark;
exports.ark = new Ark();
