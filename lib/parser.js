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
exports.parseAs = void 0;
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
exports.parseAs = {
    "apertium stream": apertium_stream_1.parse,
    apertiumStream: apertium_stream_1.parse,
    Brackets: brackets_1.parse,
    brackets: brackets_1.parse,
    CG3: cg3_1.parse,
    cg3: cg3_1.parse,
    "CoNLL-U": conllu_1.parse,
    conllu: conllu_1.parse,
    "notatrix serial": notatrix_serial_1.parse,
    notatrixSerial: notatrix_serial_1.parse,
    Params: params_1.parse,
    params: params_1.parse,
    "plain text": plain_text_1.parse,
    plainText: plain_text_1.parse,
    SD: sd_1.parse,
    sd: sd_1.parse,
};
function default_1(serial, options) {
    var text = JSON.stringify(serial);
    options = _.defaults(options, {
        suppressDetectorErrors: true,
        suppressParserErrors: true,
        returnAllPossibilities: true,
        requireOne: false,
    });
    var possibilities = utils_1.C.formats
        .map(function (format) {
        try {
            return exports.parseAs[format](serial, options);
        }
        catch (e) {
            if (e instanceof utils_1.ParserError && options.suppressParserErrors)
                return;
            throw e;
        }
    })
        .filter(utils_1.thin);
    if (!possibilities.length && !options.suppressDetectorErrors)
        throw new utils_1.ParserError("Unable to detect format", text, options);
    if (options.requireOne && possibilities.length > 1)
        throw new utils_1.ParserError("Unable to detect, ambiguous input", text, options);
    return options.returnAllPossibilities ? possibilities : possibilities[0];
}
exports.default = default_1;
//# sourceMappingURL=parser.js.map