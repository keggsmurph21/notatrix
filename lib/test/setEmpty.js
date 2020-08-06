"use strict";
var _ = require("underscore"), expect = require("chai").expect, sinon = require("sinon"), utils = require("./utils"), nx = require(".."), data = require("../data");
describe("setEmpty", function () {
    it("toggling isEmpty on trivial data", function () {
        var s = new nx.Sentence(data["CoNLL-U"]["empty"]);
        expect(s.to("CoNLL-U").output).to.equal("1\tSue\tSue\t_\t_\t_\t_\t_\t_\t_\n2\tlikes\tlike\t_\t_\t_\t_\t_\t_\t_\n3\tcoffee\tcoffee\t_\t_\t_\t_\t_\t_\t_\n4\tand\tand\t_\t_\t_\t_\t_\t_\t_\n5\tBill\tBill\t_\t_\t_\t_\t_\t_\t_\n5.1\tlikes\tlike\t_\t_\t_\t_\t_\t_\t_\n6\ttea\ttea\t_\t_\t_\t_\t_\t_\t_");
        s.tokens[1].setEmpty(true);
        expect(s.to("CoNLL-U").output).to.equal("1\tSue\tSue\t_\t_\t_\t_\t_\t_\t_\n1.1\tlikes\tlike\t_\t_\t_\t_\t_\t_\t_\n2\tcoffee\tcoffee\t_\t_\t_\t_\t_\t_\t_\n3\tand\tand\t_\t_\t_\t_\t_\t_\t_\n4\tBill\tBill\t_\t_\t_\t_\t_\t_\t_\n4.1\tlikes\tlike\t_\t_\t_\t_\t_\t_\t_\n5\ttea\ttea\t_\t_\t_\t_\t_\t_\t_");
        s.tokens[2].setEmpty(true);
        expect(s.to("CoNLL-U").output).to.equal("1\tSue\tSue\t_\t_\t_\t_\t_\t_\t_\n1.1\tlikes\tlike\t_\t_\t_\t_\t_\t_\t_\n1.2\tcoffee\tcoffee\t_\t_\t_\t_\t_\t_\t_\n2\tand\tand\t_\t_\t_\t_\t_\t_\t_\n3\tBill\tBill\t_\t_\t_\t_\t_\t_\t_\n3.1\tlikes\tlike\t_\t_\t_\t_\t_\t_\t_\n4\ttea\ttea\t_\t_\t_\t_\t_\t_\t_");
        s.tokens[1].setEmpty(false);
        s.tokens[2].setEmpty(false);
        expect(s.to("CoNLL-U").output).to.equal("1\tSue\tSue\t_\t_\t_\t_\t_\t_\t_\n2\tlikes\tlike\t_\t_\t_\t_\t_\t_\t_\n3\tcoffee\tcoffee\t_\t_\t_\t_\t_\t_\t_\n4\tand\tand\t_\t_\t_\t_\t_\t_\t_\n5\tBill\tBill\t_\t_\t_\t_\t_\t_\t_\n5.1\tlikes\tlike\t_\t_\t_\t_\t_\t_\t_\n6\ttea\ttea\t_\t_\t_\t_\t_\t_\t_");
    });
    it("toggling isEmpty on data with relations", function () {
        var s = new nx.Sentence(data["CoNLL-U"]["ud_example_tabs"]);
        expect(s.to("CoNLL-U").output)
            .to.equal("1\tThey\tthey\tPRON\tPRP\tCase=Nom|Number=Plur\t2\tnsubj\t2:nsubj|4:nsubj\t_\n2\tbuy\tbuy\tVERB\tVBP\tNumber=Plur|Person=3|Tense=Pres\t0\troot\t0:root\t_\n3\tand\tand\tCONJ\tCC\t_\t4\tcc\t4:cc\t_\n4\tsell\tsell\tVERB\tVBP\tNumber=Plur|Person=3|Tense=Pres\t2\tconj\t2:conj\t_\n5\tbooks\tbook\tNOUN\tNNS\tNumber=Plur\t2\tobj\t2:obj|4:obj\t_\n6\t.\t.\tPUNCT\t.\t_\t2\tpunct\t2:punct\t_");
        s.tokens[2].setEmpty(true);
        expect(s.to("CoNLL-U").output)
            .to.equal("1\tThey\tthey\tPRON\tPRP\tCase=Nom|Number=Plur\t2\tnsubj\t2:nsubj|3:nsubj\t_\n2\tbuy\tbuy\tVERB\tVBP\tNumber=Plur|Person=3|Tense=Pres\t0\troot\t0:root\t_\n2.1\tand\tand\tCONJ\tCC\t_\t_\t_\t3:cc\t_\n3\tsell\tsell\tVERB\tVBP\tNumber=Plur|Person=3|Tense=Pres\t2\tconj\t2:conj\t_\n4\tbooks\tbook\tNOUN\tNNS\tNumber=Plur\t2\tobj\t2:obj|3:obj\t_\n5\t.\t.\tPUNCT\t.\t_\t2\tpunct\t2:punct\t_");
    });
});
//# sourceMappingURL=setEmpty.js.map