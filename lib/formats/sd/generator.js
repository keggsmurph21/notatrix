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
var generator_1 = __importDefault(require("../plain-text/generator"));
function default_1(sent, options) {
    if (!sent.isParsed)
        return {
            output: null,
            loss: undefined,
        };
    if (!sent || sent.className !== "Sentence")
        throw new utils_1.GeneratorError("Unable to generate, input not a Sentence", sent, options);
    options = _.defaults(options, sent.options, {});
    sent.index();
    var lines = [];
    sent.comments.forEach(function (comment) { lines.push("# " + comment.body); });
    lines.push(generator_1.default(sent, {}).output);
    [sent.root].concat(sent.tokens).forEach(function (token) {
        token.mapDependents(function (dependent) {
            lines.push((dependent.deprel || "_") + "(" + token.form + ", " + dependent.token.form + ")");
        });
    });
    return {
        output: lines.join("\n"),
        loss: get_loss_1.default(sent),
    };
}
exports.default = default_1;
;
//# sourceMappingURL=generator.js.map