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
var _ = __importStar(require("underscore"));
var utils_1 = require("utils");
function default_1(text, options) {
    options = _.defaults(options, {
        allowEmptyString: true,
        allowNewlines: false,
        bracketsAllowanceTreshold: 0.2,
    });
    if (utils_1.isJSONSerializable(text))
        throw new utils_1.DetectorError("Illegal plain text: JSON object", text, options);
    if (/\n/.test(text) && !options.allowNewlines)
        throw new utils_1.DetectorError("Illegal plain text: contains newlines", text, options);
    if (options.bracketsAllowanceTreshold >= 0) {
        var numWords = text.split(utils_1.RE.whitespace).length;
        var numBrackets = (text.match(/[\[\]]/g) || []).length;
        var ratio = numBrackets / numWords;
        if (ratio > options.bracketsAllowanceTreshold)
            throw new utils_1.DetectorError("Illegal plain text: contains too many brackets (" + ratio + ")", text, options);
    }
    return "plain text";
}
exports.default = default_1;
;
//# sourceMappingURL=detector.js.map