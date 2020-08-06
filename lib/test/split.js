"use strict";
var _ = require("underscore"), expect = require("chai").expect, sinon = require("sinon"), utils = require("./utils"), nx = require("..");
describe("split", function () {
    it("should throw errors if given bad input", function () {
        var sent = new nx.Sentence("test");
        expect(function () { return sent.split(); }).to.throw(nx.NxError);
        expect(function () { return sent.split("a"); }).to.throw(nx.NxError);
        expect(function () { return sent.split(1); }).to.throw(nx.NxError);
        expect(function () { return sent.split({}); }).to.throw(nx.NxError);
        expect(function () { return sent.split([]); }).to.throw(nx.NxError);
        expect(function () { return sent.split(null); }).to.throw(nx.NxError);
        expect(function () { return sent.split(sent.tokens[0]); }).to.throw(nx.NxError);
        expect(function () { return sent.split(sent.tokens[0], sent.tokens[1]); })
            .to.throw(nx.NxError);
        expect(function () { return sent.split(sent.tokens[0], "a"); }).to.throw(nx.NxError);
        expect(function () { return sent.split(sent.tokens[0], {}); }).to.throw(nx.NxError);
        expect(function () { return sent.split(sent.tokens[0], []); }).to.throw(nx.NxError);
        expect(function () { return sent.split(sent.tokens[0], null); }).to.throw(nx.NxError);
    });
    it("should split regular tokens correctly for simple sentences", function () {
        var sent, tok0;
        var reset = function () {
            sent = new nx.Sentence("1\ttesting\t_\t_\t_\t_\t_\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t_\t_\t_\t_");
            tok0 = sent.tokens[0];
        };
        reset();
        sent.split(tok0, 0);
        expect(sent.to("conllu").output).to.equal("1\t_\t_\t_\t_\t_\t_\t_\t_\t_\n2\ttesting\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        sent.split(tok0, -10);
        expect(sent.to("conllu").output).to.equal("1\t_\t_\t_\t_\t_\t_\t_\t_\t_\n2\ttesting\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        sent.split(tok0, 10);
        expect(sent.to("conllu").output).to.equal("1\ttesting\t_\t_\t_\t_\t_\t_\t_\t_\n2\t_\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        sent.split(tok0, 2);
        expect(sent.to("conllu").output).to.equal("1\tte\t_\t_\t_\t_\t_\t_\t_\t_\n2\tsting\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
    });
    it("should split regular tokens correctly for sentences with dependencies", function () {
        var sent, tok0;
        var reset = function () {
            sent = new nx.Sentence("1\ttesting\t_\t_\t_\t_\t3\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t_\t_\t_\t_");
            tok0 = sent.tokens[0];
        };
        reset();
        sent.split(tok0, 0);
        expect(sent.to("conllu").output).to.equal("1\t_\t_\t_\t_\t_\t4\t_\t_\t_\n2\ttesting\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        sent.split(tok0, -10);
        expect(sent.to("conllu").output).to.equal("1\t_\t_\t_\t_\t_\t4\t_\t_\t_\n2\ttesting\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        sent.split(tok0, 10);
        expect(sent.to("conllu").output).to.equal("1\ttesting\t_\t_\t_\t_\t4\t_\t_\t_\n2\t_\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        sent.split(tok0, 2);
        expect(sent.to("conllu").output).to.equal("1\tte\t_\t_\t_\t_\t4\t_\t_\t_\n2\tsting\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        sent = new nx.Sentence("# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n1\tHe\the\tdet\t_\tpos|f|sp\t2\tdet\t_\t_\n2\tboued\tboued\tn\t_\tm|sg\t4\tobj\t_\t_\n3\te\te\tvpart\t_\tobj\t4\taux\t_\t_\n4\ttebr\tdebri\u00F1\tvblex\t_\tpri|p3|sg\t0\troot\t_\t_\n5\tMona\tMona\tnp\t_\tant|f|sg\t4\tnsubj\t_\t_\n6-7\ter\t_\t_\t_\t_\t_\t_\t_\t_\n6\t_\te\tpr\t_\t_\t8\tcase\t_\t_\n7\t_\tan\tdet\t_\tdef|sp\t8\tdet\t_\t_\n8\tgegin\tkegin\tn\t_\tf|sg\t4\tobl\t_\t_\n9\t.\t.\tsent\t_\t_\t4\tpunct\t_\t_");
        sent.split(sent.tokens[1], 2);
        expect(sent.to("conllu").output)
            .to.equal("# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n1\tHe\the\tdet\t_\tpos|f|sp\t2\tdet\t_\t_\n2\tbo\tboued\tn\t_\tm|sg\t5\tobj\t_\t_\n3\tued\t_\t_\t_\t_\t_\t_\t_\t_\n4\te\te\tvpart\t_\tobj\t5\taux\t_\t_\n5\ttebr\tdebri\u00F1\tvblex\t_\tpri|p3|sg\t0\troot\t_\t_\n6\tMona\tMona\tnp\t_\tant|f|sg\t5\tnsubj\t_\t_\n7-8\ter\t_\t_\t_\t_\t_\t_\t_\t_\n7\t_\te\tpr\t_\t_\t9\tcase\t_\t_\n8\t_\tan\tdet\t_\tdef|sp\t9\tdet\t_\t_\n9\tgegin\tkegin\tn\t_\tf|sg\t5\tobl\t_\t_\n10\t.\t.\tsent\t_\t_\t5\tpunct\t_\t_");
    });
    it("should split superTokens correctly for simple sentences", function () {
        var s1 = new nx.Sentence("1-2\tab\t_\t_\t_\t_\t_\t_\t_\t_\n1\ta\t_\t_\t_\t_\t_\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        s1.split(s1.tokens[0]);
        expect(s1.to("conllu").output).to.equal("1\ta\t_\t_\t_\t_\t_\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        var s2 = new nx.Sentence("1-3\tabc\t_\t_\t_\t_\t_\t_\t_\t_\n1\ta\t_\t_\t_\t_\t_\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t_\t_\t_\t_\n4\td\t_\t_\t_\t_\t_\t_\t_\t_");
        s2.split(s2.tokens[0]);
        expect(s2.to("conllu").output).to.equal("1\ta\t_\t_\t_\t_\t_\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t_\t_\t_\t_\n4\td\t_\t_\t_\t_\t_\t_\t_\t_");
    });
    it("should split superTokens correctly for sentences with dependencies", function () {
        var sent, tok0, sub0, sub1, tok1;
        var reset = function () {
            sent = new nx.Sentence("1-2\tab\t_\t_\t_\t_\t_\t_\t_\t_\n1\ta\t_\t_\t_\t_\t_\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t_\t_\t_\t_");
            tok0 = sent.tokens[0];
            sub0 = tok0.subTokens[0];
            sub1 = tok0.subTokens[1];
            tok1 = sent.tokens[1];
        };
        reset();
        sub0.addHead(tok1);
        expect(sent.to("conllu").output).to.equal("1-2\tab\t_\t_\t_\t_\t_\t_\t_\t_\n1\ta\t_\t_\t_\t_\t3\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        sent.split(tok0);
        expect(sent.to("conllu").output).to.equal("1\ta\t_\t_\t_\t_\t3\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        tok1.addHead(sub0);
        expect(sent.to("conllu").output).to.equal("1-2\tab\t_\t_\t_\t_\t_\t_\t_\t_\n1\ta\t_\t_\t_\t_\t_\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t1\t_\t_\t_");
        sent.split(tok0);
        expect(sent.to("conllu").output).to.equal("1\ta\t_\t_\t_\t_\t_\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t1\t_\t_\t_");
        sent = new nx.Sentence("# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n1\tHe\the\tdet\t_\tpos|f|sp\t2\tdet\t_\t_\n2\tboued\tboued\tn\t_\tm|sg\t4\tobj\t_\t_\n3\te\te\tvpart\t_\tobj\t4\taux\t_\t_\n4\ttebr\tdebri\u00F1\tvblex\t_\tpri|p3|sg\t0\troot\t_\t_\n5\tMona\tMona\tnp\t_\tant|f|sg\t4\tnsubj\t_\t_\n6-7\ter\t_\t_\t_\t_\t_\t_\t_\t_\n6\t_\te\tpr\t_\t_\t8\tcase\t_\t_\n7\t_\tan\tdet\t_\tdef|sp\t8\tdet\t_\t_\n8\tgegin\tkegin\tn\t_\tf|sg\t4\tobl\t_\t_\n9\t.\t.\tsent\t_\t_\t4\tpunct\t_\t_");
        sent.split(sent.tokens[5]);
        expect(sent.to("conllu").output)
            .to.equal("# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n1\tHe\the\tdet\t_\tpos|f|sp\t2\tdet\t_\t_\n2\tboued\tboued\tn\t_\tm|sg\t4\tobj\t_\t_\n3\te\te\tvpart\t_\tobj\t4\taux\t_\t_\n4\ttebr\tdebri\u00F1\tvblex\t_\tpri|p3|sg\t0\troot\t_\t_\n5\tMona\tMona\tnp\t_\tant|f|sg\t4\tnsubj\t_\t_\n6\t_\te\tpr\t_\t_\t8\tcase\t_\t_\n7\t_\tan\tdet\t_\tdef|sp\t8\tdet\t_\t_\n8\tgegin\tkegin\tn\t_\tf|sg\t4\tobl\t_\t_\n9\t.\t.\tsent\t_\t_\t4\tpunct\t_\t_");
    });
    it("should split subTokens correctly for simple sentences", function () {
        var sent, sub0;
        var reset = function () {
            sent = new nx.Sentence("1-2\ttestingb\t_\t_\t_\t_\t_\t_\t_\t_\n1\ttesting\t_\t_\t_\t_\t_\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t_\t_\t_\t_");
            sub0 = sent.tokens[0].subTokens[0];
        };
        reset();
        sent.split(sub0, 0);
        expect(sent.to("conllu").output).to.equal("1-3\ttestingb\t_\t_\t_\t_\t_\t_\t_\t_\n1\t_\t_\t_\t_\t_\t_\t_\t_\t_\n2\ttesting\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        sent.split(sub0, -10);
        expect(sent.to("conllu").output).to.equal("1-3\ttestingb\t_\t_\t_\t_\t_\t_\t_\t_\n1\t_\t_\t_\t_\t_\t_\t_\t_\t_\n2\ttesting\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        sent.split(sub0, 10);
        expect(sent.to("conllu").output).to.equal("1-3\ttestingb\t_\t_\t_\t_\t_\t_\t_\t_\n1\ttesting\t_\t_\t_\t_\t_\t_\t_\t_\n2\t_\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        sent.split(sub0, 2);
        expect(sent.to("conllu").output).to.equal("1-3\ttestingb\t_\t_\t_\t_\t_\t_\t_\t_\n1\tte\t_\t_\t_\t_\t_\t_\t_\t_\n2\tsting\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
    });
    it("should split subTokens correctly for sentences with dependencies", function () {
        var sent, sub0;
        var reset = function () {
            sent = new nx.Sentence("1-2\ttestingb\t_\t_\t_\t_\t_\t_\t_\t_\n1\ttesting\t_\t_\t_\t_\t3\t_\t_\t_\n2\tb\t_\t_\t_\t_\t_\t_\t_\t_\n3\tc\t_\t_\t_\t_\t_\t_\t_\t_");
            sub0 = sent.tokens[0].subTokens[0];
        };
        reset();
        sent.split(sub0, 0);
        expect(sent.to("conllu").output).to.equal("1-3\ttestingb\t_\t_\t_\t_\t_\t_\t_\t_\n1\t_\t_\t_\t_\t_\t4\t_\t_\t_\n2\ttesting\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        sent.split(sub0, -10);
        expect(sent.to("conllu").output).to.equal("1-3\ttestingb\t_\t_\t_\t_\t_\t_\t_\t_\n1\t_\t_\t_\t_\t_\t4\t_\t_\t_\n2\ttesting\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        sent.split(sub0, 10);
        expect(sent.to("conllu").output).to.equal("1-3\ttestingb\t_\t_\t_\t_\t_\t_\t_\t_\n1\ttesting\t_\t_\t_\t_\t4\t_\t_\t_\n2\t_\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        reset();
        sent.split(sub0, 2);
        expect(sent.to("conllu").output).to.equal("1-3\ttestingb\t_\t_\t_\t_\t_\t_\t_\t_\n1\tte\t_\t_\t_\t_\t4\t_\t_\t_\n2\tsting\t_\t_\t_\t_\t_\t_\t_\t_\n3\tb\t_\t_\t_\t_\t_\t_\t_\t_\n4\tc\t_\t_\t_\t_\t_\t_\t_\t_");
        sent = new nx.Sentence("# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n1\tHe\the\tdet\t_\tpos|f|sp\t2\tdet\t_\t_\n2\tboued\tboued\tn\t_\tm|sg\t4\tobj\t_\t_\n3\te\te\tvpart\t_\tobj\t4\taux\t_\t_\n4\ttebr\tdebri\u00F1\tvblex\t_\tpri|p3|sg\t0\troot\t_\t_\n5\tMona\tMona\tnp\t_\tant|f|sg\t4\tnsubj\t_\t_\n6-7\ter\t_\t_\t_\t_\t_\t_\t_\t_\n6\ttest_1\te\tpr\t_\t_\t8\tcase\t_\t_\n7\ttest_2\tan\tdet\t_\tdef|sp\t8\tdet\t_\t_\n8\tgegin\tkegin\tn\t_\tf|sg\t4\tobl\t_\t_\n9\t.\t.\tsent\t_\t_\t4\tpunct\t_\t_");
        sent.split(sent.tokens[5].subTokens[1], 2);
        expect(sent.to("conllu").output)
            .to.equal("# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n1\tHe\the\tdet\t_\tpos|f|sp\t2\tdet\t_\t_\n2\tboued\tboued\tn\t_\tm|sg\t4\tobj\t_\t_\n3\te\te\tvpart\t_\tobj\t4\taux\t_\t_\n4\ttebr\tdebri\u00F1\tvblex\t_\tpri|p3|sg\t0\troot\t_\t_\n5\tMona\tMona\tnp\t_\tant|f|sg\t4\tnsubj\t_\t_\n6-8\ter\t_\t_\t_\t_\t_\t_\t_\t_\n6\ttest_1\te\tpr\t_\t_\t9\tcase\t_\t_\n7\tte\tan\tdet\t_\tdef|sp\t9\tdet\t_\t_\n8\tst_2\t_\t_\t_\t_\t_\t_\t_\t_\n9\tgegin\tkegin\tn\t_\tf|sg\t4\tobl\t_\t_\n10\t.\t.\tsent\t_\t_\t4\tpunct\t_\t_");
    });
});
//# sourceMappingURL=split.js.map