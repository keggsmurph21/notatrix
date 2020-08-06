"use strict";
describe("Token", function () {
    describe("invalid intializer", function () {
        it("throw a NotatrixError", function () {
            expect(function () { var t = new Token(); }).to.throw(E.NotatrixError);
        });
    });
    var s = new Sentence();
    var data = [{}];
    _.each(data, function (d) {
        describe("valid initializer", function () {
            it("initialize correctly", function () {
                var t = new Token(s);
                expect(t.sentence).to.equal(s);
                expect(t.current).to.equal(null);
                expect(t.analyses).to.deep.equal([]);
                expect(t.analysis).to.equal(null);
                expect(t.length).to.equal(0);
                expect(t.subTokens).to.equal(null);
                expect(t.isSubToken).to.equal(false);
                expect(t.isSuperToken).to.equal(null);
                expect(t.isEmpty).to.equal(false);
                expect(t.isAmbiguous).to.equal(false);
            });
            it("return formats correctly", function () {
                var t = new Token(s);
                expect(function () { return t.text; }).to.throw(E.NotatrixError);
                expect(function () { return t.conllu; }).to.throw(E.NotatrixError);
                expect(function () { return t.cg3; }).to.throw(E.NotatrixError);
                expect(function () { return t.params; }).to.throw(E.NotatrixError);
                t.sentence.index();
                expect(function () { return t.text; }).to.throw(E.NotatrixError);
                expect(function () { return t.conllu; }).to.throw(E.NotatrixError);
                expect(function () { return t.cg3; }).to.throw(E.NotatrixError);
                expect(function () { return t.params; }).to.throw(E.NotatrixError);
            });
        });
        describe("valid after initializing first Analysis", function () {
            it("initialize directly with params", function () {
                var t = new Token(s, { form: "testing" });
                expect(t.current).to.equal(0);
                expect(forms(t)).to.equal("testing");
                expect(t.analysis).to.be.an.instanceof(Analysis);
                expect(t.analysis.form).to.equal("testing");
                expect(t.length).to.equal(1);
                expect(t.subTokens).to.deep.equal([]);
                expect(t.isSubToken).to.equal(false);
                expect(t.isSuperToken).to.equal(false);
                expect(t.isEmpty).to.equal(false);
                expect(t.isAmbiguous).to.equal(false);
            });
            it("initialize with = operator", function () {
                var t = new Token(s);
                t.params = {
                    form: "testing"
                };
                expect(t.current).to.equal(0);
                expect(forms(t)).to.equal("testing");
                expect(t.analysis).to.be.an.instanceof(Analysis);
                expect(t.analysis.form).to.equal("testing");
                expect(t.length).to.equal(1);
                expect(t.subTokens).to.deep.equal([]);
                expect(t.isSubToken).to.equal(false);
                expect(t.isSuperToken).to.equal(false);
                expect(t.isEmpty).to.equal(false);
                expect(t.isAmbiguous).to.equal(false);
            });
            it("initialize with Token.insertAnalysisAt() method", function () {
                var t = new Token(s);
                t.insertAnalysisAt(0, new Analysis(t, { form: "testing" }));
                expect(t.current).to.equal(0);
                expect(forms(t)).to.equal("testing");
                expect(t.analysis).to.be.an.instanceof(Analysis);
                expect(t.analysis.form).to.equal("testing");
                expect(t.length).to.equal(1);
                expect(t.subTokens).to.deep.equal([]);
                expect(t.isSubToken).to.equal(false);
                expect(t.isSuperToken).to.equal(false);
                expect(t.isAmbiguous).to.equal(false);
            });
            it("has equivalent initializers", function () {
                var params = { form: "testing" };
                var tokens = [
                    new Token(s, params), new Token(s), new Token(s),
                    Token.fromParams(s, params), Token.fromConllu(s, "1\ttesting"),
                ];
                tokens[1].params = params;
                tokens[2].pushAnalysis(new Analysis(tokens[2], params));
                _.each(tokens, function (token) { expect(token).to.deep.equal(tokens[0]); });
            });
            it("return formats correctly", function () {
                var t = new Token(s);
                t.params = { form: "testing" };
                expect(t.text).to.equal("testing");
                expect(function () { t.conllu; }).to.throw(E.NotatrixError);
                expect(t.params).to.deep.equal({ form: "testing" });
                t.sentence.index();
                expect(function () { return t.conllu; })
                    .to.throw(E.NotatrixError);
                s.pushToken(t);
                expect(ignoreAfterLemma(t.conllu)).to.equal("1 testing testing");
            });
        });
    });
    describe("modify contents", function () {
        it("handles (insert|remove|move)AnalysisAt() and (push|pop)Analysis", function () {
            var s = new Sentence();
            var t = new Token(s);
            t.params = { form: "zeroth" };
            var a1 = new Analysis(t, { form: "first" });
            var a2 = new Analysis(t, { form: "second" });
            var a3 = new Analysis(t, { form: "third" });
            var a4 = new Analysis(t, { form: "fourth" });
            var a5 = null;
            expect(forms(t)).to.equal("zeroth");
            t.insertAnalysisAt(0, a1);
            expect(forms(t)).to.equal("first zeroth");
            t.insertAnalysisAt(1, a2);
            expect(forms(t)).to.equal("first second zeroth");
            t.insertAnalysisAt(-1, a3);
            expect(forms(t)).to.equal("third first second zeroth");
            t.insertAnalysisAt(Infinity, a4);
            expect(forms(t)).to.equal("third first second zeroth fourth");
            t.removeAnalysisAt(0);
            expect(forms(t)).to.equal("first second zeroth fourth");
            t.removeAnalysisAt(1);
            expect(forms(t)).to.equal("first zeroth fourth");
            t.removeAnalysisAt(-1);
            expect(forms(t)).to.equal("zeroth fourth");
            t.removeAnalysisAt(Infinity);
            expect(forms(t)).to.equal("zeroth");
            expect(t.current).to.equal(0);
            expect(t.analysis.form).to.equal("zeroth");
            t.removeAnalysisAt(Infinity);
            expect(forms(t)).to.equal("");
            expect(t.current).to.equal(null);
            expect(t.analysis).to.equal(null);
            t.removeAnalysisAt(0);
            expect(forms(t)).to.equal("");
            t.removeAnalysisAt(-3);
            expect(forms(t)).to.equal("");
            t.insertAnalysisAt(6, a1);
            expect(forms(t)).to.equal("first");
            expect(t.current).to.equal(0);
            expect(t.analysis.form).to.equal("first");
            t.insertAnalysisAt(6, a2);
            expect(forms(t)).to.equal("first second");
            t.insertAnalysisAt(6, a3).insertAnalysisAt(6, a4);
            expect(forms(t)).to.equal("first second third fourth");
            t.moveAnalysisAt(0, 1);
            expect(forms(t)).to.equal("second first third fourth");
            t.moveAnalysisAt(0, 10);
            expect(forms(t)).to.equal("first third fourth second");
            t.moveAnalysisAt(-2, 2);
            expect(forms(t)).to.equal("third fourth first second");
            t.moveAnalysisAt(Infinity, Infinity);
            expect(forms(t)).to.equal("third fourth first second");
            var ret = t.popAnalysis();
            expect(forms(t)).to.equal("third fourth first");
            expect(ret.form).to.equal("second");
            t.pushAnalysis(a2).pushAnalysis(a2).pushAnalysis(a2).pushAnalysis(a2);
            expect(forms(t)).to.equal("third fourth first second second second second");
            expect(function () { t.insertAnalysisAt(0, a5); }).to.throw(E.NotatrixError);
        });
        it("has consistent get, set, prev, next", function () {
            var s = new Sentence();
            var t = new Token(s);
            expect(forms(t)).to.equal("");
            t.insertAnalysisAt(0, new Analysis(t, { form: "first" }));
            t.insertAnalysisAt(1, new Analysis(t, { form: "second" }));
            t.insertAnalysisAt(2, new Analysis(t, { form: "third" }));
            t.insertAnalysisAt(3, new Analysis(t, { form: "fourth" }));
            expect(forms(t)).to.equal("first second third fourth");
            expect(t.analysis.form).to.equal("first");
            t.next();
            expect(t.analysis.form).to.equal("second");
            t.next();
            expect(t.analysis.form).to.equal("third");
            t.next();
            expect(t.analysis.form).to.equal("fourth");
            t.next();
            expect(t.analysis.form).to.equal("fourth");
            t.prev();
            expect(t.analysis.form).to.equal("third");
            t.prev();
            expect(t.analysis.form).to.equal("second");
            t.prev();
            expect(t.analysis.form).to.equal("first");
            t.prev();
            expect(t.analysis.form).to.equal("first");
            t.current = 0;
            expect(t.analysis.form).to.equal("first");
            t.current = 2;
            expect(t.analysis.form).to.equal("third");
            t.current = Infinity;
            expect(t.analysis.form).to.equal("third");
            t.current = -Infinity;
            expect(t.analysis.form).to.equal("third");
        });
    });
});
//# sourceMappingURL=token.js.map