"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = __importStar(require("./constants"));
var errors_1 = require("./errors");
Object.defineProperty(exports, "ConverterError", { enumerable: true, get: function () { return errors_1.ConverterError; } });
Object.defineProperty(exports, "DBError", { enumerable: true, get: function () { return errors_1.DBError; } });
Object.defineProperty(exports, "DetectorError", { enumerable: true, get: function () { return errors_1.DetectorError; } });
Object.defineProperty(exports, "GeneratorError", { enumerable: true, get: function () { return errors_1.GeneratorError; } });
Object.defineProperty(exports, "NotatrixError", { enumerable: true, get: function () { return errors_1.NotatrixError; } });
Object.defineProperty(exports, "NxError", { enumerable: true, get: function () { return errors_1.NxError; } });
Object.defineProperty(exports, "ParserError", { enumerable: true, get: function () { return errors_1.ParserError; } });
Object.defineProperty(exports, "SplitterError", { enumerable: true, get: function () { return errors_1.SplitterError; } });
Object.defineProperty(exports, "ToolError", { enumerable: true, get: function () { return errors_1.ToolError; } });
var funcs_1 = require("./funcs");
Object.defineProperty(exports, "combine", { enumerable: true, get: function () { return funcs_1.combine; } });
Object.defineProperty(exports, "dedup", { enumerable: true, get: function () { return funcs_1.dedup; } });
Object.defineProperty(exports, "getContrastingColor", { enumerable: true, get: function () { return funcs_1.getContrastingColor; } });
Object.defineProperty(exports, "getRandomHexColor", { enumerable: true, get: function () { return funcs_1.getRandomHexColor; } });
Object.defineProperty(exports, "guessDeprel", { enumerable: true, get: function () { return funcs_1.guessDeprel; } });
Object.defineProperty(exports, "hashStringToHex", { enumerable: true, get: function () { return funcs_1.hashStringToHex; } });
Object.defineProperty(exports, "hexToRGB", { enumerable: true, get: function () { return funcs_1.hexToRGB; } });
Object.defineProperty(exports, "isJSONSerializable", { enumerable: true, get: function () { return funcs_1.isJSONSerializable; } });
Object.defineProperty(exports, "noop", { enumerable: true, get: function () { return funcs_1.noop; } });
Object.defineProperty(exports, "thin", { enumerable: true, get: function () { return funcs_1.thin; } });
exports.RE = __importStar(require("./regex"));
//# sourceMappingURL=index.js.map