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
exports.nx = __importStar(require("./nx"));
exports.utils = __importStar(require("./utils"));
var formats_1 = require("./formats");
Object.defineProperty(exports, "formats", { enumerable: true, get: function () { return formats_1.formats; } });
var data_1 = require("./data");
Object.defineProperty(exports, "data", { enumerable: true, get: function () { return data_1.data; } });
exports.detect = __importStar(require("./detector"));
exports.generate = __importStar(require("./generator"));
exports.parse = __importStar(require("./parser"));
exports.split = __importStar(require("./splitter"));
//# sourceMappingURL=index.js.map