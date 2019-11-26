"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var apiNode_1 = require("./apiNode");
var debug_1 = require("debug");
var flow_1 = require("./flow");
var functionNode_1 = require("./functionNode");
var graph_1 = require("./graph");
var log = debug_1.debug('mylib:randomid');
// https://oapi.dingtalk.com/robot/send?access_token=bb80b4f172e0c4531408f6f34172e68257d95c15a9d7d4608bb72327abdc87d4
var Node1 = /** @class */ (function (_super) {
    tslib_1.__extends(Node1, _super);
    function Node1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Node1.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                log('node1');
                return [2 /*return*/];
            });
        });
    };
    return Node1;
}(functionNode_1.FunctionNode));
var Node2 = /** @class */ (function (_super) {
    tslib_1.__extends(Node2, _super);
    function Node2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.url = 'https://api.github.com/repos/longguikeji/arkid-core/stargazers';
        return _this;
    }
    return Node2;
}(apiNode_1.APINode));
var Node3 = /** @class */ (function (_super) {
    tslib_1.__extends(Node3, _super);
    function Node3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Node3.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var users, _i, _a, record;
            return tslib_1.__generator(this, function (_b) {
                users = [];
                for (_i = 0, _a = this.inputs; _i < _a.length; _i++) {
                    record = _a[_i];
                    users.push(record.login);
                }
                return [2 /*return*/, users];
            });
        });
    };
    return Node3;
}(functionNode_1.FunctionNode));
var Node4 = /** @class */ (function (_super) {
    tslib_1.__extends(Node4, _super);
    function Node4() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // url = 'https://api.github.com/users/longguikeji'
        _this.url = 'https://oapi.dingtalk.com/robot/send?access_token=bb80b4f172e0c4531408f6f34172e68257d95c15a9d7d4608bb72327abdc87d4';
        _this.method = 'POST';
        _this.headers = {
            'Content-Type': 'application/json',
            'Charset': 'utf-8'
        };
        return _this;
    }
    Node4.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var users;
            return tslib_1.__generator(this, function (_a) {
                users = this.inputs;
                this.params = {
                    "msgtype": "text",
                    "text": {
                        "content": 'arkid共有' + users.length + 'star'
                    },
                };
                log(this.params);
                return [2 /*return*/, _super.prototype.run.call(this)];
            });
        });
    };
    return Node4;
}(apiNode_1.APINode));
var Helloworld = /** @class */ (function (_super) {
    tslib_1.__extends(Helloworld, _super);
    function Helloworld() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Helloworld.prototype.createGraph = function () {
        var g = new graph_1.Graph();
        g.nodes = [
            {
                'cls': Node1,
                'id': 1,
                'next': 2,
            },
            {
                'cls': Node2,
                'id': 2,
                'next': 3,
            },
            {
                'cls': Node3,
                'id': 3,
                'next': 4,
            },
            {
                'cls': Node4,
                'id': 4,
            },
        ];
        return g;
    };
    return Helloworld;
}(flow_1.Flow));
function x() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var hello, ret;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hello = new Helloworld();
                    return [4 /*yield*/, hello.main()];
                case 1:
                    ret = _a.sent();
                    log(ret);
                    return [2 /*return*/];
            }
        });
    });
}
x();
//# sourceMappingURL=helloworld.js.map