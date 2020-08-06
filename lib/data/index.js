"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
var apertium_stream_1 = __importDefault(require("./apertium-stream"));
var brackets_1 = __importDefault(require("./brackets"));
var cg3_1 = __importDefault(require("./cg3"));
var conllu_1 = __importDefault(require("./conllu"));
var notatrix_serial_1 = __importDefault(require("./notatrix-serial"));
var params_1 = __importDefault(require("./params"));
var plain_text_1 = __importDefault(require("./plain-text"));
var sd_1 = __importDefault(require("./sd"));
var unknown_1 = __importDefault(require("./unknown"));
exports.data = {
    apertiumStream: apertium_stream_1.default,
    brackets: brackets_1.default,
    cg3: cg3_1.default,
    conllu: conllu_1.default,
    notatrixSerial: notatrix_serial_1.default,
    params: params_1.default,
    plainText: plain_text_1.default,
    sd: sd_1.default,
    unknown: unknown_1.default,
};
//# sourceMappingURL=index.js.map