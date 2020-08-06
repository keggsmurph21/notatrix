"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootToken = void 0;
var base_token_1 = require("./base-token");
var RootToken = (function (_super) {
    __extends(RootToken, _super);
    function RootToken(sent) {
        var _this = _super.call(this, sent, "RootToken") || this;
        _this.form = "ROOT";
        _this.indices = {
            absolute: 0,
            conllu: "0",
            cg3: 0,
            cytoscape: 0,
            serial: null,
        };
        return _this;
    }
    return RootToken;
}(base_token_1.BaseToken));
exports.RootToken = RootToken;
//# sourceMappingURL=root-token.js.map