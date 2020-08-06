"use strict";
var _ = require("underscore"), expect = require("chai").expect, sinon = require("sinon"), utils = require("./utils"), nx = require("..");
describe("Sentence", function () {
    describe("valid initializer", function () {
        it("initialize correctly", function () {
            var s = new Sentence();
            expect(s.comments).to.deep.equal([]);
            expect(s.tokens).to.deep.equal([]);
            expect(s.length).to.equal(0);
            expect(s.isValidConllu).to.equal(true);
            expect(s.isValidCG3).to.equal(true);
        });
        it("well-defined getter behavior", function () {
            var s = new Sentence();
            expect(s.getComment(0)).to.equal(null);
            expect(s.getToken(0)).to.equal(null);
            expect(s[0]).to.equal(null);
            expect(s.getById(0)).to.equal(null);
        });
        it("return formats correctly", function () {
            var s = new Sentence();
            expect(s.text).to.equal("");
            expect(s.conllu).to.equal("");
            expect(s.params).to.deep.equal([]);
        });
    });
    describe("valid after initializing first Analysis", function () {
        var params = [{ form: "hello" }, { form: "world" }];
        it("initialize directly with params", function () {
            var s = new Sentence(params);
            expect(s.comments).to.deep.equal([]);
            expect(currentForms(s)).to.equal("hello world");
            expect(s.length).to.equal(2);
            expect(s.isValidConllu).to.equal(true);
            expect(s.isValidCG3).to.equal(true);
        });
        it("initialize with = operator", function () {
            var s = new Sentence();
            s.tokens = [new Token(s, params[0]), new Token(s, params[1])];
            expect(s.comments).to.deep.equal([]);
            expect(currentForms(s)).to.equal("hello world");
            expect(s.length).to.equal(2);
            expect(s.isValidConllu).to.equal(true);
            expect(s.isValidCG3).to.equal(true);
        });
        it("initialize with Sentence.insertTokenAt method", function () {
            var s = new Sentence();
            s.pushToken(new Token(s, params[0])).pushToken(new Token(s, params[1]));
            expect(s.comments).to.deep.equal([]);
            expect(currentForms(s)).to.equal("hello world");
            expect(s.length).to.equal(2);
            expect(s.isValidConllu).to.equal(true);
            expect(s.isValidCG3).to.equal(true);
        });
        it("has equivalent initializers", function () {
            var sents = [
                new Sentence(params), new Sentence(), new Sentence(), new Sentence(),
                Sentence.fromConllu("1\thello\n2\tworld"),
                Sentence.fromParams(params)
            ];
            sents[1].tokens =
                [new Token(sents[1], params[0]), new Token(sents[1], params[1])];
            sents[2]
                .pushToken(new Token(sents[2], params[0]))
                .pushToken(new Token(sents[2], params[1]));
            sents[3].params = params;
            _.each(sents, function (s, i) {
                s.index();
                expect(s).to.deep.equal(sents[0]);
            });
        });
        it("return formats correctly", function () {
            var s = new Sentence(params);
            expect(s.text).to.equal("hello world");
            expect(ignoreAfterLemma(s.conllu))
                .to.equal("1 hello hello 2 world world");
            expect(s.params).to.deep.equal(params);
        });
    });
    describe("parsers", function () {
        it("parse list of params", function () {
            var s = new Sentence();
            var params = [{ form: "hello" }, { form: "world" }];
            s.params = params;
            expect(s.params).to.deep.equal(params);
            expect(s.isValidConllu).to.equal(true);
            expect(s.isValidCG3).to.equal(true);
        });
        _.each(data["CoNLL-U"], function (conllu, name) {
            it("parse CoNLL-U:" + name, function () {
                var s = new Sentence({ help: { head: false, deps: false } });
                s.conllu = conllu;
                expect(clean(s.conllu)).to.equal(clean(conllu));
                expect(s.isValidConllu).to.equal(true);
            });
        });
        _.each(data.CG3, function (cg3, name) {
            it("parse CG3:" + name, function () {
                var s = new Sentence({ help: { head: false, deps: false }, showEmptyDependencies: false });
                s.cg3 = cg3;
                expect(clean(s.cg3)).to.equal(ignoreSemicolons(cg3));
            });
        });
        _.each(data["Plain text"], function (text, name) {
            it("parse Plain text:" + name, function () {
                var s = new Sentence({ help: { head: false, deps: false } });
                s.text = text;
                expect(s.text).to.equal(cleanText(text));
            });
        });
        it("parse nx", function () {
        });
    });
    return;
    describe("token array manipulators", function () {
        it("handles (insert|remove|move)TokenAt()", function () {
            var s = new Sentence();
            var t0 = new Token(s, { form: "zeroth" });
            var t1 = new Token(s, { form: "first" });
            var t2 = new Token(s, { form: "second" });
            var t3 = new Token(s, { form: "third" });
            var t4 = new Token(s, { form: "fourth" });
            var t5 = new Token(s, { form: "fifth" });
            var t6 = new Token(s, { form: "sixth" });
            expect(t5.text).to.equal("fifth");
            expect(t6.text).to.equal("sixth");
            expect(function () { s.insertTokenAt(); }).to.throw(E.NotatrixError);
            expect(function () { s.insertTokenAt({}); }).to.throw(E.NotatrixError);
            expect(function () { s.insertTokenAt(null); }).to.throw(E.NotatrixError);
            expect(function () { s.insertTokenAt(undefined); }).to.throw(E.NotatrixError);
            expect(function () { s.insertTokenAt("x"); }).to.throw(E.NotatrixError);
            expect(function () { s.insertTokenAt(0); }).to.throw(E.NotatrixError);
            expect(function () { s.insertTokenAt(0, {}); }).to.throw(E.NotatrixError);
            expect(function () { s.insertTokenAt(0, null); }).to.throw(E.NotatrixError);
            expect(function () { s.insertTokenAt(0, undefined); })
                .to.throw(E.NotatrixError);
            expect(function () { s.insertTokenAt(0, t0.analysis); })
                .to.throw(E.NotatrixError);
            expect(currentForms(s)).to.equal("");
            expect(s[-1]).to.equal(null);
            expect(s[0]).to.equal(null);
            expect(s[1]).to.equal(null);
            s.insertTokenAt(0, t0);
            expect(currentForms(s)).to.equal("zeroth");
            s.insertTokenAt(-1, t1);
            expect(currentForms(s)).to.equal("first zeroth");
            s.insertTokenAt(1, t2);
            expect(currentForms(s)).to.equal("first second zeroth");
            s.insertTokenAt(Infinity, t3);
            expect(currentForms(s)).to.equal("first second zeroth third");
            s.moveTokenAt(-1, 2);
            expect(currentForms(s)).to.equal("second zeroth first third");
            s.moveTokenAt(Infinity, 1);
            expect(currentForms(s)).to.equal("second third zeroth first");
            s.removeTokenAt(3);
            expect(currentForms(s)).to.equal("second third zeroth");
            s.removeTokenAt(-1);
            expect(currentForms(s)).to.equal("third zeroth");
            s.pushToken(t4).pushToken(t5).popToken();
            expect(currentForms(s)).to.equal("third zeroth fourth");
        });
        it("integrate token and subToken manipulation", function () {
            var s = new Sentence();
            s.comments = ["this is the test sentence"];
            s.pushToken(new Token(s, { form: "zeroth", misc: "super" }));
            s.pushToken(new Token(s, { form: "first", misc: "super" }));
            s.pushToken(new Token(s, { form: "second", misc: "super" }));
            s[0].pushSubToken(new Token(s, { form: "third", misc: "sub" }));
            s[0].pushSubToken(new Token(s, { form: "fourth", misc: "sub" }));
            s[2].pushSubToken(new Token(s, { form: "fifth", misc: "sub" }));
            s[2].pushSubToken(new Token(s, { form: "sixth", misc: "sub" }));
            expect(s.conllu).to.equal("# this is the test sentence\n1-2\tzeroth\tzeroth\t_\t_\t_\t_\t_\t_\tsuper\n1\tthird\tthird\t_\t_\t_\t_\t_\t_\tsub\n2\tfourth\tfourth\t_\t_\t_\t_\t_\t_\tsub\n3\tfirst\tfirst\t_\t_\t_\t_\t_\t_\tsuper\n4-5\tsecond\tsecond\t_\t_\t_\t_\t_\t_\tsuper\n4\tfifth\tfifth\t_\t_\t_\t_\t_\t_\tsub\n5\tsixth\tsixth\t_\t_\t_\t_\t_\t_\tsub");
            s[0].addHead(s[2][0], "one");
            s[2][0].addHead(s[1], "two");
            expect(s.conllu).to.equal("# this is the test sentence\n1-2\tzeroth\tzeroth\t_\t_\t_\t4:one\t_\t_\tsuper\n1\tthird\tthird\t_\t_\t_\t_\t_\t_\tsub\n2\tfourth\tfourth\t_\t_\t_\t_\t_\t_\tsub\n3\tfirst\tfirst\t_\t_\t_\t_\t_\t4:two\tsuper\n4-5\tsecond\tsecond\t_\t_\t_\t_\t_\t_\tsuper\n4\tfifth\tfifth\t_\t_\t_\t3:two\t_\t1-2:one\tsub\n5\tsixth\tsixth\t_\t_\t_\t_\t_\t_\tsub");
            s[2].removeSubTokenAt(0);
            expect(s.conllu).to.equal("# this is the test sentence\n1-2\tzeroth\tzeroth\t_\t_\t_\t_\t_\t_\tsuper\n1\tthird\tthird\t_\t_\t_\t_\t_\t_\tsub\n2\tfourth\tfourth\t_\t_\t_\t_\t_\t_\tsub\n3\tfirst\tfirst\t_\t_\t_\t_\t_\t_\tsuper\n4-4\tsecond\tsecond\t_\t_\t_\t_\t_\t_\tsuper\n4\tsixth\tsixth\t_\t_\t_\t_\t_\t_\tsub");
        });
        it("integrate subTokens with empty tokens", function () {
            var s = new Sentence();
            s.comments = ["this is the #-# and #.# integration test"];
            s.pushToken(new Token(s, { form: "zeroth", misc: "super" }));
            s.pushToken(Token.fromConllu(s, "3.1 first first _ _ _ _ _ _ empty"));
            s[0].pushSubToken(new Token(s, { form: "second", misc: "sub" }));
            s[0].pushSubToken(new Token(s, { form: "third", misc: "sub" }));
            expect(s.getToken(3).isEmpty).to.equal(true);
            expect(s.text).to.equal("second third");
            expect(s.conllu).to.equal("# this is the #-# and #.# integration test\n1-2\tzeroth\tzeroth\t_\t_\t_\t_\t_\t_\tsuper\n1\tsecond\tsecond\t_\t_\t_\t_\t_\t_\tsub\n2\tthird\tthird\t_\t_\t_\t_\t_\t_\tsub\n2.1\tfirst\tfirst\t_\t_\t_\t_\t_\t_\tempty");
            var tmp = s[0].popSubToken();
            s[1].pushSubToken(tmp);
            expect(s[1].token.isEmpty).to.equal(true);
            expect(s[1][0].token.isEmpty).to.equal(true);
            expect(s.text).to.equal("second");
            expect(s.conllu).to.equal("# this is the #-# and #.# integration test\n1-1\tzeroth\tzeroth\t_\t_\t_\t_\t_\t_\tsuper\n1\tsecond\tsecond\t_\t_\t_\t_\t_\t_\tsub\n1.1-1.1\tfirst\tfirst\t_\t_\t_\t_\t_\t_\tempty\n1.1\tthird\tthird\t_\t_\t_\t_\t_\t_\tsub");
        });
    });
    describe("serializer", function () {
        _.each(data["CoNLL-U"], function (text, name) {
            it(name + ": serialize to Notatrix and back", function () {
                var s = new Sentence({ help: { head: false, deps: false } });
                s.conllu = text;
                expect(clean(s.conllu)).to.equal(clean(text));
            });
        });
    });
    describe("instantiate nx.Sentence with explicit format", function () {
        utils.forEachText(function (text, format, name) {
            var options = {
                interpretAs: format,
            };
            it(format + ":" + name, function () {
                expect(function () { new nx.Sentence(text, options); }).to.not.throw();
            });
        });
    });
    describe("instantiate nx.Sentence without explicit format", function () {
        utils.forEachText(function (text, format, name) {
            it(format + ":" + name, function () { expect(function () { new nx.Sentence(text); }).to.not.throw(); });
        });
    });
    describe("serialize nx.Sentence back into notatrix-serial format", function () {
        utils.forEachText(function (text, format, name) {
            it(format + ":" + name, function () {
                var parsed = nx.parse(text, { returnAllPossibilities: false });
                var serial = (new nx.Sentence(parsed)).serialize();
                expect(function () { nx.detect.as.notatrixSerial(serial); }).to.not.throw();
                var clean = function (serial) {
                    serial.tokens = serial.tokens.map(function (token) { return _.omit(token, "index"); });
                };
                expect(clean(serial)).to.equal(clean(parsed));
            });
        });
    });
    describe("modify heads & deps", function () {
        it("modify heads", function () {
            var s = new Sentence();
            s.params = [{ form: "first" }, { form: "second" }, { form: "third" }];
            var a0 = s[0];
            var a1 = s[1];
            var a2 = s[2];
            var a3 = s[3];
            expect(a0).to.be.an.instanceof(Analysis);
            expect(a1).to.be.an.instanceof(Analysis);
            expect(a2).to.be.an.instanceof(Analysis);
            expect(a3).to.equal(null);
            a0.removeHead(a1);
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.addHead(a1);
            expect(a0.head).to.equal("2");
            expect(countHeads(a0)).to.equal(1);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal("1");
            expect(countDeps(a1)).to.equal(1);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.removeHead(a0);
            expect(a0.head).to.equal("2");
            expect(countHeads(a0)).to.equal(1);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal("1");
            expect(countDeps(a1)).to.equal(1);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.removeHead(a1);
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.addHead(a1, "test-dependent");
            expect(a0.head).to.equal("2:test-dependent");
            expect(countHeads(a0)).to.equal(1);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal("1:test-dependent");
            expect(countDeps(a1)).to.equal(1);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.addHead(a1, "test-dependent-2");
            expect(a0.head).to.equal("2:test-dependent-2");
            expect(countHeads(a0)).to.equal(1);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal("1:test-dependent-2");
            expect(countDeps(a1)).to.equal(1);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.addHead(a1);
            expect(a0.head).to.equal("2:test-dependent-2");
            expect(countHeads(a0)).to.equal(1);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal("1:test-dependent-2");
            expect(countDeps(a1)).to.equal(1);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.changeHead(a2);
            expect(a0.head).to.equal("2:test-dependent-2");
            expect(countHeads(a0)).to.equal(1);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal("1:test-dependent-2");
            expect(countDeps(a1)).to.equal(1);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.addHead(a2, "test-dependent-3");
            expect(a0.head).to.equal("2:test-dependent-2|3:test-dependent-3");
            expect(countHeads(a0)).to.equal(2);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal("1:test-dependent-2");
            expect(countDeps(a1)).to.equal(1);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal("1:test-dependent-3");
            expect(countDeps(a2)).to.equal(1);
            a0.changeHead(a2, "test-dependent-4");
            expect(a0.head).to.equal("2:test-dependent-2|3:test-dependent-4");
            expect(countHeads(a0)).to.equal(2);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal("1:test-dependent-2");
            expect(countDeps(a1)).to.equal(1);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal("1:test-dependent-4");
            expect(countDeps(a2)).to.equal(1);
            a0.changeHead(a2);
            expect(a0.head).to.equal("2:test-dependent-2|3:test-dependent-4");
            expect(countHeads(a0)).to.equal(2);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal("1:test-dependent-2");
            expect(countDeps(a1)).to.equal(1);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal("1:test-dependent-4");
            expect(countDeps(a2)).to.equal(1);
            a0.removeHead(a1).removeHead(a2);
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            expect(function () { a0.addHead(a3); }).to.throw(E.NotatrixError);
            expect(function () { a0.removeHead(a3); }).to.throw(E.NotatrixError);
            expect(function () { a0.changeHead(a3); }).to.throw(E.NotatrixError);
        });
        it("modify deps", function () {
            var s = new Sentence();
            s.params = [{ form: "first" }, { form: "second" }, { form: "third" }];
            var a0 = s[0];
            var a1 = s[1];
            var a2 = s[2];
            var a3 = s[3];
            expect(a0).to.be.an.instanceof(Analysis);
            expect(a1).to.be.an.instanceof(Analysis);
            expect(a2).to.be.an.instanceof(Analysis);
            expect(a3).to.equal(null);
            a0.removeDep(a1);
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.addDep(a1);
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal("2");
            expect(countDeps(a0)).to.equal(1);
            expect(a1.head).to.equal("1");
            expect(countHeads(a1)).to.equal(1);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.removeDep(a0);
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal("2");
            expect(countDeps(a0)).to.equal(1);
            expect(a1.head).to.equal("1");
            expect(countHeads(a1)).to.equal(1);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.removeDep(a1);
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.addDep(a1, "test-dependent");
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal("2:test-dependent");
            expect(countDeps(a0)).to.equal(1);
            expect(a1.head).to.equal("1:test-dependent");
            expect(countHeads(a1)).to.equal(1);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.addDep(a1, "test-dependent-2");
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal("2:test-dependent-2");
            expect(countDeps(a0)).to.equal(1);
            expect(a1.head).to.equal("1:test-dependent-2");
            expect(countHeads(a1)).to.equal(1);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.addDep(a1);
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal("2:test-dependent-2");
            expect(countDeps(a0)).to.equal(1);
            expect(a1.head).to.equal("1:test-dependent-2");
            expect(countHeads(a1)).to.equal(1);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.changeDep(a2, "test-dependent-3");
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal("2:test-dependent-2");
            expect(countDeps(a0)).to.equal(1);
            expect(a1.head).to.equal("1:test-dependent-2");
            expect(countHeads(a1)).to.equal(1);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.addDep(a2, "test-dependent-3");
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal("2:test-dependent-2|3:test-dependent-3");
            expect(countDeps(a0)).to.equal(2);
            expect(a1.head).to.equal("1:test-dependent-2");
            expect(countHeads(a1)).to.equal(1);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal("1:test-dependent-3");
            expect(countHeads(a2)).to.equal(1);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.changeDep(a2, "test-dependent-4");
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal("2:test-dependent-2|3:test-dependent-4");
            expect(countDeps(a0)).to.equal(2);
            expect(a1.head).to.equal("1:test-dependent-2");
            expect(countHeads(a1)).to.equal(1);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal("1:test-dependent-4");
            expect(countHeads(a2)).to.equal(1);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.changeDep(a2);
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal("2:test-dependent-2|3:test-dependent-4");
            expect(countDeps(a0)).to.equal(2);
            expect(a1.head).to.equal("1:test-dependent-2");
            expect(countHeads(a1)).to.equal(1);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal("1:test-dependent-4");
            expect(countHeads(a2)).to.equal(1);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            a0.removeDep(a1).removeDep(a2);
            expect(a0.head).to.equal(null);
            expect(countHeads(a0)).to.equal(0);
            expect(a0.deps).to.equal(null);
            expect(countDeps(a0)).to.equal(0);
            expect(a1.head).to.equal(null);
            expect(countHeads(a1)).to.equal(0);
            expect(a1.deps).to.equal(null);
            expect(countDeps(a1)).to.equal(0);
            expect(a2.head).to.equal(null);
            expect(countHeads(a2)).to.equal(0);
            expect(a2.deps).to.equal(null);
            expect(countDeps(a2)).to.equal(0);
            expect(function () { a0.addDep(a3); }).to.throw(E.NotatrixError);
            expect(function () { a0.removeDep(a3); }).to.throw(E.NotatrixError);
            expect(function () { a0.changeDep(a3); }).to.throw(E.NotatrixError);
        });
    });
    describe("merging", function () {
        var conllu = "1\tA\ta_lemma\n2\tB\tb_lemma\n3-5\tCDE\tcde_lemma\n3\tC\tc_lemma\n4\tD\td_lemma\n5\tE\te_lemma\n6\tF\tf_lemma\n7\tG\tg_lemma";
        it("should throw errors at the right times", function () {
            var s = Sentence.fromConllu(conllu);
            var ta = s[0].token, tb = s[1].token, tcde = s[2].token, tc = s[2][0].token, td = s[2][1].token, te = s[2][2].token, tf = s[3].token, tg = s[4].token;
            expect(function () { ta.mergeWith(ta); }).to.throw(E.NotatrixError);
            expect(function () { ta.mergeWith(tcde); }).to.throw(E.NotatrixError);
            expect(function () { ta.mergeWith(tc); }).to.throw(E.NotatrixError);
            expect(function () { ta.mergeWith(td); }).to.throw(E.NotatrixError);
            expect(function () { ta.mergeWith(te); }).to.throw(E.NotatrixError);
            expect(function () { ta.mergeWith(tf); }).to.throw(E.NotatrixError);
            expect(function () { ta.mergeWith(tg); }).to.throw(E.NotatrixError);
            expect(function () { tb.mergeWith(tb); }).to.throw(E.NotatrixError);
            expect(function () { tb.mergeWith(tcde); }).to.throw(E.NotatrixError);
            expect(function () { tb.mergeWith(tc); }).to.throw(E.NotatrixError);
            expect(function () { tb.mergeWith(td); }).to.throw(E.NotatrixError);
            expect(function () { tb.mergeWith(te); }).to.throw(E.NotatrixError);
            expect(function () { tb.mergeWith(tf); }).to.throw(E.NotatrixError);
            expect(function () { tb.mergeWith(tg); }).to.throw(E.NotatrixError);
            expect(function () { tcde.mergeWith(ta); }).to.throw(E.NotatrixError);
            expect(function () { tcde.mergeWith(tb); }).to.throw(E.NotatrixError);
            expect(function () { tcde.mergeWith(tcde); }).to.throw(E.NotatrixError);
            expect(function () { tcde.mergeWith(tc); }).to.throw(E.NotatrixError);
            expect(function () { tcde.mergeWith(td); }).to.throw(E.NotatrixError);
            expect(function () { tcde.mergeWith(te); }).to.throw(E.NotatrixError);
            expect(function () { tcde.mergeWith(tf); }).to.throw(E.NotatrixError);
            expect(function () { tcde.mergeWith(tg); }).to.throw(E.NotatrixError);
            expect(function () { tc.mergeWith(ta); }).to.throw(E.NotatrixError);
            expect(function () { tc.mergeWith(tb); }).to.throw(E.NotatrixError);
            expect(function () { tc.mergeWith(tcde); }).to.throw(E.NotatrixError);
            expect(function () { tc.mergeWith(tc); }).to.throw(E.NotatrixError);
            expect(function () { tc.mergeWith(te); }).to.throw(E.NotatrixError);
            expect(function () { tc.mergeWith(tf); }).to.throw(E.NotatrixError);
            expect(function () { tc.mergeWith(tg); }).to.throw(E.NotatrixError);
            expect(function () { td.mergeWith(ta); }).to.throw(E.NotatrixError);
            expect(function () { td.mergeWith(tb); }).to.throw(E.NotatrixError);
            expect(function () { td.mergeWith(tcde); }).to.throw(E.NotatrixError);
            expect(function () { td.mergeWith(td); }).to.throw(E.NotatrixError);
            expect(function () { td.mergeWith(tf); }).to.throw(E.NotatrixError);
            expect(function () { td.mergeWith(tg); }).to.throw(E.NotatrixError);
            expect(function () { te.mergeWith(ta); }).to.throw(E.NotatrixError);
            expect(function () { te.mergeWith(tb); }).to.throw(E.NotatrixError);
            expect(function () { te.mergeWith(tcde); }).to.throw(E.NotatrixError);
            expect(function () { te.mergeWith(tc); }).to.throw(E.NotatrixError);
            expect(function () { te.mergeWith(te); }).to.throw(E.NotatrixError);
            expect(function () { te.mergeWith(tf); }).to.throw(E.NotatrixError);
            expect(function () { te.mergeWith(tg); }).to.throw(E.NotatrixError);
            expect(function () { tf.mergeWith(ta); }).to.throw(E.NotatrixError);
            expect(function () { tf.mergeWith(tb); }).to.throw(E.NotatrixError);
            expect(function () { tf.mergeWith(tcde); }).to.throw(E.NotatrixError);
            expect(function () { tf.mergeWith(tc); }).to.throw(E.NotatrixError);
            expect(function () { tf.mergeWith(td); }).to.throw(E.NotatrixError);
            expect(function () { tf.mergeWith(te); }).to.throw(E.NotatrixError);
            expect(function () { tf.mergeWith(tf); }).to.throw(E.NotatrixError);
            expect(function () { tg.mergeWith(ta); }).to.throw(E.NotatrixError);
            expect(function () { tg.mergeWith(tb); }).to.throw(E.NotatrixError);
            expect(function () { tg.mergeWith(tcde); }).to.throw(E.NotatrixError);
            expect(function () { tg.mergeWith(tc); }).to.throw(E.NotatrixError);
            expect(function () { tg.mergeWith(td); }).to.throw(E.NotatrixError);
            expect(function () { tg.mergeWith(te); }).to.throw(E.NotatrixError);
            expect(function () { tg.mergeWith(tg); }).to.throw(E.NotatrixError);
        });
        it("should merge non-subTokens correctly (basics)", function () {
            var s;
            s = Sentence.fromConllu(conllu);
            s[0].token.mergeWith(s[1].token);
            expect(s.length).to.equal(7);
            s = Sentence.fromConllu(conllu);
            s[1].token.mergeWith(s[0].token);
            expect(s.length).to.equal(7);
            s = Sentence.fromConllu(conllu);
            s[3].token.mergeWith(s[4].token);
            expect(s.length).to.equal(7);
            s = Sentence.fromConllu(conllu);
            s[4].token.mergeWith(s[3].token);
            expect(s.length).to.equal(7);
        });
        it("should merge subTokens correctly (basics)", function () {
            var s;
            s = Sentence.fromConllu(conllu);
            s[2][0].token.mergeWith(s[2][1].token);
            expect(s.length).to.equal(7);
            s = Sentence.fromConllu(conllu);
            s[2][1].token.mergeWith(s[2][0].token);
            expect(s.length).to.equal(7);
            s = Sentence.fromConllu(conllu);
            s[2][1].token.mergeWith(s[2][2].token);
            expect(s.length).to.equal(7);
            s = Sentence.fromConllu(conllu);
            s[2][2].token.mergeWith(s[2][1].token);
            expect(s.length).to.equal(7);
        });
        it("should handle dependencies through merge", function () {
            var s;
            s = Sentence.fromConllu(conllu);
            s[0].addHead(s[4], "test-head");
            s[0].addDep(s[3], "test-dep");
            s[0].token.mergeWith(s[1].token);
            expect(s[2].head).to.equal("1:test-dep");
            expect(s[3].deps).to.equal("1:test-head");
            s = Sentence.fromConllu(conllu);
            s[0].addHead(s[4], "test-head");
            s[0].addDep(s[3], "test-dep");
            s[1].token.mergeWith(s[0].token);
            expect(s[2].head).to.equal(null);
            expect(s[3].deps).to.equal(null);
            s = Sentence.fromConllu(conllu);
            s[2][0].addHead(s[2][2], "test-head");
            s[2][0].token.mergeWith(s[2][1].token);
            expect(s[2][0].head).to.equal("4:test-head");
            expect(s[2][1].deps).to.equal("3:test-head");
            s = Sentence.fromConllu(conllu);
            s[2][0].addHead(s[2][2], "test-head");
            s[2][1].token.mergeWith(s[2][0].token);
            expect(s[2][0].head).to.equal(null);
            expect(s[2][1].deps).to.equal(null);
            s = Sentence.fromConllu(conllu);
            s[2][0].addDep(s[2][2], "test-dep");
            s[2][0].token.mergeWith(s[2][1].token);
            expect(s[2][0].deps).to.equal("4:test-dep");
            expect(s[2][1].head).to.equal("3:test-dep");
            s = Sentence.fromConllu(conllu);
            s[2][0].addDep(s[2][2], "test-dep");
            s[2][1].token.mergeWith(s[2][0].token);
            expect(s[2][0].deps).to.equal(null);
            expect(s[2][1].head).to.equal(null);
        });
    });
    describe("nx deserializer", function () {
        var options = {
            help: { head: false, deps: false },
            showEmptyDependencies: false
        };
        _.each(data["CoNLL-U"], function (conllu, name) {
            it("serialize and deserialize CoNLL-U:" + name, function () {
                var nx = Sentence.fromConllu(conllu, options).nx;
                var s = Sentence.fromNx(nx);
                expect(s.nx).to.deep.equal(nx);
                expect(clean(s.conllu)).to.equal(clean(conllu));
            });
        });
        _.each(data["CG3"], function (cg3, name) {
            it("serialize and deserialize CG3:" + name, function () {
                var nx = Sentence.fromCG3(cg3, options).nx;
                var s = Sentence.fromNx(nx);
                expect(s.nx).to.deep.equal(nx);
                expect(clean(s.cg3).replace(/;/g, ""))
                    .to.equal(clean(cg3).replace(/;/g, ""));
            });
        });
        _.each(data["Plain text"], function (text, name) {
            it("serialize and deserialize Plain text:" + name, function () {
                var nx = Sentence.fromText(text, options).nx;
                var s = Sentence.fromNx(nx);
                expect(s.nx).to.deep.equal(nx);
                expect(s.text.replace(/\s*/g, "")).to.equal(text.replace(/\s*/g, ""));
            });
        });
    });
    describe("progress percentage", function () {
        var options = { help: { upostag: false, xpostag: false } };
        _.each(data["CoNLL-U"], function (conllu, name) {
            it("calculate progress for CoNLL-U:" + name, function () {
                var s = Sentence.fromConllu(conllu, options);
                expect(function () { s.progress; }).to.not.throw();
            });
        });
        _.each(data["CG3"], function (cg3, name) {
            it("calculate progress for CG3:" + name, function () {
                var s = Sentence.fromCG3(cg3, options);
                expect(function () { s.progress; }).to.not.throw();
            });
        });
        _.each(data["Plain text"], function (text, name) {
            it("calculate progress for Plain text:" + name, function () {
                var s = Sentence.fromText(text, options);
                expect(s.progress).to.equal(0);
            });
        });
    });
    describe("setEmpty", function () {
        it("should allow toggling isEmpty", function () {
            var s = Sentence.fromConllu(data["CoNNL-U"]["empty"]);
            console.log(s);
        });
    });
    describe("eles", function () {
        _.each(data["CoNLL-U"], function (conllu, name) {
            it("should not have duplicate elements for CoNLL-U:" + name, function () {
                var s = Sentence.fromConllu(conllu);
                var eles = new Set();
                _.each(s.eles, function (ele) {
                    if (eles.has(ele.data.id))
                        throw new Error("duplicate: " + ele.data.id);
                    eles.add(ele.data.id);
                });
            });
        });
        _.each(data["CG3"], function (cg3, name) {
            it("should not have duplicate elements for CG3:" + name, function () {
                var s = Sentence.fromCG3(cg3);
                var eles = new Set();
                _.each(s.eles, function (ele) {
                    if (eles.has(ele.data.id))
                        throw new Error("duplicate: " + ele.data.id);
                    eles.add(ele.data.id);
                });
            });
        });
    });
    describe("problem cases", function () {
        _.each([
            data["CoNLL-U"].nested_2, data["CoNLL-U"].t,
            data["CoNLL-U"].from_cg3_with_spans
        ], function (conllu) {
            it("should set superToken and isSubToken correctly", function () {
                var s = Sentence.fromConllu(conllu);
                _.each(s.tokens, function (token) {
                    _.each(token.subTokens, function (subToken) {
                        expect(subToken.isSubToken).to.equal(true);
                        expect(subToken.superToken instanceof Analysis).to.equal(true);
                    });
                    expect(token.isSubToken).to.equal(false);
                    expect(token.superToken).to.equal(null);
                });
            });
        });
        _.each([data["CoNLL-U"][0], data["CoNLL-U"][1]], function (conllu) {
            it("should not do the funky _;_ thing when converting between CG3", function () {
                var s1 = Sentence.fromConllu(conllu);
                var s2 = Sentence.fromCG3(s1.cg3);
                var s3 = Sentence.fromConllu(s2.conllu);
                expect(s1.conllu).to.equal(s3.conllu);
                expect(s1.cg3).to.equal(s3.cg3);
            });
        });
    });
});
//# sourceMappingURL=sentence.js.map