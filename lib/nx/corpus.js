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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Corpus = void 0;
var _ = __importStar(require("underscore"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var uuid_1 = require("uuid");
var utils_1 = require("utils");
var splitter_1 = __importDefault(require("../splitter"));
var base_class_1 = require("./base-class");
var labeler_1 = require("./labeler");
var sentence_1 = require("./sentence");
var Corpus = (function (_super) {
    __extends(Corpus, _super);
    function Corpus(options) {
        var _this = _super.call(this, "Corpus") || this;
        _this.filename = null;
        _this.sources = [];
        _this._sentences = [];
        _this._index = -1;
        _this._meta = {};
        _this._filterIndex = -1;
        _this.treebank_id = uuid_1.v4();
        _this.options = _.defaults(options, {
            requireOne: true,
        });
        _this._labeler = new labeler_1.Labeler(_this);
        return _this;
    }
    Object.defineProperty(Corpus.prototype, "snapshot", {
        get: function () {
            return {
                filename: this.filename,
                sentences: this.length,
                errors: this.errors.length,
                labels: this._labeler.sort(),
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Corpus.prototype, "length", {
        get: function () { return this._sentences.length; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Corpus.prototype, "errors", {
        get: function () { return this._sentences.filter(function (sent) { return sent.isParsed; }); },
        enumerable: false,
        configurable: true
    });
    Corpus.prototype.serialize = function () {
        var _this = this;
        return {
            filename: this.filename,
            meta: this._meta,
            options: this.options,
            labeler: this._labeler.serialize(),
            sentences: this._sentences.map(function (sent) { return sent.serialize(_this.options); }),
            index: this._index,
        };
    };
    Corpus.deserialize = function (serial) {
        var corpus = new Corpus(serial.options);
        corpus.filename = serial.filename || null;
        corpus._meta = serial.meta;
        corpus._labeler = labeler_1.Labeler.deserialize(corpus, serial.labeler);
        corpus._sentences = serial.sentences.map(function (s) {
            var sent = new sentence_1.Sentence(s, _.defaults(s.options, serial.options));
            sent._meta = s.meta;
            Object.entries(corpus._labeler._labels).forEach(function (_a) {
                var _b = __read(_a, 2), name = _b[0], label = _b[1];
                if (corpus._labeler.sentenceHasLabel(sent, name))
                    label._sents.add(sent);
            });
            return sent;
        });
        corpus.index = serial.index;
        return corpus;
    };
    Object.defineProperty(Corpus.prototype, "sentence", {
        get: function () { return this.index < 0 ? null : this._sentences[this.index]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Corpus.prototype, "filtered", {
        get: function () {
            var _this = this;
            return this._labeler._filter.size
                ? this._sentences.filter(function (sent) { return _this._labeler.sentenceInFilter(sent); })
                : [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Corpus.prototype, "index", {
        get: function () { return this._index; },
        set: function (index) {
            var filtered = this.filtered, total = filtered.length || this.length;
            if (isNaN(index)) {
                index = filtered.length ? this._filterIndex : this.index;
            }
            else if (index < 0 && total) {
                index = 0;
            }
            else if (index > total - 1) {
                index = total - 1;
            }
            if (filtered.length) {
                this._filterIndex = index;
                this._index = filtered[index]._index;
            }
            else {
                this._filterIndex = -1;
                this._index = index;
            }
        },
        enumerable: false,
        configurable: true
    });
    Corpus.prototype.reindex = function () {
        this._sentences.forEach(function (sent, i) { sent._index = i; });
    };
    Corpus.prototype.first = function () {
        this.index = this.length ? 0 : -1;
        return this;
    };
    Corpus.prototype.prev = function () {
        if (!this.length)
            return null;
        var filtered = this.filtered;
        var index = filtered.length ? this._filterIndex : this._index;
        if (index === 0)
            return null;
        this.index = --index;
        return this;
    };
    Corpus.prototype.next = function () {
        if (!this.length)
            return null;
        var filtered = this.filtered;
        var index = filtered.length ? this._filterIndex : this._index;
        var total = filtered.length ? filtered.length - 1 : this._sentences.length - 1;
        if (index === total)
            return null;
        this.index = ++index;
        return this;
    };
    Corpus.prototype.last = function () {
        var filtered = this.filtered;
        this.index = filtered.length ? filtered.length - 1 : this.length - 1;
        return this;
    };
    Corpus.prototype.getSentence = function (index) {
        if (index == undefined)
            index = this.index;
        if (0 > index || index > this.length - 1)
            return null;
        return this._sentences[index] || null;
    };
    Corpus.prototype.setSentence = function (index, text) {
        if (text === null || text === undefined) {
            text = index || "";
            index = this.index.toString();
        }
        var i = parseInt(index);
        if (isNaN(i) || this.getSentence(i) === null)
            throw new utils_1.NxError("cannot set sentence at index " + index);
        this._labeler.onRemove(this.getSentence(i));
        var sent = new sentence_1.Sentence(text, this.options);
        sent.corpus = this;
        this._sentences[i] = sent;
        this._labeler.onAdd(sent);
        this.reindex();
        return sent;
    };
    Corpus.prototype.insertSentence = function (index, text) {
        if (text === null || text === undefined) {
            text = index || "";
            index = (this.index + 1).toString();
        }
        var i = parseFloat(index);
        if (isNaN(i))
            throw new utils_1.NxError("cannot insert sentence at index " + index);
        i = i < 0 ? 0 : i > this.length ? this.length : parseInt(index);
        var sent = new sentence_1.Sentence(text, this.options);
        sent.corpus = this;
        this._sentences = this._sentences.slice(0, i).concat(sent).concat(this._sentences.slice(i));
        this._labeler.onAdd(sent);
        this.index = i;
        this.reindex();
        return sent;
    };
    Corpus.prototype.removeSentence = function (index) {
        if (!this.length)
            return null;
        if (index === undefined)
            index = this.index.toString();
        var i = parseFloat(index);
        if (isNaN(i))
            throw new utils_1.NxError("cannot remove sentence at index " + index);
        i = i < 0 ? 0 : i > this.length - 1 ? this.length - 1 : parseInt(index);
        var removed = this._sentences.splice(i, 1)[0];
        if (!this.length)
            this.insertSentence();
        this._labeler.onRemove(removed);
        if (i <= this.index)
            this.index--;
        this.reindex();
        return removed;
    };
    Corpus.prototype.pushSentence = function (text) {
        return this.insertSentence(Infinity.toString(), text);
    };
    Corpus.prototype.popSentence = function () { return this.removeSentence(Infinity.toString()); };
    Corpus.prototype.parse = function (s) {
        var _this = this;
        var splitted = splitter_1.default(s, this.options);
        var index = this.index || 0;
        splitted.forEach(function (split, i) {
            _this.insertSentence((index + i).toString(), split);
        });
        return this;
    };
    Corpus.fromString = function (s, options) {
        var corpus = new Corpus(options);
        corpus.parse(s);
        return corpus;
    };
    Corpus.prototype.readFile = function (filepath, next) {
        var _this = this;
        fs.exists(filepath, function (exists) {
            if (!exists)
                throw new utils_1.NxError("cannot read file: cannot find path " + filepath);
            fs.readFile(filepath, function (err, data) {
                if (err)
                    throw err;
                _this.parse(data.toString());
                _this.sources.push(filepath);
                _this.filename = path.basename(filepath);
                if (next)
                    next(_this);
            });
        });
    };
    Corpus.fromFile = function (filepath, options, next) {
        if (next === undefined) {
            next = options;
            options = {};
        }
        var corpus = new Corpus(options);
        corpus.readFile(filepath, next);
        return corpus;
    };
    Corpus.prototype.writeFile = function (format, filepath) {
        filepath = this.getWritePath(filepath);
        var contents = this.serialize();
        fs.writeFile(filepath, JSON.stringify(contents), function (err) {
            if (err)
                throw err;
        });
        return this;
    };
    Corpus.prototype.getWritePath = function (filepath) {
        if (filepath)
            return filepath;
        var lastSource = this.sources.slice(-1)[0];
        return (lastSource || "export") + ".nxcorpus";
    };
    return Corpus;
}(base_class_1.NxBaseClass));
exports.Corpus = Corpus;
//# sourceMappingURL=corpus.js.map