"use strict";

const _ = require("underscore"), expect = require("chai").expect,
      sinon = require("sinon"), utils = require("./utils"), nx = require("..");

describe("update", () => {
  describe("case: CG3:simple // plain text", () => {
    const options = {
      checkLoss: false,
      debugUpdates: true,
    };
    const cg3 = nx.data.cg3.simple;
    const sent = new nx.Sentence(cg3, options);

    it(`should be identical if we make no changes`, () => {
      const text =
          `Патшамен соғыс ашқанда, ел-жұрт, отанымды қорғауға, біз соғысқа бардық.`

      // sanity check
      expect(sent.to("CG3").output).to.equal(cg3);
      expect(sent.to("plain text").output).to.equal(text);

      // now try the update
      sent.update(text);
      expect(sent.to("CG3").output).to.equal(cg3);
      expect(sent.to("plain text").output).to.equal(text);
    });

    it(`should incorporate changing a token form`, () => {
      // one change in form
      const text =
          `Патшамен TEST ашқанда, ел-жұрт, отанымды қорғауға, біз соғысқа бардық.`

      // sanity check
      expect(sent.to("CG3").output).to.equal(cg3);
      expect(sent.to("plain text").output).to.not.equal(cg3);

      // now try the update
      sent.update(text);
      expect(sent.to("CG3").output).to.not.equal(cg3);
      expect(sent.to("plain text").output).to.equal(text);
    });

    /*
    it(`should incorporate changing a token form`, () => {

      // one change in form
      const text = `Патшамен TEST ашқанда, ел-жұрт, отанымды қорғауға, біз
    соғысқа бардық.`

      // sanity check
      expect(sent.to('CG3').output).to.equal(orig);
      expect(sent.to('plain text').output).to.not.equal(orig);

      // now try the update
      sent.update(text);
      expect(sent.to('CG3').output).to.not.equal(orig);
      expect(sent.to('plain text').output).to.equal(text);

    });
    */
  });

  describe("case: CG3:simple // CoNLL-U", () => {
    const options = {
      checkLoss: false,
      debugUpdates: true,
    };
    const cg3 = nx.data.cg3.simple;
    const sent = new nx.Sentence(cg3, options);

    it(`should be identical if we make no changes`, () => {
      const conllu = sent.to("CoNLL-U").output;

      // now try the update
      sent.update(conllu);
      expect(sent.to("CG3").output).to.equal(cg3);
      expect(sent.to("CoNLL-U").output).to.equal(conllu);
    });

    it(`should be identical if we update a upostag`, () => {
      let conllu = sent.to("CoNLL-U").output;
      let c_sent = new nx.Sentence(conllu, options);

      // sanity check
      expect(c_sent.to("CoNLL-U").output).to.equal(conllu);

      // change a upostag
      c_sent.tokens[0].upostag = "TEST";
      conllu = c_sent.to("CoNLL-U").output;

      // now try the update
      sent.update(conllu);
      expect(sent.to("CG3").output).to.equal(cg3);
      expect(sent.to("CoNLL-U").output).to.equal(conllu);
    });

    it(`should update if we update an xpostag`, () => {
      let conllu = sent.to("CoNLL-U").output;
      let c_sent = new nx.Sentence(conllu, options);

      // sanity check
      expect(c_sent.to("CoNLL-U").output).to.equal(conllu);

      // change a upostag
      c_sent.tokens[0].xpostag = "TEST";
      conllu = c_sent.to("CoNLL-U").output;

      // now try the update
      sent.update(conllu);
      const clean = str => {
        return str.replace("\"патша\" TEST ins @nmod #1->3",
                           "\"патша\" n ins @nmod #1->3");
      };

      expect(clean(sent.to("CG3").output)).to.equal(cg3);
      expect(sent.to("CoNLL-U").output).to.equal(conllu);
    });
  });

  describe("case: CG3:kdt_tagged_3 // CG3", () => {
    it(`should be identical if we make no changes`, () => {
      const options = {
        checkLoss: false,
        debugUpdates: true,
      };
      const cg3 = nx.data.cg3.kdt_tagged_3;
      const sent = new nx.Sentence(cg3, options);

      const cg4 = sent.to("CG3").output;

      // now try the update
      sent.update(cg4);
      expect(sent.to("CG3").output).to.equal(cg3);
      expect(sent.to("CG3").output).to.equal(cg4);
    });

    it(`should update if we update an xpostag`, () => {
      const options = {
        checkLoss: false,
        debugUpdates: true,
      };
      const cg3 = nx.data.cg3.kdt_tagged_3;
      const sent = new nx.Sentence(cg3, options);

      let cg4 = sent.to("CG3").output;
      let c_sent = new nx.Sentence(cg4, options);

      // sanity check
      expect(c_sent.to("CG3").output).to.equal(cg4);

      // change a upostag
      c_sent.tokens[0].xpostag = "TEST";
      cg4 = c_sent.to("CG3").output;

      // now try the update
      sent.update(cg4);
      const clean = str => {
        return str.replace("\"манағы\" TEST dem @det #1->3",
                           "\"манағы\" det dem @det #1->3");
      };

      expect(clean(sent.to("CG3").output)).to.equal(cg3);
      expect(sent.to("CG3").output).to.equal(cg4);
    });

    it(`should update if we update an xpostag on a subToken`, () => {
      const options = {
        checkLoss: false,
        debugUpdates: true,
      };
      const cg3 = nx.data.cg3.kdt_tagged_3;
      const sent = new nx.Sentence(cg3, options);

      let cg4 = sent.to("CG3").output;
      let c_sent = new nx.Sentence(cg4, options);

      // sanity check
      expect(c_sent.to("CG3").output).to.equal(cg4);

      // change a upostag
      c_sent.tokens[3].subTokens[0].xpostag = "TEST";
      cg4 = c_sent.to("CG3").output;

      // now try the update
      sent.update(cg4);
      const clean = str => {
        return str.replace("\"кім\" TEST itg nom @root #4->0",
                           "\"кім\" prn itg nom @root #4->0");
      };

      expect(clean(sent.to("CG3").output)).to.equal(cg3);
      expect(sent.to("CG3").output).to.equal(cg4);
    });
  });

  describe("case: CG3:kdt_tagged_3 // CoNLL-U", () => {
    const options = {
      checkLoss: false,
      debugUpdates: true,
    };
    const cg3 = nx.data.cg3.kdt_tagged_3;
    const sent = new nx.Sentence(cg3, options);

    it(`should be identical if we make no changes`, () => {
      const conllu = sent.to("CoNLL-U").output;

      // now try the update
      sent.update(conllu);
      expect(sent.to("CG3").output).to.equal(cg3);
      expect(sent.to("CoNLL-U").output).to.equal(conllu);
    });

    it(`should be identical if we update a upostag`, () => {
      let conllu = sent.to("CoNLL-U").output;
      let c_sent = new nx.Sentence(conllu, options);

      // sanity check
      expect(c_sent.to("CoNLL-U").output).to.equal(conllu);

      // change a upostag
      c_sent.tokens[0].upostag = "TEST";
      conllu = c_sent.to("CoNLL-U").output;

      // now try the update
      sent.update(conllu);
      expect(sent.to("CG3").output).to.equal(cg3);
      expect(sent.to("CoNLL-U").output).to.equal(conllu);
    });

    it(`should update if we update an xpostag`, () => {
      let conllu = sent.to("CoNLL-U").output;
      let c_sent = new nx.Sentence(conllu, options);

      // sanity check
      expect(c_sent.to("CoNLL-U").output).to.equal(conllu);

      // change a upostag
      c_sent.tokens[0].xpostag = "TEST";
      conllu = c_sent.to("CoNLL-U").output;

      // now try the update
      sent.update(conllu);
      const clean = str => {
        return str.replace("\"манағы\" TEST dem @det #1->3",
                           "\"манағы\" det dem @det #1->3");
      };

      expect(clean(sent.to("CG3").output)).to.equal(cg3);
      expect(sent.to("CoNLL-U").output).to.equal(conllu);
    });
  });

  /*
  describe('case: CG3:simple // CoNLL-U', () => {

    const options = {
      checkLoss: false,
      debugUpdates: true,
    };
    const cg3 = nx.data.cg3.simple;
    const sent = new nx.Sentence(cg3, options);

    it(`should be identical if we make no changes`, () => {

      const conllu = sent.to('CoNLL-U').output;

      // now try the update
      sent.update(conllu);
      expect(sent.to('CG3').output).to.equal(cg3);
      expect(sent.to('CoNLL-U').output).to.equal(conllu);

    });

    it(`should be identical if we update a upostag`, () => {

      let conllu = sent.to('CoNLL-U').output;
      let c_sent = new nx.Sentence(conllu, options);

      // sanity check
      expect(c_sent.to('CoNLL-U').output).to.equal(conllu);

      // change a upostag
      c_sent.tokens[0].upostag = 'TEST';
      conllu = c_sent.to('CoNLL-U').output;

      // now try the update
      sent.update(conllu);
      expect(sent.to('CG3').output).to.equal(cg3);
      expect(sent.to('CoNLL-U').output).to.equal(conllu);

    });

    it(`should update if we update an xpostag`, () => {

      let conllu = sent.to('CoNLL-U').output;
      let c_sent = new nx.Sentence(conllu, options);

      // sanity check
      expect(c_sent.to('CoNLL-U').output).to.equal(conllu);

      // change a upostag
      c_sent.tokens[0].xpostag = 'TEST';
      conllu = c_sent.to('CoNLL-U').output;

      // now try the update
      sent.update(conllu);
      const clean = str => {
        return str.replace('"патша" TEST ins @nmod #1->3', '"патша" n ins
  @nmod #1->3');
      };

      expect(clean(sent.to('CG3').output)).to.equal(cg3);
      expect(sent.to('CoNLL-U').output).to.equal(conllu);

    });
  });*/
});
/*

console.log('-'.repeat(30))
console.log('>>> original CG3:\n')
console.log(cg3_simple);

cg3Sent = new nx.Sentence(cg3_simple);
toText = cg3Sent.to('plain text', { checkLoss: false });
console.log('-'.repeat(30))
console.log('>>> original CG3 => plain text:\n')
console.log(toText)

textSent = new nx.Sentence(toText);
//toCG3 = textSent.to('CG3').output;
console.log('-'.repeat(30))
console.log('>>> original CG3 => plain text => CG3:\n<ERROR>')
//console.log(toCG3)

cg3Sent.update(toText, { debugUpdates: true });
updated = cg3Sent.to('cg3').output;
console.log('-'.repeat(30))
console.log('>>> original CG3 updated from (original CG3 => plain text)');
console.log(updated)
console.log('-'.repeat(30))
console.log('>>> equal after update:', updated === cg3_simple)

second = `Патшамен TEST ашқанда, ел-жұрт, отанымды қорғауға, біз соғысқа
бардық.` console.log('-'.repeat(30)) console.log('>>> new update:')
console.log(second);

cg3Sent.update(second, { debugUpdates: true });
*/
