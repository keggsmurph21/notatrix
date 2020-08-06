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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("underscore"));
var utils_1 = require("utils");
var detector_1 = __importDefault(require("./detector"));
function default_1(text, options) {
    options = _.defaults(options, {
        allowEmptyString: true,
    });
    text = text || "";
    try {
        detector_1.default(text, options);
    }
    catch (e) {
        if (e instanceof utils_1.DetectorError)
            throw new utils_1.ParserError(e.message, text, options);
        throw e;
    }
    var chunks = [];
    var word = "";
    _.each(text, function (char, i) {
        if (utils_1.RE.whitespace.test(char)) {
            chunks.push(word);
            word = "";
        }
        else if (utils_1.RE.punctuation.test(char)) {
            if (!utils_1.RE.allPunctuation.test(word)) {
                chunks.push(word);
                word = "";
            }
            word += char;
        }
        else {
            word += char;
        }
    });
    chunks.push(word);
    var tokens = chunks.filter(utils_1.thin).map(function (chunk, i) {
        return {
            form: chunk,
            index: i,
        };
    });
    return {
        input: text,
        options: options,
        comments: [],
        tokens: tokens,
    };
}
exports.default = default_1;
;
//# sourceMappingURL=parser.js.map