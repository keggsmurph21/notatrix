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
function count(str, reg) {
    return str.match(reg).length;
}
function getIndentNum(text, str, options) {
    if (options.indentString) {
        var regex = options.indentString instanceof RegExp
            ? options.indentString
            : new RegExp(options.indentString, "g");
        return count(str, regex);
    }
    else if (options.useTabIndent) {
        return count(str, /\t/g);
    }
    else if (options.spacesPerTab) {
        var regex = new RegExp(" {" + options.spacesPerTab + "}", "g");
        return count(str, regex);
    }
    else if (options.equalizeWhitespace) {
        return count(str, /\s/g);
    }
    else {
        throw new utils_1.ParserError("can't get the indent number, insufficient options set", text, options);
    }
}
function default_1(text, options) {
    options = _.defaults(options, {
        allowEmptyString: false,
        indentString: null,
        useTabIndent: false,
        spacesPerTab: null,
        equalizeWhitespace: true,
        coerceMultipleSpacesAfterSemicolonToTab: true,
        allowMissingIndices: true,
    });
    try {
        detector_1.default(text, options);
    }
    catch (e) {
        if (e instanceof utils_1.DetectorError)
            throw new utils_1.ParserError(e.message, text, options);
        throw e;
    }
    var i = 0;
    var chunks = [];
    var _loop_1 = function () {
        var remains = text.slice(i);
        var whiteline = remains.match(utils_1.RE.whiteline);
        var comment = remains.match(utils_1.RE.comment);
        var tokenStart = remains.match(utils_1.RE.cg3TokenStart);
        var tokenContent = remains.match(utils_1.RE.cg3TokenContent);
        if (whiteline) {
            i += whiteline[0].length;
        }
        else if (comment) {
            chunks.push({ type: "comment", body: comment[2] });
            i += comment[1].length;
        }
        else if (tokenStart) {
            chunks.push({ type: "form", form: tokenStart[1] });
            i += tokenStart[0].length;
            while (utils_1.RE.whitespace.test(text[i]) && text[i] !== "\n")
                i++;
            i++;
        }
        else if (tokenContent) {
            var indent = options.coerceMultipleSpacesAfterSemicolonToTab
                ? !!tokenContent[1]
                    ? tokenContent[2].replace(/ +/, "\t")
                    : tokenContent[2]
                : tokenContent[2];
            var chunk_1 = {
                type: "content",
                semicolon: !!tokenContent[1],
                indent: getIndentNum(text, indent, options),
                lemma: tokenContent[3],
                misc: [],
                heads: [],
            };
            var deprel_1 = tokenContent[5].match(utils_1.RE.cg3Deprel);
            tokenContent[5].split(/\s+/).filter(utils_1.thin).forEach(function (subChunk) {
                var dependency = subChunk.match(utils_1.RE.cg3Dependency);
                var heads = subChunk.match(utils_1.RE.cg3Head);
                var index = subChunk.match(utils_1.RE.cg3Index);
                var misc = subChunk.match(utils_1.RE.cg3Other);
                if (dependency && (heads || index)) {
                    if (heads) {
                        if (chunk_1.heads)
                            throw new utils_1.ParserError("unexpected subChunk, heads already set", text, options);
                        var head = parseInt(heads[1]);
                        if (!isNaN(head))
                            chunk_1.heads = [{
                                    index: head.toString(),
                                    deprel: deprel_1 && deprel_1[1] ? deprel_1[1] : null,
                                }];
                    }
                    else if (index) {
                        if (chunk_1.index)
                            throw new utils_1.ParserError("unexpected subChunk, index already set", text, options);
                        chunk_1.index = parseInt(index[1]);
                    }
                }
                else if (misc) {
                    if (!misc[0].startsWith("@"))
                        chunk_1.misc.push(misc[0]);
                }
            });
            if (deprel_1 && deprel_1[1] && !chunk_1.heads)
                chunk_1.misc.push("@" + deprel_1[1]);
            chunks.push(chunk_1);
            i += tokenContent[0].length;
        }
        else {
            throw new utils_1.ParserError("unable to match remains: " + remains, text, options);
        }
    };
    while (i < text.length) {
        _loop_1();
    }
    var tokens = [];
    var comments = [];
    var expecting = ["comment", "form"];
    var token = null;
    var analysis = null;
    var missingIndices = false;
    chunks.forEach(function (chunk) {
        if (expecting.indexOf(chunk.type) === -1)
            throw new utils_1.ParserError("expecting " + expecting.join("|") + ", got " + chunk.type, text, options);
        if (chunk.type === "comment") {
            comments.push(chunk.body);
            expecting = ["comment", "form"];
            token = null;
            analysis = null;
        }
        else if (chunk.type === "form") {
            if (analysis)
                token.analyses.push(analysis);
            if (token) {
                if (token.analyses.length === 1 &&
                    token.analyses[0].subTokens.length === 1)
                    token = _.omit(_.extend(token, token.analyses[0].subTokens[0]), "analyses");
                tokens.push(_.omit(token, "currentIndent"));
            }
            token = {
                form: chunk.form,
                currentIndent: 0,
                analyses: [],
                index: -1,
            };
            analysis = null;
            expecting = ["content"];
        }
        else if (chunk.type === "content") {
            if (!token)
                throw new utils_1.ParserError("cannot parse content chunk without a token", text, options);
            if (chunk.indent > token.currentIndent + 1)
                throw new utils_1.ParserError("invalid indent change (" + token.currentIndent + "=>" + chunk.indent + ")", text, options);
            if (chunk.indent === 1) {
                if (analysis)
                    token.analyses.push(analysis);
                if (chunk.index === undefined) {
                    if (!options.allowMissingIndices)
                        throw new utils_1.ParserError("cannot parse token without index", text, options);
                    missingIndices = true;
                }
                else {
                    if (missingIndices)
                        throw new utils_1.ParserError("cannot parse partially indexed CG3", text, options);
                }
                analysis = {
                    subTokens: [{
                            semicolon: chunk.semicolon,
                            lemma: chunk.lemma || null,
                            heads: chunk.heads || null,
                            index: chunk.index || null,
                            xpostag: chunk.misc.shift() || null,
                            misc: chunk.misc || null,
                        }]
                };
            }
            else {
                if (!analysis)
                    throw new utils_1.ParserError("cannot parse content chunk without an analysis", text, options);
                if (chunk.index === undefined && !options.allowMissingIndices)
                    throw new utils_1.ParserError("cannot parse token without index", text, options);
                analysis.subTokens.push({
                    semicolon: chunk.semicolon,
                    lemma: chunk.lemma || null,
                    heads: chunk.heads || null,
                    index: chunk.index || null,
                    xpostag: chunk.misc.shift() || null,
                    misc: chunk.misc || null,
                });
            }
            token.currentIndent = chunk.indent;
            expecting = ["content", "form"];
        }
        else {
            throw new utils_1.ParserError("unrecognized chunk type: " + chunk.type, text, options);
        }
    });
    if (analysis)
        token.analyses.push(analysis);
    if (token) {
        if (token.analyses.length === 1 && token.analyses[0].subTokens.length === 1)
            token =
                _.omit(_.extend(token, token.analyses[0].subTokens[0]), "analyses");
        tokens.push(_.omit(token, "currentIndent"));
    }
    if (missingIndices) {
        var index_1 = 0;
        tokens.forEach(function (token) {
            if (token.analyses) {
                token.analyses.forEach(function (analysis) {
                    analysis.subTokens.forEach(function (subToken) { subToken.index = ++index_1; });
                });
            }
            else {
                token.index = ++index_1;
            }
        });
    }
    return {
        input: text,
        options: options,
        comments: comments,
        tokens: tokens,
    };
}
exports.default = default_1;
//# sourceMappingURL=parser.js.map