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
    options = _.defaults(options, {
        allowEmptyList: false,
        allowTrailingWhitespace: true,
        allowLeadingWhitespace: true
    });
    if (!utils_1.isJSONSerializable(rawObj))
        throw new utils_1.DetectorError("Illegal Params: not JSON object", rawObj.toString(), options);
    var objs = typeof rawObj === "string" ? JSON.parse(rawObj) : rawObj;
    if (Array.isArray(objs)) {
        if (!objs.length && !options.allowEmptyList)
            throw new utils_1.DetectorError("Illegal Params: contains no tokens", rawObj.toString(), options);
        objs.forEach(function (obj) {
            var omitted = Object.keys(_.omit(obj, utils_1.C.fields));
            if (omitted.length)
                throw new utils_1.DetectorError("Illegal Params: contains illegal keys (" + omitted.join(", ") + ")", rawObj.toString(), options);
            var picked = Object.keys(_.pick(obj, utils_1.C.fields));
            if (!picked.length)
                throw new utils_1.DetectorError("Illegal Params: missing required keys", rawObj.toString(), options);
        });
    }
    else {
        throw new utils_1.DetectorError("Illegal Params: expected array of parameters, got " + typeof objs, rawObj.toString(), options);
    }
    return "Params";
}
exports.default = default_1;
;
//# sourceMappingURL=detector.js.map