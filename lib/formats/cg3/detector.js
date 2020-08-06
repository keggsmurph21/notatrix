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
        allowLeadingWhitespace: true
    });
    if (!text && !options.allowEmptyString)
        throw new utils_1.DetectorError("Illegal CG3: empty string", text, options);
    if (utils_1.isJSONSerializable(text))
        throw new utils_1.DetectorError("Illegal CG3: JSON object", text, options);
    var parsing = null;
    text.split(/\n/).forEach(function (line) {
        if (utils_1.RE.whiteline.test(line)) {
            if (parsing === null) {
                if (!options.allowLeadingWhitespace)
                    throw new utils_1.DetectorError("Illegal CG3: contains leading whitespace", text, options);
            }
            else {
                if (parsing !== "token-body" || !options.allowTrailingWhitespace)
                    throw new utils_1.DetectorError("Illegal CG3: contains trailing whitespace", text, options);
            }
            parsing = "whitespace";
        }
        else if (utils_1.RE.comment.test(line)) {
            if (parsing === "token-start" || parsing === "token-body")
                throw new utils_1.DetectorError("Illegal CG3: invalid sequence " + parsing + "=>comment", text, options);
            parsing = "comment";
        }
        else if (utils_1.RE.cg3TokenStart.test(line)) {
            if (parsing === "token-start")
                throw new utils_1.DetectorError("Illegal CG3: invalid sequence " + parsing + "=>token-start", text, options);
            parsing = "token-start";
        }
        else if (utils_1.RE.cg3TokenContent.test(line)) {
            if (parsing === "comment" || parsing === "whitespace")
                throw new utils_1.DetectorError("Illegal CG3: invalid sequence " + parsing + "=>token-body", text, options);
            parsing = "token-body";
        }
        else {
            throw new utils_1.DetectorError("Illegal CG3: unmatched line", text, options);
        }
    });
    return "CG3";
}
exports.default = default_1;
;
//# sourceMappingURL=detector.js.map