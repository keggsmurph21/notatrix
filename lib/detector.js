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
exports.as = void 0;
var _ = __importStar(require("underscore"));
var utils_1 = require("utils");
var apertium_stream_1 = require("formats/apertium-stream");
var brackets_1 = require("formats/brackets");
var cg3_1 = require("formats/cg3");
var conllu_1 = require("formats/conllu");
var notatrix_serial_1 = require("formats/notatrix-serial");
var params_1 = require("formats/params");
var plain_text_1 = require("formats/plain-text");
var sd_1 = require("formats/sd");
exports.as = {
    "apertium stream": apertium_stream_1.detect,
    apertiumStream: apertium_stream_1.detect,
    Brackets: brackets_1.detect,
    brackets: brackets_1.detect,
    CG3: cg3_1.detect,
    cg3: cg3_1.detect,
    "CoNLL-U": conllu_1.detect,
    conllu: conllu_1.detect,
    "notatrix serial": notatrix_serial_1.detect,
    notatrixSerial: notatrix_serial_1.detect,
    Params: params_1.detect,
    params: params_1.detect,
    "plain text": plain_text_1.detect,
    plainText: plain_text_1.detect,
    SD: sd_1.detect,
    sd: sd_1.detect,
};
function default_1(text, options) {
    options = _.defaults(options, {
        suppressDetectorErrors: true,
        returnAllMatches: true,
        requireOneMatch: false,
    });
    var matches = utils_1.C.formats
        .map(function (format) {
        try {
            return exports.as[format](text, options);
        }
        catch (e) {
            if (e instanceof utils_1.DetectorError)
                return;
            throw e;
        }
    })
        .filter(utils_1.thin);
    if (!matches.length && !options.suppressDetectorErrors)
        throw new utils_1.DetectorError("Unable to detect format", text, options);
    if (matches.length > 1 && !options.suppressDetectorErrors &&
        options.requireOneMatch)
        throw new utils_1.DetectorError("Detected multiple formats", text, options);
    return options.returnAllMatches ? matches : matches[0];
}
exports.default = default_1;
//# sourceMappingURL=detector.js.map