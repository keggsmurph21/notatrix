"use strict";
var _ = require("underscore");
var utils = require("./utils");
var ConverterError = utils.ConverterError;
var nx = require("./nx");
module.exports = function (input, options) {
    try {
        var sent = new nx.Sentence(input, options);
        sent.from = function (format) {
            return convert(sent.input, _.extend({ interpretAs: format }, options));
        };
        return sent;
    }
    catch (e) {
        if (e instanceof utils.ToolError || e instanceof utils.NxError)
            throw new ConverterError("FATAL: unable to convert: " + e.message);
        throw e;
    }
};
//# sourceMappingURL=converter.js.map