"use strict";
var _ = require("underscore"), expect = require("chai").expect, sinon = require("sinon"), utils = require("./utils"), nx = require("..");
describe("parser", function () {
    describe("parse formats explicitly to notatrix serial", function () {
        var options = {};
        utils.forEachText(function (text, format, name) {
            it(format + ":" + name, function () {
                var parsed = nx.parse.as[format](text, options);
                expect(function () { return nx.detect.as.notatrixSerial(parsed); }).to.not.throw();
            });
        });
    });
    describe("parse formats implicitly to notatrix serial", function () {
        var options = {};
        utils.forEachText(function (text, format, name) {
            it(format + ":" + name, function () {
                var possibilities = nx.parse(text, options);
                _.each(possibilities, function (possibility) {
                    expect(function () { return nx.detect.as.notatrixSerial(possibility); }).to.not.throw();
                });
            });
        });
    });
});
//# sourceMappingURL=parser.js.map