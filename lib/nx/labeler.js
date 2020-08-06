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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Labeler = void 0;
var _ = require("underscore");
var comment_1 = require("./comment");
var utils_1 = require("utils");
var base_class_1 = require("./base-class");
var label_1 = require("./label");
var Labeler = (function (_super) {
    __extends(Labeler, _super);
    function Labeler(corpus) {
        var _this = _super.call(this, "Labeler") || this;
        _this.corpus = corpus;
        _this._labels = {};
        _this._filter = new Set();
        return _this;
    }
    Labeler.prototype.sort = function () {
        var _this = this;
        var size = function (name) { return _this._labels[name]._sents.size; };
        return Object.keys(this._labels)
            .sort(function (x, y) {
            if (size(x) < size(y))
                return 1;
            if (size(x) > size(y))
                return -1;
            return 0;
        })
            .map(function (name) {
            return {
                name: name,
                size: _this._labels[name]._sents.size,
            };
        });
    };
    Labeler.prototype.serialize = function () {
        return {
            labels: Object.values(this._labels).map(function (label) { return label._label.serialize(); }),
            filter: Array.from(this._filter)
        };
    };
    Labeler.deserialize = function (corpus, serial) {
        var labeler = new Labeler(corpus);
        serial.labels.forEach(function (label) { return labeler.addLabel(label.name); });
        labeler._filter = new (Set.bind.apply(Set, __spread([void 0], serial.filter)))();
        return labeler;
    };
    Labeler.prototype.get = function (name) { return this._labels[name]; };
    Labeler.prototype.count = function (name) {
        return this._labels[name] ? this._labels[name]._sents.size : 0;
    };
    Labeler.prototype.sentenceHasLabel = function (sent, searching) {
        var hasLabel = false;
        sent.comments.forEach(function (comment) {
            if (comment.type === comment_1.CommentType.Label) {
                comment.labels.forEach(function (name) {
                    if (name === searching)
                        hasLabel = true;
                });
            }
        });
        return hasLabel;
    };
    Labeler.prototype.sentenceInFilter = function (sent) {
        var _this = this;
        var inFilter = false;
        sent.comments.forEach(function (comment) {
            if (comment.type === comment_1.CommentType.Label) {
                comment.labels.forEach(function (name) {
                    if (_this._filter.has(name))
                        inFilter = true;
                });
            }
        });
        return inFilter;
    };
    Labeler.prototype.addToFilter = function (name) {
        if (this.get(name))
            this._filter.add(name);
    };
    Labeler.prototype.removeFromFilter = function (name) { this._filter.delete(name); };
    Labeler.prototype.onAdd = function (sent) {
        var _this = this;
        sent.comments.forEach(function (comment) {
            if (comment.type === comment_1.CommentType.Label) {
                comment.labels.forEach(function (name) { _this.addLabel(name, [sent]); });
            }
        });
    };
    Labeler.prototype.onRemove = function (sent) {
        var _this = this;
        sent.comments.forEach(function (comment) {
            if (comment.type === comment_1.CommentType.Label) {
                comment.labels.forEach(function (name) { _this.removeLabel(name, [sent]); });
            }
        });
    };
    Labeler.prototype.addLabel = function (name, sents) {
        if (sents === void 0) { sents = []; }
        var label = this.get(name);
        if (!label) {
            label = {
                _label: new label_1.Label(name),
                _sents: new Set(),
            };
            this._labels[name] = label;
        }
        sents.forEach(function (sent) {
            sent.comments.forEach(function (comment) {
                if (comment.type === comment_1.CommentType.Label) {
                    comment.labels.push(name);
                    label._sents.add(sent);
                }
            });
        });
        return label;
    };
    Labeler.prototype.removeLabel = function (name, sents) {
        if (sents === void 0) { sents = []; }
        var label = this.get(name);
        if (!label)
            return null;
        (sents || label._sents)
            .forEach(function (sent) {
            sent.comments.forEach(function (comment) {
                if (comment.type === comment_1.CommentType.Label) {
                    var index = comment.labels.indexOf(name);
                    comment.labels.splice(index, 1);
                }
            });
        });
        if (!this.count(name))
            delete this._labels[name];
        return label;
    };
    Labeler.prototype.changeLabelName = function (oldName, newName) {
        if (this.get(newName))
            return null;
        var oldLabel = this.removeLabel(oldName);
        if (!oldLabel)
            return null;
        var newLabel = this.addLabel(newName, Array.from(oldLabel._sents));
        newLabel._label.desc = oldLabel._label.desc;
        newLabel._label.bColor = oldLabel._label.bColor;
        newLabel._label.tColor = oldLabel._label.tColor;
        return newLabel;
    };
    Labeler.prototype.changeLabelColor = function (name, color) {
        var label = this.get(name);
        if (!label)
            return false;
        if (color) {
            color = (color.match(utils_1.RE.hexColorSixDigit) || [])[1];
            var int = parseInt(color, 16);
            if (isNaN(int) || int < 0 || int > 255)
                return false;
        }
        else {
            color = utils_1.getRandomHexColor();
        }
        label._label.bColor = color;
        label._label.tColor = utils_1.getContrastingColor(color);
        return true;
    };
    Labeler.prototype.changeLabelDesc = function (name, desc) {
        var label = this.get(name);
        if (!label)
            return false;
        if (typeof desc !== "string")
            return false;
        label._label.desc = desc;
        return true;
    };
    return Labeler;
}(base_class_1.NxBaseClass));
exports.Labeler = Labeler;
//# sourceMappingURL=labeler.js.map