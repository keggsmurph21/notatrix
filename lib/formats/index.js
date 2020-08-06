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
exports.formats = void 0;
var apertiumStream = __importStar(require("./apertium-stream"));
var brackets = __importStar(require("./brackets"));
var cg3 = __importStar(require("./cg3"));
var conllu = __importStar(require("./conllu"));
var notatrixSerial = __importStar(require("./notatrix-serial"));
var params = __importStar(require("./params"));
var plainText = __importStar(require("./plain-text"));
var sd = __importStar(require("./sd"));
exports.formats = {
    "apertium stream": apertiumStream,
    apertiumStream: apertiumStream,
    Brackets: brackets,
    brackets: brackets,
    CG3: cg3,
    cg3: cg3,
    "CoNLL-U": conllu,
    conllu: conllu,
    "notatrix serial": notatrixSerial,
    notatrixSerial: notatrixSerial,
    Params: params,
    params: params,
    "plain text": plainText,
    plainText: plainText,
    SD: sd,
    sd: sd,
};
//# sourceMappingURL=index.js.map