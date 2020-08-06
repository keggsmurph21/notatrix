"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Sentence = void 0;
var _ = __importStar(require("underscore"));
var utils_1 = require("utils");
var parser_1 = __importDefault(require("../parser"));
var parser_2 = require("../parser");
var generator_1 = __importDefault(require("../generator"));
var base_class_1 = require("./base-class");
var comment_1 = require("./comment");
var base_token_1 = require("./base-token");
var token_1 = require("./token");
var root_token_1 = require("./root-token");
var analysis_1 = require("./analysis");
var sub_token_1 = require("./sub-token");
var Sentence = (function (_super) {
    __extends(Sentence, _super);
    function Sentence(serial, options) {
        var _this = _super.call(this, "Sentence") || this;
        _this._meta = {};
        _this.isParsed = false;
        _this.Error = null;
        _this.corpus = null;
        serial = serial || "";
        options = options || {};
        options = _.defaults(options, {
            interpretAs: null,
            addHeadOnModifyFailure: true,
            depsShowDeprel: true,
            showRootDeprel: true,
            enhanced: false,
            useTokenDeprel: true,
            autoAddPunct: true,
        });
        _this.input = serial.input == null ? serial : serial.input;
        var serialObj = {};
        try {
            if (options.interpretAs) {
                serialObj = parser_2.parseAs[options.interpretAs](serial, options);
            }
            else {
                var parsed = parser_1.default(serial, options);
                var serialObjs = void 0;
                if (parsed instanceof Array) {
                    serialObjs = parsed;
                }
                else {
                    serialObjs = [parsed];
                }
                if (serialObjs.length === 0) {
                    throw new utils_1.NxError("Unable to parse: unrecognized format", _this);
                }
                else if (serialObjs.length === 1) {
                    serialObj = serialObjs[0];
                }
                else {
                    throw new utils_1.NxError("Unable to parse: ambiguous format (" + serialObjs.join(", ") + ")", _this);
                }
                if (serial.isParsed === false)
                    throw new utils_1.NxError("Cannot parse explicitly unparsed serial");
            }
            _this.options = serialObj.options;
            _this.root = new root_token_1.RootToken(_this);
            _this.comments = serialObj.comments.map(function (com) { return new comment_1.Comment(_this, com); });
            _this.tokens = serialObj.tokens.map(function (tok) { return new token_1.Token(_this, tok); });
            _this.attach();
            _this.isParsed = true;
        }
        catch (e) {
            if ((e instanceof utils_1.NxError || e instanceof utils_1.ToolError)) {
                _this.options = serialObj.options || options;
                _this.comments = [];
                _this.tokens = [];
                _this.Error = e;
            }
            else {
                throw e;
            }
        }
        return _this;
    }
    Sentence.prototype.to = function (format, options) {
        return generator_1.default[format](this, options);
    };
    Sentence.prototype.serialize = function (master) {
        if (master === void 0) { master = {}; }
        return {
            meta: this._meta,
            input: this.input,
            isParsed: this.isParsed,
            options: utils_1.dedup(master, this.options),
            comments: this.isParsed ? this.comments.map(function (com) { return com.serialize(); }) : [],
            tokens: this.isParsed ? this.tokens.map(function (token) { return token.serialize(); }) : [],
        };
    };
    Sentence.prototype.iterate = function (callback) {
        for (var i = 0; i < this.tokens.length; i++) {
            var token = this.tokens[i];
            callback(token, i, null, null);
            for (var j = 0; j < token._analyses.length; j++) {
                for (var k = 0; k < token._analyses[j]._subTokens.length; k++) {
                    var subToken = token._analyses[j]._subTokens[k];
                    callback(subToken, i, j, k);
                }
            }
        }
    };
    Sentence.prototype.query = function (predicate) {
        var matches = [];
        this.iterate(function (token) {
            if (predicate(token))
                matches.push(token);
        });
        return matches;
    };
    Sentence.prototype.index = function () {
        var absolute = 0;
        var majorToken = null;
        var superToken = null;
        var empty = 0;
        var conllu = 0;
        var cg3 = 0;
        var cytoscape = -1;
        this.iterate(function (token, i, j, k) {
            token.indices.sup = i;
            token.indices.ana = j;
            token.indices.sub = k;
            token.indices.absolute = ++absolute;
            if (!token._analyses || !token._analyses.length)
                token.indices.cg3 = ++cg3;
            if (!token.isSuperToken && superToken && superToken.analysis === j)
                token.indices.cytoscape = ++cytoscape;
            if (token instanceof token_1.Token && token.subTokens.length === 0)
                token.indices.cytoscape = ++cytoscape;
            if (j === null || k === null) {
                if (!(token instanceof token_1.Token))
                    throw new utils_1.NxError("Invalid state ...");
                majorToken = token;
                if (superToken) {
                    superToken.token.indices.conllu =
                        superToken.start + "-" + superToken.stop;
                    superToken = null;
                }
                if (token.subTokens.length) {
                    superToken = {
                        token: token,
                        start: null,
                        stop: null,
                        analysis: token._i,
                    };
                }
                else {
                    if (token.isEmpty) {
                        empty += 1;
                    }
                    else {
                        empty = 0;
                        conllu += 1;
                    }
                    token.indices.conllu =
                        empty ? conllu + "." + empty : conllu.toString();
                }
            }
            else {
                if (majorToken._i === j) {
                    if (token.isEmpty) {
                        empty += 1;
                    }
                    else {
                        empty = 0;
                        conllu += 1;
                    }
                    token.indices.conllu =
                        empty ? conllu + "." + empty : conllu.toString();
                }
                if (superToken) {
                    if (superToken.start === null) {
                        superToken.start = empty ? conllu + "." + empty : conllu.toString();
                    }
                    else {
                        superToken.stop = empty ? conllu + "." + empty : conllu.toString();
                    }
                }
            }
        });
        if (superToken) {
            superToken.token.indices.conllu =
                superToken.start + "-" + superToken.stop;
            superToken = null;
        }
        this.size = absolute;
        return this;
    };
    Sentence.prototype.attach = function () {
        this.iterate(function (token) {
            (token._heads || []).forEach(function (dependency, i) {
                if (i)
                    token.sent.options.enhanced = true;
                if (dependency.index == "0") {
                    token.addHead(token.sent.root, "root");
                }
                else {
                    var query = token.sent.query(function (token) {
                        return token.indices.serial.toString() ===
                            dependency.index;
                    });
                    if (query.length !== 1) {
                        throw new utils_1.NxError("cannot locate token with serial index \"" + dependency.index + "\"");
                    }
                    token.addHead(query[0], dependency.deprel);
                }
            });
            delete token._heads;
        });
        return this.index();
    };
    Sentence.prototype.enhance = function () {
        this.options.enhanced = true;
        return this;
    };
    Sentence.prototype.unenhance = function () {
        this.options.enhanced = false;
        return this;
    };
    Sentence.prototype.getSuperToken = function (token) {
        var superToken = null;
        this.iterate(function (tok) {
            if (!tok._analyses)
                return;
            tok._analyses.forEach(function (ana) {
                if (!ana._subTokens)
                    return;
                ana._subTokens.forEach(function (sub) {
                    if (sub === token)
                        superToken = tok;
                });
            });
        });
        return superToken;
    };
    Sentence.prototype.merge = function (src, tar) {
        if (!(src instanceof base_token_1.BaseToken) || !(tar instanceof base_token_1.BaseToken))
            throw new utils_1.NxError("unable to merge: src and tar must both be tokens");
        if (src.isSuperToken || tar.isSuperToken)
            throw new utils_1.NxError("unable to merge: cannot merge superTokens");
        if (src.className === "SubToken" || tar.className === "SuperToken")
            throw new utils_1.NxError("unable to merge: cannot merge subTokens");
        if (Math.abs(tar.indices.absolute - src.indices.absolute) > 1)
            throw new utils_1.NxError("unable to merge: tokens too far apart");
        src.semicolon = src.semicolon || tar.semicolon;
        src.isEmpty = src.isEmpty || tar.isEmpty;
        src.form = (src.form || "") + (tar.form || "") || null;
        src.lemma = src.lemma || tar.lemma;
        src.upostag = src.upostag || tar.upostag;
        src.xpostag = src.xpostag || tar.xpostag;
        src._feats_inited = src._feats_inited || tar._feats_inited;
        src._feats = src._feats_inited ? (src._feats || []).concat(tar._feats || [])
            : undefined;
        src._misc_inited = src._misc_inited || tar._misc_inited;
        src._misc = src._misc_inited ? (src._misc || []).concat(tar._misc || [])
            : undefined;
        src.removeHead(tar);
        tar.removeHead(src);
        tar.mapDependents(function (dep) {
            dep.token.removeHead(tar);
            dep.token.addHead(src, dep.deprel);
        });
        tar.removeAllHeads();
        this.tokens.splice(tar.indices.sup, 1);
        return this.index();
    };
    Sentence.prototype.combine = function (src, tar) {
        if (!(src instanceof base_token_1.BaseToken) || !(tar instanceof base_token_1.BaseToken))
            throw new utils_1.NxError("unable to combine: src and tar must both be tokens");
        if (src.isSuperToken || tar.isSuperToken)
            throw new utils_1.NxError("unable to combine: cannot combine superTokens");
        if (src.className === "SubToken" || tar.className === "SuperToken")
            throw new utils_1.NxError("unable to combine: cannot combine subTokens");
        if (Math.abs(tar.indices.absolute - src.indices.absolute) > 1)
            throw new utils_1.NxError("unable to combine: tokens too far apart");
        var superToken = new token_1.Token(this, {});
        superToken._analyses = [new analysis_1.Analysis(this, { subTokens: [] })];
        superToken._i = 0;
        superToken.form = (src.form || "") + (tar.form || "") || null;
        var _src = new sub_token_1.SubToken(this, {});
        _src.semicolon = src.semicolon;
        _src.isEmpty = src.isEmpty;
        _src.form = src.form;
        _src.lemma = src.lemma;
        _src.upostag = src.upostag;
        _src.xpostag = src.xpostag;
        _src._feats_inited = src._feats_inited;
        _src._feats = _src._feats_inited ? src._feats.slice() : undefined;
        _src._misc_inited = src._misc_inited;
        _src._misc = _src._misc_inited ? src._misc.slice() : undefined;
        var _tar = new sub_token_1.SubToken(this, {});
        _tar.semicolon = tar.semicolon;
        _tar.isEmpty = tar.isEmpty;
        _tar.form = tar.form;
        _tar.lemma = tar.lemma;
        _tar.upostag = tar.upostag;
        _tar.xpostag = tar.xpostag;
        _tar._feats_inited = tar._feats_inited;
        _tar._feats = _tar._feats_inited ? tar._feats.slice() : undefined;
        _tar._misc_inited = tar._misc_inited;
        _tar._misc = _tar._misc_inited ? tar._misc.slice() : undefined;
        if (src.indices.absolute < tar.indices.absolute) {
            superToken.analysis._subTokens.push(_src, _tar);
        }
        else {
            superToken.analysis._subTokens.push(_tar, _src);
        }
        src.removeHead(tar);
        tar.removeHead(src);
        src.mapHeads(function (head) {
            src.removeHead(head.token);
            _src.addHead(head.token, head.deprel);
        });
        src.mapDependents(function (dep) {
            dep.token.removeHead(src);
            dep.token.addHead(_src, dep.deprel);
        });
        tar.mapHeads(function (head) {
            tar.removeHead(head.token);
            _tar.addHead(head.token, head.deprel);
        });
        tar.mapDependents(function (dep) {
            dep.token.removeHead(tar);
            dep.token.addHead(_tar, dep.deprel);
        });
        this.tokens[src.indices.sup] = superToken;
        this.tokens.splice(tar.indices.sup, 1);
        return this.index();
    };
    Sentence.prototype.split = function (src, splitAtIndexStr) {
        var _this = this;
        if (!(src instanceof base_token_1.BaseToken))
            throw new utils_1.NxError("unable to split: src must be a token");
        if (src.isSuperToken) {
            var tokens = src.subTokens.map(function (subToken) {
                var token = new token_1.Token(_this, {});
                token.semicolon = subToken.semicolon;
                token.isEmpty = subToken.isEmpty;
                token.form = subToken.form;
                token.lemma = subToken.lemma;
                token.upostag = subToken.upostag;
                token.xpostag = subToken.xpostag;
                token._feats_inited = subToken._feats_inited;
                token._feats = (subToken._feats || []).slice();
                token._misc_inited = subToken._misc_inited;
                token._misc = (subToken._misc || []).slice();
                subToken.mapHeads(function (head) {
                    subToken.removeHead(head.token);
                    token.addHead(head.token, head.deprel);
                });
                subToken.mapDependents(function (dep) {
                    dep.token.removeHead(subToken);
                    dep.token.addHead(token, dep.deprel);
                });
                return token;
            });
            var index = src.indices.sup;
            this.tokens.splice(index, 1);
            this.tokens = this.tokens.slice(0, index).concat(tokens).concat(this.tokens.slice(index));
        }
        else if (src.className === "SubToken") {
            var splitAtIndex = parseInt(splitAtIndexStr);
            if (isNaN(splitAtIndex))
                throw new utils_1.NxError("unable to split: cannot split at index " + splitAtIndexStr);
            var subToken = new sub_token_1.SubToken(this, {});
            var beginning = (src.form || "").slice(0, splitAtIndex) || "_";
            var ending = (src.form || "").slice(splitAtIndex) || "_";
            src.form = beginning;
            subToken.form = ending;
            var superToken = this.getSuperToken(src);
            var subTokens = superToken._analyses[src.indices.ana]._subTokens;
            var index = src.indices.sub;
            superToken._analyses[src.indices.ana]._subTokens =
                subTokens.slice(0, index + 1)
                    .concat(subToken)
                    .concat(subTokens.slice(index + 1));
        }
        else {
            var splitAtIndex = parseInt(splitAtIndexStr);
            if (isNaN(splitAtIndex))
                throw new utils_1.NxError("unable to split: cannot split at index " + splitAtIndexStr);
            var token = new token_1.Token(this, {});
            var beginning = (src.form || "").slice(0, splitAtIndex) || "_";
            var ending = (src.form || "").slice(splitAtIndex) || "_";
            src.form = beginning;
            token.form = ending;
            var index = src.indices.sup;
            this.tokens = this.tokens.slice(0, index + 1)
                .concat(token)
                .concat(this.tokens.slice(index + 1));
        }
        return this.index();
    };
    return Sentence;
}(base_class_1.NxBaseClass));
exports.Sentence = Sentence;
//# sourceMappingURL=sentence.js.map