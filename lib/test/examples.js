"use strict";
var _ = require("underscore"), expect = require("chai").expect, utils = require("./utils");
describe("integration tests", function () {
    it("from brackets", function () {
        var nx = require("..");
        var brackets = "[root [nsubj I] have [obj [amod [advmod too] many] commitments] [advmod right now] [punct .]]";
        var sent = new nx.Sentence(brackets);
    });
    it("from CG3", function () {
        var nx = require("..");
        var cg3 = "# sent_id = mst-0001\n# text = Pe\u015Freve ba\u015Flamal\u0131.\n\"<Pe\u015Freve>\"\n\t\"pe\u015Frev\" Noun @obl #1->2\n\"<ba\u015Flamal\u0131>\"\n\t\"ba\u015Fla\" Verb SpaceAfter=No @root #2->0\n\"<.>\"\n\t\".\" Punc @punct #3->2";
        var sent = new nx.Sentence(cg3);
    });
    it("from CoNLL-U", function () {
        var nx = require("..");
        var conllu = "# sent_id = chapID01:paragID1:sentID1\n# text = \u041A\u0435\u0447\u0430\u0435\u043D\u044C \u0441\u044B\u0440\u0433\u043E\u0437\u0442\u0438\u0437\u044C \u043D\u0430\u043B\u043A\u0441\u0442\u0430\u0432\u0442\u044B\u0446\u044F \u043A\u0430\u0440\u0432\u043E\u0442 .\n# text[eng] = Kechai was awoken by annoying flies.\n1   \u041A\u0435\u0447\u0430\u0435\u043D\u044C \u041A\u0435\u0447\u0430\u0439   N   N   Sem/Ant_Mal|Prop|SP|Gen|Indef   2   obj _   \u041A\u0435\u0447\u0430\u0435\u043D\u044C\n2   \u0441\u044B\u0440\u0433\u043E\u0437\u0442\u0438\u0437\u044C  \u0441\u044B\u0440\u0433\u043E\u0437\u0442\u0435\u043C\u0441  V   V   TV|Ind|Prt1|ScPl3|OcSg3 0   root    _   \u0441\u044B\u0440\u0433\u043E\u0437\u0442\u0438\u0437\u044C\n3   \u043D\u0430\u043B\u043A\u0441\u0442\u0430\u0432\u0442\u044B\u0446\u044F    \u043D\u0430\u043B\u043A\u0441\u0442\u0430\u0432\u0442\u043E\u043C\u0441    PRC Prc V|TV|PrcPrsL|Sg|Nom|Indef   4   amod    _   \u043D\u0430\u043B\u043A\u0441\u0442\u0430\u0432\u0442\u044B\u0446\u044F\n4   \u043A\u0430\u0440\u0432\u043E\u0442  \u043A\u0430\u0440\u0432\u043E   N   N   Sem/Ani|N|Pl|Nom|Indef  2   nsubj   _   \u043A\u0430\u0440\u0432\u043E\u0442\n5   .   .   CLB CLB CLB 2   punct   _   .";
        var sent = new nx.Sentence(conllu);
    });
    it("from params", function () {
        var nx = require("..");
        var params = [{ form: "hello" }, { form: "world" }];
        var sent = new nx.Sentence(params);
    });
    it("from plain text", function () {
        var nx = require("..");
        var text = "this is my test string";
        var sent = new nx.Sentence(text);
    });
    it("from SD", function () {
        var nx = require("..");
        var sd = "He says that you like to swim\nccomp(says, like)\nmark(like, that)";
        var sent = new nx.Sentence(sd);
    });
    it("inspecting", function () {
        var nx = require("..");
        var conllu = "# text = He boued e tebr Mona er gegin.\n# text[eng] = Mona eats her food here in the kitchen.\n# labels = press_1986 ch_syntax p_197 to_check\n1\tHe\the\tdet\t_\tpos|f|sp\t2\tdet\t_\t_\n2\tboued\tboued\tn\t_\tm|sg\t4\tobj\t_\t_\n3\te\te\tvpart\t_\tobj\t4\taux\t_\t_\n4\ttebr\tdebri\u00F1\tvblex\t_\tpri|p3|sg\t0\troot\t_\t_\n5\tMona\tMona\tnp\t_\tant|f|sg\t4\tnsubj\t_\t_\n6-7\ter\t_\t_\t_\t_\t_\t_\t_\t_\n6\t_\te\tpr\t_\t_\t8\tcase\t_\t_\n7\t_\tan\tdet\t_\tdef|sp\t8\tdet\t_\t_\n8\tgegin\tkegin\tn\t_\tf|sg\t4\tobl\t_\t_\n9\t.\t.\tsent\t_\t_\t4\tpunct\t_\t_";
        var sent = new nx.Sentence(conllu);
        expect(sent.comments.length).to.equal(3);
        expect(sent.tokens.length).to.equal(8);
        expect(sent.size).to.equal(10);
    });
    it("converting", function () {
        var nx = require("..");
        var conllu = "# this is my first comment\n# here is another comment\n1\thello\thello\t_\t_\t_\t0\troot\t_\n2\t,\t,\tPUNCT\t_\t_\t1\tpunct\t_\t_\n3\tworld\tworld\t_\t_\t_\t1\t_\t_";
        var sent = new nx.Sentence(conllu);
        expect(sent.to("apertium stream")).to.equal(undefined);
        expect(sent.to("brackets")).to.deep.equal({
            output: "[root hello [punct ,] [_ world]]",
            loss: ["comments", "lemma", "upostag"]
        });
        expect(sent.to("cg3")).to.deep.equal({
            output: "# this is my first comment\n# here is another comment\n\"<hello>\"\n\t\"hello\" @root #1->0\n\"<,>\"\n\t\",\" PUNCT @punct #2->1\n\"<world>\"\n\t\"world\" #3->1",
            loss: []
        });
        expect(sent.to("conllu")).to.deep.equal({
            output: "# this is my first comment\n# here is another comment\n1\thello\thello\t_\t_\t_\t0\troot\t_\t_\n2\t,\t,\tPUNCT\t_\t_\t1\tpunct\t_\t_\n3\tworld\tworld\t_\t_\t_\t1\t_\t_\t_",
            loss: []
        });
        expect(sent.to("params")).to.deep.equal({
            output: [
                { form: "hello", lemma: "hello", head: "0" },
                { form: ",", lemma: ",", upostag: "PUNCT", head: "1" },
                { form: "world", lemma: "world", head: "1" }
            ],
            loss: ["comments"]
        });
        expect(sent.to("plain text")).to.deep.equal({
            output: "hello, world",
            loss: ["comments", "lemma", "heads", "upostag"]
        });
        expect(sent.to("sd")).to.deep.equal({
            output: "# this is my first comment\n# here is another comment\nhello, world\nroot(ROOT, hello)\npunct(hello, ,)\n_(hello, world)",
            loss: ["lemma", "upostag"]
        });
    });
});
//# sourceMappingURL=examples.js.map