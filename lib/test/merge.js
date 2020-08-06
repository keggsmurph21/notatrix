"use strict";
var _ = require("underscore"), expect = require("chai").expect, sinon = require("sinon"), utils = require("./utils"), nx = require("..");
describe("merge", function () {
    it("should throw errors if given bad input", function () {
        var sent = new nx.Sentence();
        expect(function () { return sent.merge(); }).to.throw(nx.NxError);
        expect(function () { return sent.merge("a", "b"); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(1, 2); }).to.throw(nx.NxError);
        expect(function () { return sent.merge({}, {}); }).to.throw(nx.NxError);
        expect(function () { return sent.merge([], []); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(sent.tokens[0]); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(null, sent.tokens[0]); }).to.throw(nx.NxError);
    });
    it("should throw errors if one the operands is a superToken or subTokens", function () {
        var sent = new nx.Sentence(nx.data.conllu.from_cg3_with_spans);
        var tok4 = sent.tokens[4];
        var sup = sent.tokens[5];
        var sub = sup.subTokens[0];
        var tok6 = sent.tokens[6];
        expect(function () { return sent.merge(tok4, sup); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(sup, tok4); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(sup, sub); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(sub, sup); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(sup, tok6); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(tok6, sup); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(tok4, sub); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(sub, tok4); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(sub, sub); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(sub, sub); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(sub, tok6); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(tok6, sub); }).to.throw(nx.NxError);
    });
    it("should throw errors if things aren't adjacent", function () {
        var sent = new nx.Sentence(nx.data.conllu.from_cg3_with_spans);
        var tok0 = sent.tokens[0];
        var tok1 = sent.tokens[1];
        var tok2 = sent.tokens[2];
        var tok7 = sent.tokens[7];
        expect(function () { return sent.merge(tok0, tok2); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(tok2, tok0); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(tok0, tok7); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(tok7, tok0); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(tok1, tok7); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(tok7, tok1); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(tok2, tok7); }).to.throw(nx.NxError);
        expect(function () { return sent.merge(tok7, tok2); }).to.throw(nx.NxError);
    });
    it("should merge correctly for simple sentences", function () {
        var sent, tok0, tok1;
        sent = new nx.Sentence("this is a simple sentence");
        tok0 = sent.tokens[0];
        tok1 = sent.tokens[1];
        expect(sent.to("params").output).to.deep.equal([
            { form: "this" },
            { form: "is" },
            { form: "a" },
            { form: "simple" },
            { form: "sentence" },
        ]);
        sent.merge(tok0, tok1);
        expect(sent.to("params").output).to.deep.equal([
            { form: "thisis" },
            { form: "a" },
            { form: "simple" },
            { form: "sentence" },
        ]);
        sent = new nx.Sentence("this is a simple sentence");
        tok0 = sent.tokens[0];
        tok1 = sent.tokens[1];
        expect(sent.to("params").output).to.deep.equal([
            { form: "this" },
            { form: "is" },
            { form: "a" },
            { form: "simple" },
            { form: "sentence" },
        ]);
        sent.merge(tok1, tok0);
        expect(sent.to("params").output).to.deep.equal([
            { form: "isthis" },
            { form: "a" },
            { form: "simple" },
            { form: "sentence" },
        ]);
    });
    it("should merge correctly for sentences with dependencies", function () {
        var sent, tok0, tok1, tok2;
        var reset = function () {
            sent = new nx.Sentence("a b c");
            tok0 = sent.tokens[0];
            tok1 = sent.tokens[1];
            tok2 = sent.tokens[2];
        };
        reset();
        tok0.addHead(tok1);
        expect(sent.to("params").output).to.deep.equal([
            { form: "a", head: "2" },
            { form: "b" },
            { form: "c" },
        ]);
        sent.merge(tok0, tok1);
        expect(sent.to("params").output).to.deep.equal([
            { form: "ab" },
            { form: "c" },
        ]);
        reset();
        tok1.addHead(tok0);
        expect(sent.to("params").output).to.deep.equal([
            { form: "a" },
            { form: "b", head: "1" },
            { form: "c" },
        ]);
        sent.merge(tok0, tok1);
        expect(sent.to("params").output).to.deep.equal([
            { form: "ab" },
            { form: "c" },
        ]);
        reset();
        tok0.addHead(tok2);
        expect(sent.to("params").output).to.deep.equal([
            { form: "a", head: "3" },
            { form: "b" },
            { form: "c" },
        ]);
        sent.merge(tok0, tok1);
        expect(sent.to("params").output).to.deep.equal([
            { form: "ab", head: "2" },
            { form: "c" },
        ]);
        reset();
        tok2.addHead(tok0);
        expect(sent.to("params").output).to.deep.equal([
            { form: "a" },
            { form: "b" },
            { form: "c", head: "1" },
        ]);
        sent.merge(tok0, tok1);
        expect(sent.to("params").output).to.deep.equal([
            { form: "ab" },
            { form: "c", head: "1" },
        ]);
        reset();
        tok1.addHead(tok2);
        expect(sent.to("params").output).to.deep.equal([
            { form: "a" },
            { form: "b", head: "3" },
            { form: "c" },
        ]);
        sent.merge(tok0, tok1);
        expect(sent.to("params").output).to.deep.equal([
            { form: "ab" },
            { form: "c" },
        ]);
        reset();
        tok2.addHead(tok1);
        expect(sent.to("params").output).to.deep.equal([
            { form: "a" },
            { form: "b" },
            { form: "c", head: "2" },
        ]);
        sent.merge(tok0, tok1);
        expect(sent.to("params").output).to.deep.equal([
            { form: "ab" },
            { form: "c", head: "1" },
        ]);
    });
    it("should merge other fields in a sane way", function () {
        var sent = new nx.Sentence("# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n1\tHe\the\tdet\t_\tpos|f|sp\t2\tdet\t_\t_\n2\tboued\tboued\tn\t_\tm|sg\t4\tobj\t_\t_\n3\te\te\tvpart\t_\tobj\t4\taux\t_\t_\n4\ttebr\tdebri\u00F1\tvblex\t_\tpri|p3|sg\t0\troot\t_\t_\n5\tMona\tMona\tnp\t_\tant|f|sg\t4\tnsubj\t_\t_\n6-7\ter\t_\t_\t_\t_\t_\t_\t_\t_\n6\t_\te\tpr\t_\t_\t8\tcase\t_\t_\n7\t_\tan\tdet\t_\tdef|sp\t8\tdet\t_\t_\n8\tgegin\tkegin\tn\t_\tf|sg\t4\tobl\t_\t_\n9\t.\t.\tsent\t_\t_\t4\tpunct\t_\t_");
        var tok6 = sent.tokens[6];
        var tok7 = sent.tokens[7];
        sent.merge(tok7, tok6);
        expect(sent.to("conllu").output)
            .to.equal("# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n1\tHe\the\tdet\t_\tpos|f|sp\t2\tdet\t_\t_\n2\tboued\tboued\tn\t_\tm|sg\t4\tobj\t_\t_\n3\te\te\tvpart\t_\tobj\t4\taux\t_\t_\n4\ttebr\tdebri\u00F1\tvblex\t_\tpri|p3|sg\t0\troot\t_\t_\n5\tMona\tMona\tnp\t_\tant|f|sg\t4\tnsubj\t_\t_\n6-7\ter\t_\t_\t_\t_\t_\t_\t_\t_\n6\t_\te\tpr\t_\t_\t8\tcase\t_\t_\n7\t_\tan\tdet\t_\tdef|sp\t8\tdet\t_\t_\n8\t.gegin\t.\tsent\t_\tf|sg\t4\tpunct\t_\t_");
    });
});
//# sourceMappingURL=merge.js.map