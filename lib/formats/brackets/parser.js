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
var _ = __importStar(require("underscore"));
var utils_1 = require("utils");
var detector_1 = __importDefault(require("./detector"));
var Parented = (function () {
    function Parented() {
        this.parent = null;
        this.num = 0;
    }
    return Parented;
}());
var Sentence = (function (_super) {
    __extends(Sentence, _super);
    function Sentence(input, options) {
        var _this = _super.call(this) || this;
        _this.input = input;
        _this.options = options;
        _this.root = null;
        _this.comments = [];
        return _this;
    }
    Sentence.prototype.serialize = function () {
        this.root.index(0);
        return {
            input: this.input,
            options: this.options,
            comments: this.comments,
            tokens: this.root.serialize([])
        };
    };
    Sentence.prototype.push = function (token) { this.root = token; };
    return Sentence;
}(Parented));
var Token = (function (_super) {
    __extends(Token, _super);
    function Token() {
        var _this = _super.call(this) || this;
        _this.deprel = null;
        _this.before = [];
        _this.words = [];
        _this.after = [];
        return _this;
    }
    Token.prototype.eachBefore = function (callback) {
        for (var i = 0; i < this.before.length; i++) {
            callback(this.before[i], i);
        }
    };
    Token.prototype.eachAfter = function (callback) {
        for (var i = 0; i < this.after.length; i++) {
            callback(this.after[i], i);
        }
    };
    Token.prototype.index = function (num) {
        this.eachBefore(function (before) { num = before.index(num); });
        this.num = ++num;
        this.eachAfter(function (after) { num = after.index(num); });
        return num;
    };
    Token.prototype.serialize = function (tokens) {
        this.eachBefore(function (before) { before.serialize(tokens); });
        tokens.push({
            form: this.form,
            heads: [{
                    index: (this.parent.num || 0).toString(),
                    deprel: this.deprel,
                }],
            index: this.num,
        });
        this.eachAfter(function (after) { after.serialize(tokens); });
        return tokens;
    };
    Object.defineProperty(Token.prototype, "form", {
        get: function () { return this.words.join("_"); },
        enumerable: false,
        configurable: true
    });
    Token.prototype.push = function (token) {
        if (this.words.length) {
            this.after.push(token);
        }
        else {
            this.before.push(token);
        }
    };
    Token.prototype.addWord = function (word) {
        if (!word)
            return;
        if (this.deprel) {
            this.words.push(word);
        }
        else {
            this.deprel = word;
        }
    };
    return Token;
}(Parented));
function default_1(text, options) {
    options = _.defaults(options, {
        allowEmptyString: false,
    });
    try {
        detector_1.default(text, options);
    }
    catch (e) {
        if (e instanceof utils_1.DetectorError)
            throw new utils_1.ParserError(e.message, text, options);
        throw e;
    }
    var sent = new Sentence(text, options);
    var parsing = sent;
    var parent = null;
    var word = "";
    _.each(text, function (char) {
        switch (char) {
            case ("["):
                parent = parsing;
                parsing = new Token();
                parsing.parent = parent;
                if (parent && parent.push)
                    parent.push(parsing);
                word = "";
                break;
            case ("]"):
                if (parsing instanceof Token)
                    parsing.addWord(word);
                parsing = parsing.parent;
                parent = parsing.parent;
                word = "";
                break;
            case (" "):
                if (parsing instanceof Token)
                    parsing.addWord(word);
                word = "";
                break;
            default:
                word += char;
                break;
        }
    });
    return sent.serialize();
}
exports.default = default_1;
//# sourceMappingURL=parser.js.map