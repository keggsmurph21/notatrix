describe("Analysis", () => {
  describe("invalid intializer", () => {
    it(`throw a NotatrixError`, () => {
      expect(() => { let a = new Analysis(); }).to.throw(E.NotatrixError);
    });
  });

  const s = new Sentence();
  const data = [
    {inParams: undefined, outParams: {}, text: fallback},
    {inParams: null, outParams: {}, text: fallback},
    {inParams: {form: "string"}, outParams: {form: "string"}, text: "string"},
    {inParams: {ignore: "string"}, outParams: {}, text: fallback}
  ];

  _.each(data, d => {
    describe(`valid intializer`, () => {
      it(`initialize correctly`, () => {
        let t = new Token(s);
        t.params = d.inParams;
        let a = t.analysis;

        expect(a).to.be.an.instanceof(Analysis);
        expect(a.token).to.equal(t);
        expect(a.sentence).to.equal(s);
        expect(a.params).to.deep.equal(d.outParams);
        expect(a.id).to.equal(null);
        expect(a.superToken).to.equal(null);
        expect(a.subTokens).to.deep.equal([]);
        expect(a.length).to.equal(0);
        expect(a[0]).to.equal(null);
        expect(a[-1]).to.equal(null);
        expect(a[100]).to.equal(null);
        expect(a[Infinity]).to.equal(null);
        expect(a[-Infinity]).to.equal(null);
        expect(a.getSubToken(0)).to.equal(null);

        expect(a.isSuperToken).to.equal(false);
        expect(a.isSubToken).to.equal(false);
        expect(a.isCurrent).to.equal(true);

        expect(a._heads).to.deep.equal([]);
        expect(a._deps).to.deep.equal([]);
        expect(countDeps(a)).to.equal(0);
      });

      it(`return formats correctly`, () => {
        let t = new Token(s);
        t.params = d.inParams;
        let a = t.analysis;

        expect(() => { return a.conllu; })
            .to.throw(E.NotatrixError); // not indexed yet
        a.cg3;

        // even after indexing (Token not attached to Sentence yet)
        t.sentence.index();
        expect(() => { return a.conllu; }).to.throw(E.NotatrixError);
        a.cg3;
      });
    });
  });

  describe("modify contents", () => {
    it(`handles (insert|remove|move)SubTokenAt() and (push|pop)SubToken`, () => {
      let s = new Sentence();

      let t0 = new Token(s);
      let t1 = new Token(s);
      let t2 = new Token(s);
      let t3 = new Token(s);
      let t4 = new Token(s);

      let a0 = new Analysis(t0, {form: "zeroth"});
      let a1 = new Analysis(t1, {form: "first"});
      let a2 = new Analysis(t2, {form: "second"});
      let a3 = new Analysis(t3, {form: "third"});
      let a4 = new Analysis(t4, {form: "fourth"});

      t0.analysis = a0;
      t1.analysis = a1;
      t2.analysis = a2;
      t3.analysis = a3;
      t4.analysis = a4;

      expect(t0.text).to.equal("zeroth");
      expect(t1.text).to.equal("first");
      expect(t2.text).to.equal("second");
      expect(t3.text).to.equal("third");
      expect(t4.text).to.equal("fourth");

      expect(a0[0]).to.equal(null);
      expect(a1[0]).to.equal(null);
      expect(a2[0]).to.equal(null);
      expect(a3[0]).to.equal(null);
      expect(a4[0]).to.equal(null);

      expect(() => { a0.insertSubTokenAt(); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt({}); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(null); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(undefined); })
          .to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt("x"); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(0); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(0, {}); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(0, null); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(0, undefined); })
          .to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(0, a1); }).to.throw(E.NotatrixError);

      s.insertTokenAt(0, t0);

      a0.insertSubTokenAt(0, t1);

      expect(a0.subTokens).to.deep.equal([t1]);
      expect(a0[0]).to.deep.equal(a1);
      expect(a0[1]).to.equal(null);
      expect(a0.isSuperToken).to.equal(true);
      expect(a0.isSubToken).to.equal(false);

      expect(t0.subTokens).to.deep.equal([t1]);
      expect(t0.isSuperToken).to.equal(true);
      expect(t0.isSubToken).to.equal(false);

      expect(a1.superToken).to.deep.equal(a0);
      expect(a1.isSuperToken).to.equal(false);
      expect(a1.isSubToken).to.equal(true);

      expect(t1.superToken).to.deep.equal(a0);
      expect(t1.isSuperToken).to.equal(false);
      expect(t1.isSubToken).to.equal(true);

      expect(ignoreAfterLemma(s.conllu)).to.equal("1-1 zeroth _ 1 first first")

      a0.insertSubTokenAt(-1, t2);

      expect(a0.subTokens).to.deep.equal([t2, t1]);
      expect(a0[0]).to.deep.equal(a2);
      expect(a0[1]).to.equal(a1);
      expect(a0[2]).to.equal(null);
      expect(a0.isSuperToken).to.equal(true);
      expect(a0.isSubToken).to.equal(false);

      expect(t0.subTokens).to.deep.equal([t2, t1]);
      expect(t0.isSuperToken).to.equal(true);
      expect(t0.isSubToken).to.equal(false);

      expect(a2.superToken).to.deep.equal(a0);
      expect(a2.isSuperToken).to.equal(false);
      expect(a2.isSubToken).to.equal(true);

      expect(t2.superToken).to.deep.equal(a0);
      expect(t2.isSuperToken).to.equal(false);
      expect(t2.isSubToken).to.equal(true);

      expect(ignoreAfterLemma(s.conllu))
          .to.equal("1-2 zeroth _ 1 second second 2 first first")

      expect(() => { a3.insertSubTokenAt(0, t0); }).to.throw(E.NotatrixError);
      expect(() => { a3.insertSubTokenAt(0, t1); }).to.throw(E.NotatrixError);

      a0.insertSubTokenAt(1, t3);

      expect(a0.subTokens).to.deep.equal([t2, t3, t1]);
      expect(a0[0]).to.deep.equal(a2);
      expect(a0[1]).to.equal(a3);
      expect(a0[2]).to.equal(a1);
      expect(a0[3]).to.equal(null);
      expect(a0.isSuperToken).to.equal(true);
      expect(a0.isSubToken).to.equal(false);

      expect(t0.subTokens).to.deep.equal([t2, t3, t1]);
      expect(t0.isSuperToken).to.equal(true);
      expect(t0.isSubToken).to.equal(false);

      expect(a3.superToken).to.deep.equal(a0);
      expect(a3.isSuperToken).to.equal(false);
      expect(a3.isSubToken).to.equal(true);

      expect(t3.superToken).to.deep.equal(a0);
      expect(t3.isSuperToken).to.equal(false);
      expect(t3.isSubToken).to.equal(true);

      expect(ignoreAfterLemma(s.conllu))
          .to.equal("1-3 zeroth _ 1 second second 2 third third 3 first first");

      a0.insertSubTokenAt(Infinity, t4);

      expect(a0.subTokens).to.deep.equal([t2, t3, t1, t4]);
      expect(ignoreAfterLemma(s.conllu))
          .to.equal(
              "1-4 zeroth _ 1 second second 2 third third 3 first first 4 fourth fourth");

      a0.removeSubTokenAt(1);

      expect(a0.subTokens).to.deep.equal([t2, t1, t4]);
      expect(a3.superToken).to.equal(null);
      expect(a3.isSubToken).to.equal(false);
      expect(t3.isSubToken).to.equal(false);
      expect(ignoreAfterLemma(s.conllu))
          .to.equal(
              "1-3 zeroth _ 1 second second 2 first first 3 fourth fourth");

      a0.removeSubTokenAt(2);

      expect(a0.subTokens).to.deep.equal([t2, t1]);
      expect(a4.superToken).to.equal(null);
      expect(a4.isSubToken).to.equal(false);
      expect(t4.isSubToken).to.equal(false);
      expect(ignoreAfterLemma(s.conllu))
          .to.equal("1-2 zeroth _ 1 second second 2 first first");

      a0.removeSubTokenAt(-5);

      expect(a0.subTokens).to.deep.equal([t1]);
      expect(a2.superToken).to.equal(null);
      expect(a2.isSubToken).to.equal(false);
      expect(t2.isSubToken).to.equal(false);
      expect(ignoreAfterLemma(s.conllu)).to.equal("1-1 zeroth _ 1 first first");

      a0.removeSubTokenAt(Infinity);

      expect(a0.subTokens).to.deep.equal([]);
      expect(a0.isSuperToken).to.equal(false);
      expect(a1.superToken).to.equal(null);
      expect(a1.isSubToken).to.equal(false);
      expect(t1.isSubToken).to.equal(false);
      expect(ignoreAfterLemma(s.conllu)).to.equal("1 zeroth zeroth");

      let ret =
          a0.pushSubToken(t1).pushSubToken(t2).pushSubToken(t3).popSubToken();
      a0.pushSubToken(t4);

      expect(a0.subTokens).to.deep.equal([t1, t2, t4]);
      expect(ret).to.deep.equal(t3);

      a0.moveSubTokenAt(0, 2);
      expect(a0.subTokens).to.deep.equal([t2, t4, t1]);

      a0.moveSubTokenAt(1, 0);
      expect(a0.subTokens).to.deep.equal([t4, t2, t1]);

      a0.moveSubTokenAt(Infinity, -Infinity);
      expect(a0.subTokens).to.deep.equal([t1, t4, t2]);
    });
  });
});
