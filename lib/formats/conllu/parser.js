"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
function parseIndex(str) {
    var match = (str || "").match(utils_1.RE.conlluEmptyIndex);
    if (!match)
        return null;
    if (match[2]) {
        return {
            major: parseInt(match[1]),
            minor: parseInt(match[2].slice(1)),
        };
    }
    return {
        major: parseInt(match[1]),
        minor: null,
    };
}
function assertNext(supStr, subStr, text, options) {
    if (supStr === null)
        return;
    var sup = parseIndex(supStr);
    var sub = parseIndex(subStr);
    if (sub.minor === null) {
        if (sub.major - sup.major !== 1)
            throw new utils_1.ParserError("unexpected token index (at: " + sup.major + (sup.minor === null ? "" : "." + sup.minor) + ", got: " + sup.major + (sup.minor === null ? "" : "." + sup.minor) + ")", text, options);
    }
    else if (sup.minor === null) {
        if (sub.minor !== 1)
            throw new utils_1.ParserError("unexpected token index (at: " + sup.major + (sup.minor === null ? "" : "." + sup.minor) + ", got: " + sup.major + (sup.minor === null ? "" : "." + sup.minor) + ")", text, options);
    }
    else {
        if (sub.minor - sup.minor !== 1)
            throw new utils_1.ParserError("unexpected token index (at: " + sup.major + (sup.minor === null ? "" : "." + sup.minor) + ", got: " + sup.major + (sup.minor === null ? "" : "." + sup.minor) + ")", text, options);
    }
}
function getHeads(isEmpty, head, deprel, deps) {
    head = utils_1.RE.fallback.test(head) ? null : head;
    deprel = utils_1.RE.fallback.test(deprel) ? null : deprel;
    deps = utils_1.RE.fallback.test(deps) ? null : deps;
    var heads = [];
    var seen = new Set();
    if (head && !isEmpty) {
        heads.push({
            index: head,
            deprel: deprel || null,
        });
        seen.add(head);
    }
    if (deps) {
        deps.split("|").forEach(function (subDep) {
            var subDeps = subDep.split(":");
            if (!seen.has(subDeps[0]))
                heads.push({
                    index: subDeps[0],
                    deprel: subDeps[1] || null,
                });
            seen.add(subDeps[0]);
        });
    }
    else if (isEmpty) {
    }
    return heads.length ? heads : null;
}
function default_1(text, options) {
    options = _.defaults(options, {
        allowEmptyString: false,
        requireTenParams: false,
        allowWhiteLines: true,
        enhanced: false,
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
    var lines = text.split("\n");
    var tokenRegex = options.requireTenParams ? utils_1.RE.conlluTokenLineTenParams
        : utils_1.RE.conlluTokenLine;
    lines.forEach(function (line) {
        var whiteline = line.match(utils_1.RE.whiteline);
        var comment = line.match(utils_1.RE.comment);
        var tokenLine = line.match(tokenRegex);
        if (whiteline) {
        }
        else if (comment) {
            chunks.push({ type: "comment", body: comment[2] });
        }
        else if (tokenLine) {
            var token = void 0;
            var fields = void 0;
            var fieldStr = tokenLine[7];
            if (/(\t|[ ]{2,})/g.test(fieldStr)) {
                fields = fieldStr.replace(/[ ]{2,}/g, "\t").split(/\t/g).filter(utils_1.thin);
            }
            else {
                fields = fieldStr.split(/[\t ]+/g).filter(utils_1.thin);
            }
            if (tokenLine[4]) {
                token = {
                    type: "super-token",
                    index: tokenLine[1],
                    startIndex: tokenLine[2],
                    stopIndex: tokenLine[5],
                    form: utils_1.RE.fallback.test(fields[0]) ? null : fields[0],
                    misc: utils_1.RE.fallback.test(fields[8]) ? null : fields[8].split("|"),
                };
            }
            else {
                var isEmpty = !!tokenLine[3];
                if (isEmpty) {
                    options.enhanced = true;
                }
                token = {
                    type: "token",
                    index: tokenLine[1],
                    isEmpty: isEmpty,
                    form: !fields[0] || utils_1.RE.fallback.test(fields[0]) ? null : fields[0],
                    lemma: !fields[1] || utils_1.RE.fallback.test(fields[1]) ? null : fields[1],
                    upostag: !fields[2] || utils_1.RE.fallback.test(fields[2]) ? null : fields[2],
                    xpostag: !fields[3] || utils_1.RE.fallback.test(fields[3]) ? null : fields[3],
                    feats: !fields[4] || utils_1.RE.fallback.test(fields[4])
                        ? null
                        : fields[4].split("|"),
                    heads: getHeads(isEmpty, fields[5], fields[6], fields[7]),
                    misc: !fields[8] || utils_1.RE.fallback.test(fields[8])
                        ? null
                        : fields[8].split("|"),
                };
            }
            chunks.push(token);
        }
        else {
            throw new utils_1.ParserError("unable to match line: " + line, text, options);
        }
    });
    var tokens = [];
    var comments = [];
    var expecting = ["comment", "super-token", "token"];
    var superToken = null;
    chunks.filter(utils_1.thin).forEach(function (chunk) {
        if (expecting.indexOf(chunk.type) === -1)
            throw new utils_1.ParserError("expecting " + expecting.join("|") + ", got " + chunk.type, text, options);
        if (chunk.type === "comment") {
            comments.push(chunk.body);
            expecting = ["comment", "super-token", "token"];
        }
        else if (chunk.type === "super-token") {
            superToken = {
                form: chunk.form,
                misc: chunk.misc,
                analyses: [{ subTokens: [] }],
                index: chunk.index,
                currentIndex: null,
                stopIndex: chunk.stopIndex
            };
            expecting = ["token"];
        }
        else if (chunk.type === "token") {
            if (superToken) {
                assertNext(superToken.currentIndex, chunk.index, text, options);
                superToken.currentIndex = chunk.index;
                superToken.analyses[0].subTokens.push(_.omit(chunk, ["type"]));
                if (superToken.currentIndex === superToken.stopIndex) {
                    tokens.push(_.omit(superToken, ["currentIndex", "stopIndex"]));
                    superToken = null;
                    expecting = ["super-token", "token"];
                }
                else {
                    expecting = ["token"];
                }
            }
            else {
                tokens.push(_.omit(chunk, ["type"]));
                expecting = ["super-token", "token"];
            }
        }
        else {
            throw new utils_1.ParserError("unrecognized chunk type: " + chunk.type, text, options);
        }
    });
    var tokenIndex = 0;
    return {
        input: text,
        options: options,
        comments: comments,
        tokens: tokens.map(function (token) {
            return __assign(__assign({}, token), { index: ++tokenIndex, analyses: token.analyses.map(function (analysis) {
                    return __assign(__assign({}, analysis), { subTokens: analysis.subTokens.map(function (subToken) {
                            return __assign(__assign({}, subToken), { index: ++tokenIndex });
                        }) });
                }) });
        }),
    };
}
exports.default = default_1;
;
//# sourceMappingURL=parser.js.map