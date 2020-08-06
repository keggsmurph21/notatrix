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
        allowEmptyString: false,
        allowTrailingWhitespace: true,
        allowLeadingWhitespace: true,
        allowNoDependencies: false,
        allowNewlines: false,
    });
    if (!text && !options.allowEmptyString)
        throw new utils_1.DetectorError("Illegal Brackets: empty string", text, options);
    if (utils_1.isJSONSerializable(text))
        throw new utils_1.DetectorError("Illegal Brackets: JSON object", text, options);
    if (/\n/.test(text) && !options.allowNewlines)
        throw new utils_1.DetectorError("Illegal Brackets: contains newlines", text, options);
    var parsing = null;
    var depth = 0;
    var sawBracket = false;
    text.split("").forEach(function (char, i) {
        switch (char) {
            case ("["):
                if (parsing === "]")
                    throw new utils_1.DetectorError("Illegal Brackets: invalid sequence \"][\"", text, options);
                sawBracket = true;
                depth += 1;
                break;
            case ("]"):
                if (parsing === "[")
                    throw new utils_1.DetectorError("Illegal Brackets: invalid sequence \"[]\"", text, options);
                sawBracket = true;
                depth -= 1;
                break;
            case (" "):
            case ("\t"):
            case ("\n"):
                if (!options.allowLeadingWhitespace) {
                    if (parsing !== null && !utils_1.RE.whitespace.test(parsing))
                        throw new utils_1.DetectorError("Illegal Brackets: contains leading whitespace", text, options);
                }
                break;
        }
        parsing = char;
    });
    if (!sawBracket && !options.allowNoDependencies)
        throw new utils_1.DetectorError("Illegal Brackets: contains no dependencies", text, options);
    if (depth !== 0)
        throw new utils_1.DetectorError("Illegal Brackets: bracket mismatch", text, options);
    if (utils_1.RE.whitespace.test(parsing) && !options.allowTrailingWhitespace)
        throw new utils_1.DetectorError("Illegal Brackets: contains trailing whitespace", text, options);
    return "Brackets";
}
exports.default = default_1;
//# sourceMappingURL=detector.js.map