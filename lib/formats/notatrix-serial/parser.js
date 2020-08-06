"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("utils");
var detector_1 = __importDefault(require("./detector"));
function default_1(rawObj, options) {
    try {
        detector_1.default(rawObj, options);
    }
    catch (e) {
        if (e instanceof utils_1.DetectorError)
            throw new utils_1.ParserError(e.message, rawObj.toString(), options);
        throw e;
    }
    if (typeof rawObj == "string") {
        return JSON.parse(rawObj);
    }
    return rawObj;
}
exports.default = default_1;
;
//# sourceMappingURL=parser.js.map