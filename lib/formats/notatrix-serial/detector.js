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
function default_1(rawObj, options) {
    function restrict(obj, fields, allowUndefined) {
        if (allowUndefined === void 0) { allowUndefined = false; }
        if (obj === undefined)
            throw new utils_1.DetectorError("Illegal notatrix serial: missing field", obj, options);
        if (_.omit(obj, Object.keys(fields)).length)
            throw new utils_1.DetectorError("Illegal notatrix serial: unexpected field", obj, options);
        _.each(fields, function (fieldType, fieldName) {
            var value = obj[fieldName];
            switch (fieldType) {
                case ("number"):
                    if (value !== undefined || !allowUndefined)
                        if (isNaN(parseFloat(value)))
                            throw new utils_1.DetectorError("Illegal notatrix serial: could not parse " + value + " as float", obj, options);
                    break;
                case ("string"):
                    if (value !== undefined || !allowUndefined)
                        if (typeof value !== "string")
                            throw new utils_1.DetectorError("Illegal notatrix serial: expected 'string', got " + typeof value, obj, options);
                    break;
                case ("string*"):
                    if (value !== undefined || !allowUndefined)
                        if (value !== null && typeof value !== "string")
                            throw new utils_1.DetectorError("Illegal notatrix serial: expected 'string', got " + typeof value, obj, options);
                    break;
                case ("object"):
                    break;
                case ("array"):
                    if (value != undefined || !allowUndefined)
                        if (!Array.isArray(value))
                            throw new utils_1.DetectorError("Illegal notatrix serial: expected Array, got " + typeof value, obj, options);
                    break;
            }
        });
    }
    options = _.defaults(options, {
        allowZeroTokens: true,
        allowZeroFields: true,
    });
    if (!utils_1.isJSONSerializable(rawObj)) {
        throw new utils_1.DetectorError("Illegal notatrix serial: not JSON object", rawObj.toString(), options);
    }
    var obj = typeof rawObj === "string" ? JSON.parse(rawObj) : rawObj;
    restrict(obj, utils_1.C.nxSentenceFields);
    _.each(obj.comments, function (comment) {
        if (typeof comment !== "string")
            throw new utils_1.DetectorError("Illegal notatrix serial: comments should be strings", rawObj.toString(), options);
    });
    _.each(obj.tokens, function (token) { restrict(token, utils_1.C.nxSentenceTokensFields, true); });
    if (obj.tokens.length === 0 && !options.allowZeroTokens)
        throw new utils_1.DetectorError("Illegal notatrix serial: cannot have empty token list", rawObj.toString(), options);
    _.each(obj.tokens, function (token) {
        if (Object.keys(token).length === 0 && !options.allowZeroFields)
            throw new utils_1.DetectorError("Illegal notatrix serial: cannot have token without fields", rawObj.toString(), options);
        if (token.analyses)
            _.each(token.analyses, function (analysis) {
                var analysisKeys = Object.keys(analysis);
                if (analysisKeys.length !== 1 || analysisKeys[0] !== "subTokens")
                    throw new utils_1.DetectorError("Illegal notatrix serial: got unexpected analyses field", rawObj.toString(), options);
                _.each(analysis.subTokens, function (subToken) {
                    restrict(subToken, utils_1.C.nxSentenceTokensFields, true);
                    if (subToken.analyses !== undefined)
                        throw new utils_1.DetectorError("Illegal notatrix serial: subTokens can only have one analysis", rawObj.toString(), options);
                });
            });
    });
    return "notatrix serial";
}
exports.default = default_1;
;
//# sourceMappingURL=detector.js.map