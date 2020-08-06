"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitAs = void 0;
var detector_1 = __importDefault(require("./detector"));
var default_splitter_1 = __importDefault(require("./formats/default-splitter"));
var apertium_stream_1 = require("./formats/apertium-stream");
var brackets_1 = require("./formats/brackets");
var cg3_1 = require("./formats/cg3");
var conllu_1 = require("./formats/conllu");
var notatrix_serial_1 = require("./formats/notatrix-serial");
var params_1 = require("./formats/params");
var plain_text_1 = require("./formats/plain-text");
var sd_1 = require("./formats/sd");
exports.splitAs = {
    "apertium stream": apertium_stream_1.split,
    apertiumStream: apertium_stream_1.split,
    Brackets: brackets_1.split,
    brackets: brackets_1.split,
    CG3: cg3_1.split,
    cg3: cg3_1.split,
    "CoNLL-U": conllu_1.split,
    conllu: conllu_1.split,
    "notatrix serial": notatrix_serial_1.split,
    notatrixSerial: notatrix_serial_1.split,
    Params: params_1.split,
    params: params_1.split,
    "plain text": plain_text_1.split,
    plainText: plain_text_1.split,
    SD: sd_1.split,
    sd: sd_1.split,
};
function default_1(text, options) {
    var fromDefault = new Set();
    var splitAsDefault = default_splitter_1.default(text, options);
    splitAsDefault.forEach(function (line) {
        var formats = detector_1.default(line, options);
        if (formats instanceof Array)
            formats.forEach(function (format) { return fromDefault.add(format); });
        else
            fromDefault.add(formats);
    });
    var fromPlainText = new Set();
    var splitAsPlainText = exports.splitAs.plainText(text, options);
    splitAsPlainText.forEach(function (line) {
        var formats = detector_1.default(line, options);
        if (formats instanceof Array)
            formats.forEach(function (format) { return fromPlainText.add(format); });
        else
            fromPlainText.add(formats);
    });
    if (fromDefault.size !== 1 && fromPlainText.size === 1 &&
        fromPlainText.has("plain text")) {
        return splitAsPlainText;
    }
    return splitAsDefault;
}
exports.default = default_1;
//# sourceMappingURL=splitter.js.map