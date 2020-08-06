"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexConstant = exports.fallback = exports.nxAllOptions = exports.nxSentenceTokensFields = exports.nxSentenceFields = exports.formats = exports.fields = void 0;
exports.fields = [
    "index", "form", "lemma", "upostag", "xpostag", "feats", "head", "deprel",
    "deps", "misc"
];
exports.formats = [
    "Brackets", "CG3", "CoNLL-U", "notatrix serial", "Params", "plain text", "SD"
];
exports.nxSentenceFields = {
    input: "string",
    options: "object",
    comments: "array",
    tokens: "array",
};
exports.nxSentenceTokensFields = {
    semicolon: "boolean",
    isEmpty: "boolean",
    index: "number",
    form: "string*",
    lemma: "string*",
    upostag: "string*",
    xpostag: "string*",
    feats: "array",
    heads: "array",
    analyses: "array",
};
exports.nxAllOptions = {};
exports.fallback = "_";
exports.hexConstant = 16777215;
//# sourceMappingURL=constants.js.map