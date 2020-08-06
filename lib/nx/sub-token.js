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
exports.SubToken = void 0;
var base_token_1 = require("./base-token");
var SubToken = (function (_super) {
    __extends(SubToken, _super);
    function SubToken(sent, serial) {
        return _super.call(this, sent, "SubToken", serial) || this;
    }
    return SubToken;
}(base_token_1.BaseToken));
exports.SubToken = SubToken;
//# sourceMappingURL=sub-token.js.map