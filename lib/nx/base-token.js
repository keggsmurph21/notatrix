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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseToken = void 0;
var _ = require("underscore");
var uuid = require("uuid/v4");
var utils = require("../utils");
var NxError = utils.NxError;
var base_class_1 = require("./base-class");
var relation_set_1 = require("./relation-set");
var BaseToken = (function (_super) {
    __extends(BaseToken, _super);
    function BaseToken(sent, name, serial) {
        if (serial === void 0) { serial = {}; }
        var _this = _super.call(this, name) || this;
        _this.sent = sent;
        _this._feats = undefined;
        _this._feats_inited = false;
        _this._misc = undefined;
        _this._misc_inited = false;
        _this._analyses = null;
        _this.uuid = uuid();
        _this.uuid = serial.uuid || _this.uuid;
        _this.semicolon = serial.semicolon;
        _this.isEmpty = serial.isEmpty;
        _this.form = serial.form;
        _this.lemma = serial.lemma;
        _this.upostag = serial.upostag;
        _this.xpostag = serial.xpostag;
        _this.feats = serial.feats;
        _this.misc = serial.misc;
        _this._heads = serial.heads;
        _this.heads = new relation_set_1.RelationSet(_this, "dependents");
        _this.dependents = new relation_set_1.RelationSet(_this, "heads");
        _this.indices = {
            absolute: null,
            conllu: null,
            cg3: null,
            cytoscape: null,
            serial: serial.index,
        };
        return _this;
    }
    BaseToken.prototype.addHead = function (head, deprel) {
        if (!(head instanceof BaseToken))
            throw new NxError("cannot add head unless it is a token");
        if (head === this)
            throw new NxError("token cannot be its own head");
        if (typeof deprel !== "string" && deprel != null)
            throw new NxError("deprel must be a string, null, or undefined");
        if (!this.sent.options.enhanced)
            this.heads.clear();
        return this.heads.add(head, deprel);
    };
    BaseToken.prototype.modifyHead = function (head, deprel) {
        if (!(head instanceof BaseToken))
            throw new NxError("cannot add head unless it is a token");
        if (typeof deprel !== "string" && deprel != null)
            throw new NxError("deprel must be a string, null, or undefined");
        return this.heads.modify(head, deprel);
    };
    BaseToken.prototype.removeHead = function (head) {
        if (!(head instanceof BaseToken))
            throw new NxError("cannot add head unless it is a token");
        return !!this.heads.remove(head);
    };
    BaseToken.prototype.removeAllHeads = function () { return this.heads.clear(); };
    BaseToken.prototype.mapHeads = function (callback) {
        return this.heads.map(callback);
    };
    BaseToken.prototype.mapDependents = function (callback) {
        return this.dependents.map(callback);
    };
    BaseToken.prototype.getHead = function (format) {
        if (!this.heads.length)
            return null;
        if (format === "CoNLL-U")
            return "" + this.heads.first.token.indices.conllu;
        if (format === "CG3")
            return "" + this.heads.first.token.indices.cg3;
        return "" + this.heads.first.token.indices.absolute;
    };
    BaseToken.prototype._getDeprel = function () {
        if (!this.heads.length)
            return null;
        return this.heads.first.deprel;
    };
    BaseToken.prototype._getDeps = function (format) {
        function getIndex(token) {
            if (format === "CoNLL-U")
                return token.indices.conllu;
            if (format === "CG3")
                return token.indices.cg3.toString();
            return token.indices.absolute.toString();
        }
        if (!this.heads.length || !this.sent.options.enhanced)
            return [];
        return this.mapHeads(utils.noop)
            .sort(function (x, y) {
            if (getIndex(x.token) < getIndex(y.token))
                return -1;
            if (getIndex(x.token) > getIndex(y.token))
                return 1;
            return 0;
        })
            .map(function (head) {
            return head.deprel ? getIndex(head.token) + ":" + head.deprel
                : "" + getIndex(head.token);
        });
    };
    BaseToken.prototype.setEmpty = function (isEmpty) { this.isEmpty = isEmpty; };
    BaseToken.prototype.walk = function (callback) {
        var i = 0;
        if (this._analyses)
            return this._analyses.map(function (analysis) {
                return analysis._subTokens.map(function (subToken) { return callback(subToken, ++i); });
            });
        return null;
    };
    BaseToken.prototype.serialize = function () {
        var serial = {
            uuid: this.uuid,
            form: this.form,
            index: this.indices.absolute,
            semicolon: this.semicolon,
            isEmpty: this.isEmpty,
            lemma: this.lemma,
            upostag: this.upostag,
            xpostag: this.xpostag,
            feats: this._feats,
            misc: this._misc,
            heads: this.mapHeads(function (head) {
                return {
                    index: head.token.indices.absolute.toString(),
                    deprel: head.deprel,
                };
            }),
        };
        if (this._analyses && this._analyses.length)
            serial.analyses = this._analyses.map(function (analysis) {
                return {
                    subTokens: analysis._subTokens.map(function (subToken) { return subToken.serialize(); }),
                };
            });
        serial = _.pick(serial, function (value) { return value !== undefined; });
        return serial;
    };
    Object.defineProperty(BaseToken.prototype, "isSuperToken", {
        get: function () {
            return !!(this._analyses || []).reduce(function (total, analysis) {
                return total += analysis._subTokens.length;
            }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseToken.prototype, "value", {
        get: function () { return this.form || this.lemma; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseToken.prototype, "feats", {
        get: function () {
            return this._feats_inited ? this._feats : undefined;
        },
        set: function (feats) {
            if (feats === undefined)
                return;
            this._feats_inited = true;
            this._feats = feats || [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseToken.prototype, "misc", {
        get: function () {
            return this._misc_inited ? this._misc : undefined;
        },
        set: function (misc) {
            if (misc === undefined)
                return;
            this._misc_inited = true;
            this._misc = misc || [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseToken.prototype, "other", {
        set: function (other) {
            if (other === undefined)
                return;
            if (typeof other === "string")
                other = [other];
            this._misc_inited = true;
            this._misc = (other || []).filter(utils.thin);
        },
        enumerable: false,
        configurable: true
    });
    return BaseToken;
}(base_class_1.NxBaseClass));
exports.BaseToken = BaseToken;
//# sourceMappingURL=base-token.js.map