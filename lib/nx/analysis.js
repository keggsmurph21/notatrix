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
exports.Analysis = void 0;
var base_class_1 = require("./base-class");
var sub_token_1 = require("./sub-token");
var Analysis = (function (_super) {
    __extends(Analysis, _super);
    function Analysis(sent, serial) {
        var _this = _super.call(this, "Analysis") || this;
        _this._subTokens =
            (serial.subTokens || []).map(function (sub) { return new sub_token_1.SubToken(sent, sub); });
        return _this;
    }
    Object.defineProperty(Analysis.prototype, "subTokens", {
        get: function () { return this._subTokens; },
        enumerable: false,
        configurable: true
    });
    return Analysis;
}(base_class_1.NxBaseClass));
exports.Analysis = Analysis;
//# sourceMappingURL=analysis.js.map