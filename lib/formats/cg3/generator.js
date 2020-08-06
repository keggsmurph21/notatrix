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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("underscore"));
var utils_1 = require("utils");
var get_loss_1 = __importDefault(require("./get-loss"));
function isSet(field) {
    return field && field !== utils_1.C.fallback ? field : null;
}
function default_1(sent, options) {
    if (!sent.isParsed)
        return {
            output: null,
            loss: undefined,
        };
    if (!sent || sent.className !== "Sentence")
        throw new utils_1.GeneratorError("Unable to generate, input not a Sentence", sent, options);
    options = _.defaults(options, sent.options, {
        omitIndices: false,
        allowMissingLemma: true,
    });
    sent.index();
    var lines = [];
    sent.comments.forEach(function (comment) { return lines.push("# " + comment.body); });
    sent.tokens.forEach(function (token) {
        function push(token, indent) {
            if (!token.lemma && !options.allowMissingLemma)
                throw new utils_1.GeneratorError("Unable to generate, token has no lemma", sent, options);
            var head = token.heads.first;
            var dependency = options.omitIndices
                ? null
                : "#" + token.indices.cg3 + "->" +
                    (head == undefined ? "" : head.token.indices.cg3);
            var line = ["\"" + (isSet(token.lemma) || isSet(token.form) || utils_1.C.fallback) + "\""]
                .concat(isSet(token.xpostag) || isSet(token.upostag))
                .concat((token._feats || []).join(" "))
                .concat((token._misc || []).join(" "))
                .concat(head && isSet(head.deprel) ? "@" + head.deprel : null)
                .concat(dependency);
            var indentStr = (token.semicolon ? ";" : "") + "\t".repeat(indent);
            lines.push(indentStr + line.filter(utils_1.thin).join(" "));
        }
        ;
        lines.push("\"<" + (token.form || utils_1.C.fallback) + ">\"");
        if (token._analyses && token._analyses.length) {
            token._analyses.forEach(function (analysis) {
                analysis.subTokens.forEach(function (subToken, i) { push(subToken, i + 1); });
            });
        }
        else {
            push(token, 1);
        }
    });
    return {
        output: lines.join("\n"),
        loss: get_loss_1.default(sent),
    };
}
exports.default = default_1;
;
//# sourceMappingURL=generator.js.map