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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContrastingColor = exports.getRandomHexColor = exports.hashStringToHex = exports.dedup = exports.guessDeprel = exports.thin = exports.noop = exports.isJSONSerializable = exports.hexToRGB = exports.combine = void 0;
var _ = __importStar(require("underscore"));
var constants_1 = require("./constants");
var regex_1 = require("./regex");
function combine(arr, k) {
    if (k > arr.length || k <= 0)
        return [];
    if (k === arr.length)
        return [arr];
    if (k === 1)
        return arr.map(function (e) { return [e]; });
    var combs = [];
    var _loop_1 = function (i) {
        var head = arr.slice(i, i + 1);
        var tailCombs = combine(arr.slice(i + 1), k - 1);
        tailCombs.forEach(function (tailComb) { combs.push(head.concat(tailComb)); });
    };
    for (var i = 0; i < arr.length - k + 1; i++) {
        _loop_1(i);
    }
    return combs;
}
exports.combine = combine;
function hexToRGB(hex) {
    var match = hex.match(regex_1.hexColor);
    if (!match)
        return null;
    return [
        parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)
    ];
}
exports.hexToRGB = hexToRGB;
function isJSONSerializable(obj) {
    if (typeof obj === "string") {
        try {
            JSON.parse(obj);
        }
        catch (e) {
            return false;
        }
    }
    else {
        try {
            JSON.stringify(obj);
        }
        catch (e) {
            return false;
        }
    }
    return true;
}
exports.isJSONSerializable = isJSONSerializable;
function noop(arg) { return arg; }
exports.noop = noop;
function thin(arg) { return arg || undefined; }
exports.thin = thin;
function guessDeprel(dependent, head, context) {
    return undefined;
}
exports.guessDeprel = guessDeprel;
function dedup(master, slave) {
    var dedup = {};
    _.each(slave, function (value, key) {
        if (master[key] !== value)
            dedup[key] = value;
    });
    return dedup;
}
exports.dedup = dedup;
function hashStringToHex(s) {
    var hash = 0;
    for (var i = 0; i < s.length; i++) {
        hash = s.charCodeAt(i) + ((hash << 5) - hash);
    }
    var hex = "";
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        hex += ("00" + value.toString(16)).substr(-2);
    }
    return hex;
}
exports.hashStringToHex = hashStringToHex;
function getRandomHexColor() {
    var color = "";
    do {
        color = Math.floor(Math.random() * constants_1.hexConstant).toString(16);
    } while (color.length !== 7);
    return color;
}
exports.getRandomHexColor = getRandomHexColor;
function getContrastingColor(backgroundColor) {
    var color = "ffffff";
    var rgb = hexToRGB(backgroundColor);
    if (!rgb)
        return color;
    var _a = __read(rgb, 3), r = _a[0], g = _a[1], b = _a[2];
    if ((Math.pow(r, 2) + Math.pow(g, 2) + Math.pow(b, 2)) >
        (Math.pow((255 - r), 2) + Math.pow((255 - g), 2) + Math.pow((255 - b), 2))) {
        color = "000000";
    }
    return color;
}
exports.getContrastingColor = getContrastingColor;
//# sourceMappingURL=funcs.js.map