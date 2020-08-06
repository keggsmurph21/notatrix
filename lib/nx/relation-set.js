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
exports.RelationSet = void 0;
var _ = require("underscore");
var base_class_1 = require("./base-class");
var RelationSet = (function (_super) {
    __extends(RelationSet, _super);
    function RelationSet(token, partner) {
        var _this = _super.call(this, "RelationSet") || this;
        _this.token = token;
        _this.partner = partner;
        _this._items = [];
        return _this;
    }
    Object.defineProperty(RelationSet.prototype, "length", {
        get: function () { return this._items.length; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RelationSet.prototype, "first", {
        get: function () { return this._items[0] || null; },
        enumerable: false,
        configurable: true
    });
    RelationSet.prototype.map = function (callback) {
        return this._items.map(callback);
    };
    RelationSet.prototype.has = function (token) {
        var has = false;
        this.map(function (item) {
            if (item.token === token)
                has = true;
        });
        return has;
    };
    RelationSet.prototype.add = function (token, deprel, origin) {
        if (origin === void 0) { origin = true; }
        if (this.has(token)) {
            this.modify(token, deprel);
            return false;
        }
        this._items.push({
            token: token,
            deprel: deprel,
        });
        if (origin)
            token[this.partner].add(this.token, deprel, false);
        return true;
    };
    RelationSet.prototype.modify = function (token, deprel, origin) {
        if (origin === void 0) { origin = true; }
        if (!this.has(token))
            return false;
        var ret;
        this.map(function (item) {
            if (item.token === token) {
                ret = item.deprel !== deprel;
                item.deprel = deprel;
            }
        });
        if (origin)
            token[this.partner].modify(this.token, deprel, false);
        return ret;
    };
    RelationSet.prototype.remove = function (token, origin) {
        if (origin === void 0) { origin = true; }
        var at = -1;
        this.map(function (item, i) {
            if (item.token === token)
                at = i;
        });
        if (at === -1)
            return null;
        var removed = this._items.splice(at, 1)[0];
        if (origin)
            token[this.partner].remove(this.token);
        return removed || null;
    };
    RelationSet.prototype.clear = function (origin) {
        var _this = this;
        if (origin === void 0) { origin = true; }
        this.map(function (item) {
            if (origin)
                item.token[_this.partner].remove(_this.token);
        });
        this._items = [];
    };
    return RelationSet;
}(base_class_1.NxBaseClass));
exports.RelationSet = RelationSet;
//# sourceMappingURL=relation-set.js.map