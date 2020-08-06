"use strict";
var _ = require("underscore"), expect = require("chai").expect, sinon = require("sinon"), utils = require("./utils"), nx = require("..");
describe("detector", function () {
    describe("detect formats explicitly", function () {
        var options = {
            requireTenParams: true,
        };
        utils.forEachText(function (text, format, name) {
            it(format + ":" + name + " is " + format, function () {
                expect(nx.detect.as[format](text, options)).to.equal(format);
            });
        });
    });
    describe("avoid cross-detection", function () {
        var options = {};
        utils.forEachText(function (text, format, name) {
            utils.forEachFormat(function (castedFormat) {
                if (format !== castedFormat)
                    it(format + ":" + name + " is not " + castedFormat, function () {
                        var cast = nx.detect.as[castedFormat];
                        expect(function () { cast(text, options); }).to.throw(nx.DetectorError);
                    });
            });
        });
    });
    describe("detect formats implicitly", function () {
        var options = {
            suppressDetectorErrors: true,
            returnAllMatches: true,
        };
        utils.forEachText(function (text, format, name) {
            it(format + ":" + name + " is " + format, function () {
                var possibilities = nx.detect(text, options);
                expect(possibilities.indexOf(format) > -1).to.equal(true);
            });
        });
    });
});
//# sourceMappingURL=detector.js.map