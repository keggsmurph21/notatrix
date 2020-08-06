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
exports.Label = void 0;
var utils_1 = require("utils");
var base_class_1 = require("./base-class");
var Label = (function (_super) {
    __extends(Label, _super);
    function Label(name) {
        var _this = _super.call(this, "Label") || this;
        _this.name = name;
        _this.bColor = utils_1.hashStringToHex(name);
        _this.tColor = utils_1.getContrastingColor(_this.bColor);
        _this.desc = "";
        return _this;
    }
    Label.prototype.serialize = function () {
        return {
            name: this.name,
            desc: this.desc,
            bColor: this.bColor,
            tColor: this.tColor,
        };
    };
    Label.deserialize = function (serial) {
        var label = new Label(serial.name);
        label.desc = serial.desc;
        label.bColor = serial.bColor;
        label.tColor = serial.tColor;
        return label;
    };
    return Label;
}(base_class_1.NxBaseClass));
exports.Label = Label;
//# sourceMappingURL=label.js.map