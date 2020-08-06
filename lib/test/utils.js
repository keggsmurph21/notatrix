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
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = exports.cleanConllu = exports.forEachFormat = exports.randomInt = exports.forEachText = exports.currentForms = exports.countDeps = exports.countHeads = exports.ignoreAfterLemma = exports.ignoreIndices = exports.ignoreSemicolons = exports.cleanText = exports.trimAndConvertToTabs = exports.spacesToTabs = void 0;
var _ = __importStar(require("underscore"));
var utils_1 = require("utils");
var data_1 = require("data");
function spacesToTabs(str) {
    return str.replace(/[ \t]+/g, "\t");
}
exports.spacesToTabs = spacesToTabs;
function trimAndConvertToTabs(str) {
    return str.trim().replace(/[ \t]+/g, "\t").trim();
}
exports.trimAndConvertToTabs = trimAndConvertToTabs;
function cleanText(str) {
    return str.trim().replace(/([.,?!]+)$/, " $1").replace(/(\s)+/, " ").trim();
}
exports.cleanText = cleanText;
function ignoreSemicolons(str) {
    return trimAndConvertToTabs(str)
        .split("\n")
        .map(function (line) { return line.replace(/^;/, ""); })
        .join("\n");
}
exports.ignoreSemicolons = ignoreSemicolons;
function ignoreIndices(str) {
    return trimAndConvertToTabs(str.split("\t").slice(1).join("\t"));
}
exports.ignoreIndices = ignoreIndices;
function ignoreAfterLemma(str) {
    return str.split("\n")
        .map(function (line) { return line.split("\t").slice(0, 3).join(" "); })
        .join(" ");
}
exports.ignoreAfterLemma = ignoreAfterLemma;
function countHeads(tok) {
    var acc = 0;
    tok.mapHeads(function () { acc++; });
    return acc;
}
exports.countHeads = countHeads;
function countDeps(tok) {
    var acc = 0;
    tok.mapDependents(function () { acc++; });
    return acc;
}
exports.countDeps = countDeps;
function currentForms(sentence) {
    var forms = [];
    sentence.tokens.forEach(function (tok) {
        tok.analysis.subTokens.forEach(function (subTok) { forms.push(subTok.form); });
    });
    return forms.join(" ");
}
exports.currentForms = currentForms;
function forEachText(callback) {
    callback = callback || utils_1.noop;
    _.each(data_1.data, function (texts, format) {
        if (utils_1.C.formats.indexOf(format) > -1)
            _.each(texts, function (text, name) {
                callback(text, format, name);
            });
    });
}
exports.forEachText = forEachText;
function randomInt(min, max) {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * max) + min;
}
exports.randomInt = randomInt;
function forEachFormat(callback) {
    callback = callback || utils_1.noop;
    _.each(utils_1.C.formats, callback);
}
exports.forEachFormat = forEachFormat;
function cleanConllu(str) {
    return str.split("\n")
        .map(spacesToTabs)
        .map(function (line) { return line.trim(); })
        .filter(utils_1.thin)
        .join("\n");
}
exports.cleanConllu = cleanConllu;
function clean(str, callbacks) {
    var lines = str.split("\n");
    callbacks.forEach(function (map) { lines = lines.map(map); });
    return lines.filter(utils_1.thin).join("\n");
}
exports.clean = clean;
//# sourceMappingURL=utils.js.map