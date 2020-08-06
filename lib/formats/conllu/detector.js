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
        requireTenParams: false,
        allowTrailingWhitespace: true,
    });
    if (!text && !options.allowEmptyString)
        throw new utils_1.DetectorError("Illegal CoNLL-U: empty string", text, options);
    if (utils_1.isJSONSerializable(text))
        throw new utils_1.DetectorError("Illegal CoNLL-U: JSON object", text, options);
    var tokenLine = options.requireTenParams ? utils_1.RE.conlluTokenLineTenParams
        : utils_1.RE.conlluTokenLine;
    var doneComments = false;
    var doneContent = false;
    var lines = text.split(/\n/);
    lines.forEach(function (line, i) {
        if (utils_1.RE.comment.test(line)) {
            if (doneComments)
                throw new utils_1.DetectorError("Illegal CoNLL-U: misplaced comment", text, options);
        }
        else {
            doneComments = true;
            if (line) {
                if (!tokenLine.test(line))
                    throw new utils_1.DetectorError("Illegal CoNLL-U: unmatched line", text, options);
                if (doneContent)
                    throw new utils_1.DetectorError("Illegal CoNLL-U: misplaced whitespace", text, options);
            }
            else {
                if (!options.allowTrailingWhitespace)
                    throw new utils_1.DetectorError("Illegal CoNLL-U: contains trailing whitespace", text, options);
                doneContent = true;
            }
        }
    });
    return "CoNLL-U";
}
exports.default = default_1;
;
//# sourceMappingURL=detector.js.map