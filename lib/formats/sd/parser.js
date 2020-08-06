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
var detector_1 = __importDefault(require("./detector"));
var parser_1 = __importDefault(require("../plain-text/parser"));
function getTokenIndexFromString(tokens, token) {
    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].form.toLowerCase() === token.toLowerCase())
            return i;
    }
    return null;
}
function default_1(text, options) {
    options = _.defaults(options, {
        allowEmptyString: false,
        allowBookendWhitespace: true,
        allowWhiteLines: true,
    });
    try {
        detector_1.default(text, options);
    }
    catch (e) {
        if (e instanceof utils_1.DetectorError)
            throw new utils_1.ParserError(e.message, text, options);
        throw e;
    }
    var lines = text.split("\n");
    var depRegex = options.allowBookendWhitespace ? utils_1.RE.sdDependencyNoWhitespace
        : utils_1.RE.sdDependency;
    var chunks = [];
    lines.forEach(function (line) {
        var whiteline = line.match(utils_1.RE.whiteline), comment = line.match(utils_1.RE.comment), dep = line.match(depRegex);
        if (whiteline) {
        }
        else if (comment) {
            chunks.push({ type: "comment", body: comment[2] });
        }
        else if (dep) {
            chunks.push({ type: "dependency", deprel: dep[1], head: dep[2], dep: dep[3] });
        }
        else {
            chunks.push({
                type: "text",
                body: line,
            });
        }
    });
    var tokens;
    var comments = [];
    var expecting = ["comment", "text"];
    chunks.forEach(function (chunk) {
        if (expecting.indexOf(chunk.type) === -1)
            throw new utils_1.ParserError("expecting " + expecting.join("|") + ", got " + chunk.type, text, options);
        if (chunk.type === "comment") {
            comments.push(chunk.body);
            expecting = ["comment", "text"];
        }
        else if (chunk.type === "text") {
            tokens = parser_1.default(chunk.body, {}).tokens;
            expecting = ["dependency"];
        }
        else if (chunk.type === "dependency") {
            var index = getTokenIndexFromString(tokens, chunk.dep);
            if (index === null)
                throw new utils_1.ParserError("unable to find token with form " + chunk.dep, text, options);
            tokens[index].heads = [{
                    index: getTokenIndexFromString(tokens, chunk.head).toString(),
                    deprel: chunk.deprel,
                }];
            expecting = ["dependency"];
        }
        else {
            throw new utils_1.ParserError("unrecognized chunk type: " + chunk.type, text, options);
        }
    });
    return {
        input: text,
        options: options,
        comments: comments,
        tokens: tokens,
    };
}
exports.default = default_1;
;
//# sourceMappingURL=parser.js.map