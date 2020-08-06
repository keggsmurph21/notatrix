"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.as = void 0;
var apertium_stream_1 = require("formats/apertium-stream");
var brackets_1 = require("formats/brackets");
var cg3_1 = require("formats/cg3");
var conllu_1 = require("formats/conllu");
var notatrix_serial_1 = require("formats/notatrix-serial");
var params_1 = require("formats/params");
var plain_text_1 = require("formats/plain-text");
var sd_1 = require("formats/sd");
exports.as = {
    "apertium stream": apertium_stream_1.generate,
    apertiumStream: apertium_stream_1.generate,
    Brackets: brackets_1.generate,
    brackets: brackets_1.generate,
    CG3: cg3_1.generate,
    cg3: cg3_1.generate,
    "CoNLL-U": conllu_1.generate,
    conllu: conllu_1.generate,
    "notatrix serial": notatrix_serial_1.generate,
    notatrixSerial: notatrix_serial_1.generate,
    Params: params_1.generate,
    params: params_1.generate,
    "plain text": plain_text_1.generate,
    plainText: plain_text_1.generate,
    SD: sd_1.generate,
    sd: sd_1.generate,
};
exports.default = exports.as;
//# sourceMappingURL=generator.js.map