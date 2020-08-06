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
exports.Token = void 0;
var base_token_1 = require("./base-token");
var analysis_1 = require("./analysis");
var Token = (function (_super) {
    __extends(Token, _super);
    function Token(sent, serial) {
        var _this = _super.call(this, sent, "Token", serial) || this;
        _this._analyses =
            (serial.analyses || []).map(function (ana) { return new analysis_1.Analysis(sent, ana); });
        _this._i = (_this._analyses.length ? 0 : null);
        return _this;
    }
    Object.defineProperty(Token.prototype, "analysis", {
        get: function () {
            if (this._i === null)
                return null;
            return this._analyses[this._i];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Token.prototype, "subTokens", {
        get: function () {
            return this.analysis ? this.analysis.subTokens : [];
        },
        enumerable: false,
        configurable: true
    });
    return Token;
}(base_token_1.BaseToken));
exports.Token = Token;
//# sourceMappingURL=token.js.map