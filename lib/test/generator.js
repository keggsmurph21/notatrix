"use strict";
var _ = require("underscore"), expect = require("chai").expect, sinon = require("sinon"), utils = require("./utils"), nx = require("..");
describe("generator", function () {
    describe("generate output in input format from nx.Sentence instances", function () {
        utils.forEachText(function (text, format, name) {
            it(format + ":" + name, function () {
                var clean = function (str) { return utils.clean(str, []); };
                switch (format) {
                    case ("CoNLL-U"):
                        clean = function (str) { return utils.clean(str, [
                            utils.spacesToTabs,
                            function (line) { return line.trim(); },
                        ]); };
                        break;
                    case ("CG3"):
                        clean = function (str) { return utils.clean(str, [
                            utils.spacesToTabs,
                        ]); };
                        break;
                    case ("Params"):
                        clean = function (obj) { return obj.forEach(function (token) { return _.omit(token, "index"); }); };
                        break;
                    case ("plain text"):
                        clean = function (str) { return str.trim(); };
                        break;
                    case ("SD"):
                        clean = function (str) { return str.split("\n")
                            .sort(function (x, y) {
                            if (x[0] < y[0])
                                return -1;
                            if (x[0] > y[0])
                                return 1;
                            return 0;
                        })
                            .join("\n")
                            .replace(utils.re.spaceBeforePunctuation, "$1"); };
                        break;
                }
                var options = {
                    addHeadOnModifyFailure: false,
                    addHeadsWhenAddingDeps: false,
                    addDepsWhenAddingHeads: false,
                    depsShowDeprel: false,
                    showEnhancedDependencies: false,
                    useTokenDeprel: false,
                };
                switch (format + ":" + name) {
                    case ("CG3:nested"):
                    case ("CG3:with_semicolumn"):
                    case ("CG3:apertium_kaz_1"):
                    case ("CG3:apertium_kaz_2"):
                        options.omitIndices = true;
                        break;
                    case ("CoNLL-U:ud_example_modified"):
                        options.depsShowDeprel = true;
                        options.showEnhancedDependencies = true;
                        break;
                    case ("CoNLL-U:ud_example_spaces"):
                        options.depsShowDeprel = true;
                        options.showRootDeprel = false;
                        options.showEnhancedDependencies = true;
                        break;
                    case ("CoNLL-U:ud_example_tabs"):
                        options.depsShowDeprel = true;
                        break;
                }
                if (format === "Brackets") {
                    options.addDepsWhenAddingHeads = true;
                    options.useTokenDeprel = true;
                }
                else if (format === "SD") {
                    options.addDepsWhenAddingHeads = true;
                    options.useTokenDeprel = true;
                }
                var sent = new nx.Sentence(text, options);
                var generated = nx.generate[format](sent, options);
                var detected = nx.detect.as[format](generated.output);
                expect(detected).to.equal(format);
                expect(clean(generated.output)).to.equal(clean(text));
                expect(Array.isArray(generated.loss)).to.equal(true);
            });
        });
    });
    describe("generate outputs in different formats if possible", function () {
        var test = function (text, format, name, options) {
            if (options === void 0) { options = {}; }
            utils.forEachFormat(function (castedFormat) {
                if (format !== castedFormat)
                    it(format + ":" + name + " => " + castedFormat, function () {
                        try {
                            var generated = (new nx.Sentence(text, options)).to(castedFormat);
                            expect(Array.isArray(generated.loss)).to.equal(true);
                        }
                        catch (e) {
                            if (e instanceof utils.GeneratorError) {
                            }
                            else {
                                throw e;
                            }
                        }
                    });
            });
        };
        utils.forEachText(test);
        test("", "plain text", "empty string", { interpretAs: "plain text", allowEmptyString: true });
        test(null, "plain text", "null", { interpretAs: "plain text", allowEmptyString: true });
        test(undefined, "plain text", "undefined", { interpretAs: "plain text", allowEmptyString: true });
    });
});
//# sourceMappingURL=generator.js.map