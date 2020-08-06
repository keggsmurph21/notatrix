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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBError = exports.NxError = exports.ConverterError = exports.GeneratorError = exports.ParserError = exports.DetectorError = exports.SplitterError = exports.ToolError = exports.NotatrixError = void 0;
var NotatrixError = (function (_super) {
    __extends(NotatrixError, _super);
    function NotatrixError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NotatrixError;
}(Error));
exports.NotatrixError = NotatrixError;
;
var ToolError = (function (_super) {
    __extends(ToolError, _super);
    function ToolError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ToolError;
}(NotatrixError));
exports.ToolError = ToolError;
;
var SplitterError = (function (_super) {
    __extends(SplitterError, _super);
    function SplitterError(message, text, options) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.text = text;
        _this.options = options;
        _this.name = "SplitterError";
        return _this;
    }
    return SplitterError;
}(ToolError));
exports.SplitterError = SplitterError;
var DetectorError = (function (_super) {
    __extends(DetectorError, _super);
    function DetectorError(message, text, options) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.text = text;
        _this.options = options;
        _this.name = "DetectorError";
        return _this;
    }
    return DetectorError;
}(ToolError));
exports.DetectorError = DetectorError;
var ParserError = (function (_super) {
    __extends(ParserError, _super);
    function ParserError(message, text, options) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.text = text;
        _this.options = options;
        _this.name = "ParserError";
        return _this;
    }
    return ParserError;
}(ToolError));
exports.ParserError = ParserError;
var GeneratorError = (function (_super) {
    __extends(GeneratorError, _super);
    function GeneratorError(message, nx, options) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.nx = nx;
        _this.options = options;
        _this.name = "GeneratorError";
        return _this;
    }
    return GeneratorError;
}(ToolError));
exports.GeneratorError = GeneratorError;
var ConverterError = (function (_super) {
    __extends(ConverterError, _super);
    function ConverterError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = "ConverterError";
        return _this;
    }
    return ConverterError;
}(ToolError));
exports.ConverterError = ConverterError;
var NxError = (function (_super) {
    __extends(NxError, _super);
    function NxError() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, __spread(args)) || this;
        _this.name = "NxError";
        return _this;
    }
    return NxError;
}(NotatrixError));
exports.NxError = NxError;
var DBError = (function (_super) {
    __extends(DBError, _super);
    function DBError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DBError;
}(NotatrixError));
exports.DBError = DBError;
;
//# sourceMappingURL=errors.js.map