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
        allowLeadingWhitespace: true,
        allowBookendWhitespace: true,
        allowTrailingWhitespace: true,
        allowNoDependencies: false,
    });
    if (!text && !options.allowEmptyString)
        throw new utils_1.DetectorError("Illegal SD: empty string", text, options);
    if (utils_1.isJSONSerializable(text))
        throw new utils_1.DetectorError("Illegal SD: JSON object", text, options);
    var dependencyRegex = options.allowBookendWhitespace
        ? utils_1.RE.sdDependency
        : utils_1.RE.sdDependencyNoWhitespace;
    var parsingDeps = false;
    var parsingWhitespace = false;
    var parsedDeps = 0;
    var lines = text.split(/\n/);
    lines.forEach(function (line, i) {
        if (utils_1.RE.whiteline.test(line)) {
            if (parsingDeps) {
                if (!options.allowTrailingWhitespace)
                    throw new utils_1.DetectorError("Illegal SD: contains trailing whitespace", text, options);
            }
            else {
                if (!options.allowLeadingWhitespace)
                    throw new utils_1.DetectorError("Illegal SD: contains leading whitespace", text, options);
            }
        }
        if (utils_1.RE.comment.test(line)) {
        }
        else if (!parsingDeps) {
            if (dependencyRegex.test(line))
                throw new utils_1.DetectorError("Illegal SD: missing text line", text, options);
            parsingDeps = true;
        }
        else if (!dependencyRegex.test(line)) {
            throw new utils_1.DetectorError("Illegal SD: expected dependency line", text, options);
        }
        else {
            parsedDeps += 1;
        }
    });
    if (parsedDeps === 0 && !options.allowNoDependencies)
        throw new utils_1.DetectorError("Illegal SD: contains no dependencies", text, options);
    return "SD";
}
exports.default = default_1;
;
//# sourceMappingURL=detector.js.map