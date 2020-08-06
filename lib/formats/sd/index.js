"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
var fields_1 = require("./fields");
Object.defineProperty(exports, "fields", { enumerable: true, get: function () { return fields_1.default; } });
var default_splitter_1 = require("../default-splitter");
Object.defineProperty(exports, "split", { enumerable: true, get: function () { return default_splitter_1.default; } });
var detector_1 = require("./detector");
Object.defineProperty(exports, "detect", { enumerable: true, get: function () { return detector_1.default; } });
var parser_1 = require("./parser");
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parser_1.default; } });
var generator_1 = require("./generator");
Object.defineProperty(exports, "generate", { enumerable: true, get: function () { return generator_1.default; } });
exports.name = "SD";
//# sourceMappingURL=index.js.map