"use strict";
var _ = require("underscore"), expect = require("chai").expect, sinon = require("sinon"), utils = require("./utils"), nx = require("..");
describe("check loss", function () {
    it("no dependencies", function () {
        var s = new nx.Sentence("1\tone\t_\t_\t_\t_\t_\t_\t_\t_\n2\ttwo\t_\t_\t_\t_\t_\t_\t_\t_\n3\tthree\t_\t_\t_\t_\t_\t_\t_\t_");
        expect(s.options.enhanced).to.equal(false);
        expect(function () { return s.to("Brackets").loss; }).to.throw(nx.GeneratorError);
        expect(s.to("CG3").loss).to.deep.equal([]);
        expect(s.to("CoNLL-U").loss).to.deep.equal([]);
        expect(s.to("Params").loss).to.deep.equal([]);
        expect(s.to("plain text").loss).to.deep.equal([]);
        expect(s.to("SD").loss).to.deep.equal([]);
    });
    it("only dependencies", function () {
        var s = new nx.Sentence("1\tone\t_\t_\t_\t_\t0\troot\t_\t_\n2\ttwo\t_\t_\t_\t_\t3\t_\t3\t_\n3\tthree\t_\t_\t_\t_\t1\t_\t1\t_");
        expect(s.options.enhanced).to.equal(false);
        expect(s.to("Brackets").loss).to.deep.equal([]);
        expect(s.to("CG3").loss).to.deep.equal([]);
        expect(s.to("CoNLL-U").loss).to.deep.equal([]);
        expect(s.to("Params").loss).to.deep.equal([]);
        expect(s.to("plain text").loss).to.deep.equal(["heads"]);
        expect(s.to("SD").loss).to.deep.equal([]);
    });
    it("enhanced", function () {
        var s = new nx.Sentence("1\tone\t_\t_\t_\t_\t0\troot\t_\t_\n2\ttwo\t_\t_\t_\t_\t3\t_\t1|3\t_\n3\tthree\t_\t_\t_\t_\t1\t_\t1\t_");
        expect(s.options.enhanced).to.equal(true);
        expect(function () { return s.to("Brackets").loss; }).to.throw(nx.GeneratorError);
        expect(s.to("CG3").loss).to.deep.equal(["enhanced dependencies"]);
        expect(s.to("CoNLL-U").loss).to.deep.equal([]);
        expect(s.to("Params").loss).to.deep.equal(["enhanced dependencies"]);
        expect(s.to("plain text").loss).to.deep.equal(["heads"]);
        expect(s.to("SD").loss).to.deep.equal(["enhanced dependencies"]);
    });
    it("unenhanced", function () {
        var s = new nx.Sentence("1\tone\t_\t_\t_\t_\t0\troot\t_\t_\n2\ttwo\t_\t_\t_\t_\t3\t_\t1|3\t_\n3\tthree\t_\t_\t_\t_\t1\t_\t1\t_");
        expect(s.options.enhanced).to.equal(true);
        s.unenhance();
        expect(s.options.enhanced).to.equal(false);
        expect(function () { return s.to("Brackets").loss; }).to.throw(nx.GeneratorError);
        expect(s.to("CG3").loss).to.deep.equal(["enhanced dependencies"]);
        expect(s.to("CoNLL-U").loss).to.deep.equal(["enhanced dependencies"]);
        expect(s.to("Params").loss).to.deep.equal(["enhanced dependencies"]);
        expect(s.to("plain text").loss).to.deep.equal(["heads"]);
        expect(s.to("SD").loss).to.deep.equal(["enhanced dependencies"]);
    });
});
//# sourceMappingURL=loss.js.map