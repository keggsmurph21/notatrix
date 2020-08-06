"use strict";

const _ = require("underscore"), expect = require("chai").expect,
      sinon = require("sinon"), utils = require("./utils"), nx = require("..");

describe("Sentence", () => {
  describe("valid initializer", () => {
    it(`initialize correctly`, () => {
      let s = new Sentence();

      expect(s.comments).to.deep.equal([]);
      // expect(s.conlluLoaded).to.equal(false);
      // expect(s.cg3Loaded).to.equal(false);
      expect(s.tokens).to.deep.equal([]);
      expect(s.length).to.equal(0);

      expect(s.isValidConllu).to.equal(true);
      expect(s.isValidCG3).to.equal(true);
    });

    it(`well-defined getter behavior`, () => {
      let s = new Sentence();

      expect(s.getComment(0)).to.equal(null);
      expect(s.getToken(0)).to.equal(null);
      expect(s[0]).to.equal(null); // analysis
      expect(s.getById(0)).to.equal(null);
    });

    it(`return formats correctly`, () => {
      let s = new Sentence();

      expect(s.text).to.equal("");
      expect(s.conllu).to.equal("");
      // expect(s.cg3).to.equal('');
      expect(s.params).to.deep.equal([]);
    });
  });

  describe(`valid after initializing first Analysis`, () => {
    let params = [{form: "hello"}, {form: "world"}];

    it(`initialize directly with params`, () => {
      let s = new Sentence(params);

      expect(s.comments).to.deep.equal([]);
      // expect(s.conlluLoaded).to.equal(false);
      // expect(s.cg3Loaded).to.equal(false);
      expect(currentForms(s)).to.equal("hello world");
      expect(s.length).to.equal(2);

      expect(s.isValidConllu).to.equal(true);
      expect(s.isValidCG3).to.equal(true);
    });

    it(`initialize with = operator`, () => {
      let s = new Sentence();
      s.tokens = [new Token(s, params[0]), new Token(s, params[1])];

      expect(s.comments).to.deep.equal([]);
      // expect(s.conlluLoaded).to.equal(false);
      // expect(s.cg3Loaded).to.equal(false);
      expect(currentForms(s)).to.equal("hello world");
      expect(s.length).to.equal(2);

      expect(s.isValidConllu).to.equal(true);
      expect(s.isValidCG3).to.equal(true);
    });

    it(`initialize with Sentence.insertTokenAt method`, () => {
      let s = new Sentence();
      s.pushToken(new Token(s, params[0])).pushToken(new Token(s, params[1]));

      expect(s.comments).to.deep.equal([]);
      // expect(s.conlluLoaded).to.equal(false);
      // expect(s.cg3Loaded).to.equal(false);
      expect(currentForms(s)).to.equal("hello world");
      expect(s.length).to.equal(2);

      expect(s.isValidConllu).to.equal(true);
      expect(s.isValidCG3).to.equal(true);
    });

    it(`has equivalent initializers`, () => {
      let sents = [
        new Sentence(params), new Sentence(), new Sentence(), new Sentence(),
        Sentence.fromConllu("1\thello\n2\tworld"),
        // Sentence.fromCG3([/* ??? */]),
        Sentence.fromParams(params)
      ];
      sents[1].tokens =
          [new Token(sents[1], params[0]), new Token(sents[1], params[1])];
      sents[2]
          .pushToken(new Token(sents[2], params[0]))
          .pushToken(new Token(sents[2], params[1]));
      sents[3].params = params;

      _.each(sents, (s, i) => {
        s.index();
        expect(s).to.deep.equal(sents[0]);
      });
    });

    it(`return formats correctly`, () => {
      let s = new Sentence(params);

      expect(s.text).to.equal("hello world");
      expect(ignoreAfterLemma(s.conllu))
          .to.equal("1 hello hello 2 world world");
      // expect(s.cg3).to.equal()
      expect(s.params).to.deep.equal(params);
    });
  });

  describe("parsers", () => {
    it(`parse list of params`, () => {
      let s = new Sentence();
      let params = [{form: "hello"}, {form: "world"}];
      s.params = params;
      expect(s.params).to.deep.equal(params);
      expect(s.isValidConllu).to.equal(true);
      expect(s.isValidCG3).to.equal(true);
    });

    _.each(data["CoNLL-U"], (conllu, name) => {
      it(`parse CoNLL-U:${name}`, () => {
        let s = new Sentence({help: {head: false, deps: false}});

        s.conllu = conllu;
        expect(clean(s.conllu)).to.equal(clean(conllu));
        expect(s.isValidConllu).to.equal(true);
      });
    });

    _.each(
        data.CG3,
        (cg3, name) => {it(`parse CG3:${name}`, () => {
          let s = new Sentence(
              {help: {head: false, deps: false}, showEmptyDependencies: false});

          s.cg3 = cg3;
          expect(clean(s.cg3)).to.equal(ignoreSemicolons(cg3));
        })});

    _.each(data["Plain text"], (text, name) => {
      it(`parse Plain text:${name}`, () => {
        let s = new Sentence({help: {head: false, deps: false}});

        s.text = text;
        expect(s.text).to.equal(cleanText(text));
      });
    });
    it(`parse nx`, () => {

                   });
  });
  return;

  describe(`token array manipulators`, () => {
    it(`handles (insert|remove|move)TokenAt()`, () => {
      let s = new Sentence();

      let t0 = new Token(s, {form: "zeroth"});
      let t1 = new Token(s, {form: "first"});
      let t2 = new Token(s, {form: "second"});
      let t3 = new Token(s, {form: "third"});
      let t4 = new Token(s, {form: "fourth"});
      let t5 = new Token(s, {form: "fifth"});
      let t6 = new Token(s, {form: "sixth"});

      expect(t5.text).to.equal("fifth");
      expect(t6.text).to.equal("sixth");

      expect(() => { s.insertTokenAt(); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt({}); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(null); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(undefined); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt("x"); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(0); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(0, {}); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(0, null); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(0, undefined); })
          .to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(0, t0.analysis); })
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

    it(`integrate token and subToken manipulation`, () => {
      let s = new Sentence();

      s.comments = ["this is the test sentence"];
      s.pushToken(new Token(s, {form: "zeroth", misc: "super"}));
      s.pushToken(new Token(s, {form: "first", misc: "super"}));
      s.pushToken(new Token(s, {form: "second", misc: "super"}));

      s[0].pushSubToken(new Token(s, {form: "third", misc: "sub"}));
      s[0].pushSubToken(new Token(s, {form: "fourth", misc: "sub"}));
      s[2].pushSubToken(new Token(s, {form: "fifth", misc: "sub"}));
      s[2].pushSubToken(new Token(s, {form: "sixth", misc: "sub"}));

      expect(s.conllu).to.equal(`# this is the test sentence
1-2	zeroth	zeroth	_	_	_	_	_	_	super
1	third	third	_	_	_	_	_	_	sub
2	fourth	fourth	_	_	_	_	_	_	sub
3	first	first	_	_	_	_	_	_	super
4-5	second	second	_	_	_	_	_	_	super
4	fifth	fifth	_	_	_	_	_	_	sub
5	sixth	sixth	_	_	_	_	_	_	sub`);

      s[0].addHead(s[2][0], "one");
      s[2][0].addHead(s[1], "two");

      expect(s.conllu).to.equal(`# this is the test sentence
1-2	zeroth	zeroth	_	_	_	4:one	_	_	super
1	third	third	_	_	_	_	_	_	sub
2	fourth	fourth	_	_	_	_	_	_	sub
3	first	first	_	_	_	_	_	4:two	super
4-5	second	second	_	_	_	_	_	_	super
4	fifth	fifth	_	_	_	3:two	_	1-2:one	sub
5	sixth	sixth	_	_	_	_	_	_	sub`);

      s[2].removeSubTokenAt(0);

      expect(s.conllu).to.equal(`# this is the test sentence
1-2	zeroth	zeroth	_	_	_	_	_	_	super
1	third	third	_	_	_	_	_	_	sub
2	fourth	fourth	_	_	_	_	_	_	sub
3	first	first	_	_	_	_	_	_	super
4-4	second	second	_	_	_	_	_	_	super
4	sixth	sixth	_	_	_	_	_	_	sub`);
    });

    it(`integrate subTokens with empty tokens`, () => {
      let s = new Sentence();
      s.comments = ["this is the #-# and #.# integration test"];

      s.pushToken(new Token(s, {form: "zeroth", misc: "super"}));
      s.pushToken(Token.fromConllu(s, `3.1 first first _ _ _ _ _ _ empty`));
      s[0].pushSubToken(new Token(s, {form: "second", misc: "sub"}));
      s[0].pushSubToken(new Token(s, {form: "third", misc: "sub"}));

      expect(s.getToken(3).isEmpty).to.equal(true);
      expect(s.text).to.equal("second third");
      expect(s.conllu).to.equal(`# this is the #-# and #.# integration test
1-2	zeroth	zeroth	_	_	_	_	_	_	super
1	second	second	_	_	_	_	_	_	sub
2	third	third	_	_	_	_	_	_	sub
2.1	first	first	_	_	_	_	_	_	empty`);

      let tmp = s[0].popSubToken();
      s[1].pushSubToken(tmp);

      expect(s[1].token.isEmpty).to.equal(true);
      expect(s[1][0].token.isEmpty).to.equal(true);
      expect(s.text).to.equal("second");
      expect(s.conllu).to.equal(`# this is the #-# and #.# integration test
1-1	zeroth	zeroth	_	_	_	_	_	_	super
1	second	second	_	_	_	_	_	_	sub
1.1-1.1	first	first	_	_	_	_	_	_	empty
1.1	third	third	_	_	_	_	_	_	sub`);
    });
  });

  describe("serializer", () => {
    _.each(data["CoNLL-U"], (text, name) => {
      it(`${name}: serialize to Notatrix and back`, () => {
        let s = new Sentence({help: {head: false, deps: false}});
        s.conllu = text;

        expect(clean(s.conllu)).to.equal(clean(text));
      });
    });
  });
  describe("instantiate nx.Sentence with explicit format", () => {
    utils.forEachText((text, format, name) => {
      const options = {
        interpretAs: format,
      };

      it(`${format}:${name}`, () => {
        expect(() => {new nx.Sentence(text, options)}).to.not.throw();
      });
    });
  });

  describe("instantiate nx.Sentence without explicit format", () => {
    utils.forEachText((text, format, name) => {
      it(`${format}:${name}`,
         () => { expect(() => {new nx.Sentence(text)}).to.not.throw(); });
    });
  });

  describe("serialize nx.Sentence back into notatrix-serial format", () => {
    utils.forEachText((text, format, name) => {
      it(`${format}:${name}`, () => {
        const parsed = nx.parse(text, {returnAllPossibilities: false});
        const serial = (new nx.Sentence(parsed)).serialize();

        // get some sort of notatrix serial output
        expect(() => { nx.detect.as.notatrixSerial(serial); }).to.not.throw();

        // in fact, get the same exact notatrix serial
        const clean = serial => {
          serial.tokens = serial.tokens.map(token => _.omit(token, "index"));
        };
        expect(clean(serial)).to.equal(clean(parsed));
      });
    });
  });

  describe(`modify heads & deps`, () => {
    it(`modify heads`, () => {
      let s = new Sentence();
      s.params = [{form: "first"}, {form: "second"}, {form: "third"}];

      let a0 = s[0];
      let a1 = s[1];
      let a2 = s[2];
      let a3 = s[3];

      expect(a0).to.be.an.instanceof(Analysis)
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

      a0.addHead(a1, "test-dependent-2"); // overwrite, don't add

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

      a0.addHead(a1); // don't overwrite if less data than before

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

      expect(() => { a0.addHead(a3); }).to.throw(E.NotatrixError);
      expect(() => { a0.removeHead(a3); }).to.throw(E.NotatrixError);
      expect(() => { a0.changeHead(a3); }).to.throw(E.NotatrixError);
    });

    it(`modify deps`, () => {
      let s = new Sentence();
      s.params = [{form: "first"}, {form: "second"}, {form: "third"}];

      let a0 = s[0];
      let a1 = s[1];
      let a2 = s[2];
      let a3 = s[3];

      expect(a0).to.be.an.instanceof(Analysis)
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

      a0.addDep(a1, "test-dependent-2"); // overwrite, don't add

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

      a0.addDep(a1); // don't overwrite if less data than before

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

      expect(() => { a0.addDep(a3); }).to.throw(E.NotatrixError);
      expect(() => { a0.removeDep(a3); }).to.throw(E.NotatrixError);
      expect(() => { a0.changeDep(a3); }).to.throw(E.NotatrixError);
    });
  });

  describe("merging", () => {
    const conllu = `1\tA\ta_lemma
2\tB\tb_lemma
3-5\tCDE\tcde_lemma
3\tC\tc_lemma
4\tD\td_lemma
5\tE\te_lemma
6\tF\tf_lemma
7\tG\tg_lemma`;

    it(`should throw errors at the right times`, () => {
      let s = Sentence.fromConllu(conllu);
      const ta = s[0].token, tb = s[1].token, tcde = s[2].token,
            tc = s[2][0].token, td = s[2][1].token, te = s[2][2].token,
            tf = s[3].token, tg = s[4].token;

      expect(() => { ta.mergeWith(ta); }).to.throw(E.NotatrixError);
      // expect(() => { ta.mergeWith(tb); }).to.throw(E.NotatrixError);
      expect(() => { ta.mergeWith(tcde); }).to.throw(E.NotatrixError);
      expect(() => { ta.mergeWith(tc); }).to.throw(E.NotatrixError);
      expect(() => { ta.mergeWith(td); }).to.throw(E.NotatrixError);
      expect(() => { ta.mergeWith(te); }).to.throw(E.NotatrixError);
      expect(() => { ta.mergeWith(tf); }).to.throw(E.NotatrixError);
      expect(() => { ta.mergeWith(tg); }).to.throw(E.NotatrixError);

      // expect(() => { tb.mergeWith(ta); }).to.throw(E.NotatrixError);
      expect(() => { tb.mergeWith(tb); }).to.throw(E.NotatrixError);
      expect(() => { tb.mergeWith(tcde); }).to.throw(E.NotatrixError);
      expect(() => { tb.mergeWith(tc); }).to.throw(E.NotatrixError);
      expect(() => { tb.mergeWith(td); }).to.throw(E.NotatrixError);
      expect(() => { tb.mergeWith(te); }).to.throw(E.NotatrixError);
      expect(() => { tb.mergeWith(tf); }).to.throw(E.NotatrixError);
      expect(() => { tb.mergeWith(tg); }).to.throw(E.NotatrixError);

      expect(() => { tcde.mergeWith(ta); }).to.throw(E.NotatrixError);
      expect(() => { tcde.mergeWith(tb); }).to.throw(E.NotatrixError);
      expect(() => { tcde.mergeWith(tcde); }).to.throw(E.NotatrixError);
      expect(() => { tcde.mergeWith(tc); }).to.throw(E.NotatrixError);
      expect(() => { tcde.mergeWith(td); }).to.throw(E.NotatrixError);
      expect(() => { tcde.mergeWith(te); }).to.throw(E.NotatrixError);
      expect(() => { tcde.mergeWith(tf); }).to.throw(E.NotatrixError);
      expect(() => { tcde.mergeWith(tg); }).to.throw(E.NotatrixError);

      expect(() => { tc.mergeWith(ta); }).to.throw(E.NotatrixError);
      expect(() => { tc.mergeWith(tb); }).to.throw(E.NotatrixError);
      expect(() => { tc.mergeWith(tcde); }).to.throw(E.NotatrixError);
      expect(() => { tc.mergeWith(tc); }).to.throw(E.NotatrixError);
      // expect(() => { tc.mergeWith(td); }).to.throw(E.NotatrixError);
      expect(() => { tc.mergeWith(te); }).to.throw(E.NotatrixError);
      expect(() => { tc.mergeWith(tf); }).to.throw(E.NotatrixError);
      expect(() => { tc.mergeWith(tg); }).to.throw(E.NotatrixError);

      expect(() => { td.mergeWith(ta); }).to.throw(E.NotatrixError);
      expect(() => { td.mergeWith(tb); }).to.throw(E.NotatrixError);
      expect(() => { td.mergeWith(tcde); }).to.throw(E.NotatrixError);
      // expect(() => { td.mergeWith(tc); }).to.throw(E.NotatrixError);
      expect(() => { td.mergeWith(td); }).to.throw(E.NotatrixError);
      // expect(() => { td.mergeWith(te); }).to.throw(E.NotatrixError);
      expect(() => { td.mergeWith(tf); }).to.throw(E.NotatrixError);
      expect(() => { td.mergeWith(tg); }).to.throw(E.NotatrixError);

      expect(() => { te.mergeWith(ta); }).to.throw(E.NotatrixError);
      expect(() => { te.mergeWith(tb); }).to.throw(E.NotatrixError);
      expect(() => { te.mergeWith(tcde); }).to.throw(E.NotatrixError);
      expect(() => { te.mergeWith(tc); }).to.throw(E.NotatrixError);
      // expect(() => { te.mergeWith(td); }).to.throw(E.NotatrixError);
      expect(() => { te.mergeWith(te); }).to.throw(E.NotatrixError);
      expect(() => { te.mergeWith(tf); }).to.throw(E.NotatrixError);
      expect(() => { te.mergeWith(tg); }).to.throw(E.NotatrixError);

      expect(() => { tf.mergeWith(ta); }).to.throw(E.NotatrixError);
      expect(() => { tf.mergeWith(tb); }).to.throw(E.NotatrixError);
      expect(() => { tf.mergeWith(tcde); }).to.throw(E.NotatrixError);
      expect(() => { tf.mergeWith(tc); }).to.throw(E.NotatrixError);
      expect(() => { tf.mergeWith(td); }).to.throw(E.NotatrixError);
      expect(() => { tf.mergeWith(te); }).to.throw(E.NotatrixError);
      expect(() => { tf.mergeWith(tf); }).to.throw(E.NotatrixError);
      // expect(() => { tf.mergeWith(tg); }).to.throw(E.NotatrixError);

      expect(() => { tg.mergeWith(ta); }).to.throw(E.NotatrixError);
      expect(() => { tg.mergeWith(tb); }).to.throw(E.NotatrixError);
      expect(() => { tg.mergeWith(tcde); }).to.throw(E.NotatrixError);
      expect(() => { tg.mergeWith(tc); }).to.throw(E.NotatrixError);
      expect(() => { tg.mergeWith(td); }).to.throw(E.NotatrixError);
      expect(() => { tg.mergeWith(te); }).to.throw(E.NotatrixError);
      // expect(() => { tg.mergeWith(tf); }).to.throw(E.NotatrixError);
      expect(() => { tg.mergeWith(tg); }).to.throw(E.NotatrixError);
    });

    it(`should merge non-subTokens correctly (basics)`, () => {
      let s;

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

    it(`should merge subTokens correctly (basics)`, () => {
      let s;

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

    it(`should handle dependencies through merge`, () => {
      let s;

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

  describe("nx deserializer", () => {
    const options = {
      help: {head: false, deps: false},
      showEmptyDependencies: false
    };

    _.each(data["CoNLL-U"], (conllu, name) => {
      it(`serialize and deserialize CoNLL-U:${name}`, () => {
        let nx = Sentence.fromConllu(conllu, options).nx;
        let s = Sentence.fromNx(nx);

        expect(s.nx).to.deep.equal(nx);
        expect(clean(s.conllu)).to.equal(clean(conllu));
      });
    });

    _.each(data["CG3"], (cg3, name) => {
      it(`serialize and deserialize CG3:${name}`, () => {
        let nx = Sentence.fromCG3(cg3, options).nx;
        let s = Sentence.fromNx(nx);

        expect(s.nx).to.deep.equal(nx);
        // TODO: get rid of this semicolon hack
        expect(clean(s.cg3).replace(/;/g, ""))
            .to.equal(clean(cg3).replace(/;/g, ""));
      });
    });

    _.each(data["Plain text"], (text, name) => {
      it(`serialize and deserialize Plain text:${name}`, () => {
        let nx = Sentence.fromText(text, options).nx;
        let s = Sentence.fromNx(nx);

        expect(s.nx).to.deep.equal(nx);
        expect(s.text.replace(/\s*/g, "")).to.equal(text.replace(/\s*/g, ""));
      });
    });
  });

  describe("progress percentage", () => {
    const options = {help: {upostag: false, xpostag: false}};

    _.each(data["CoNLL-U"], (conllu, name) => {
      it(`calculate progress for CoNLL-U:${name}`, () => {
        let s = Sentence.fromConllu(conllu, options);

        expect(() => {s.progress}).to.not.throw();
      });
    });

    _.each(data["CG3"], (cg3, name) => {
      it(`calculate progress for CG3:${name}`, () => {
        let s = Sentence.fromCG3(cg3, options);

        expect(() => {s.progress}).to.not.throw();
      });
    });

    _.each(data["Plain text"], (text, name) => {
      it(`calculate progress for Plain text:${name}`, () => {
        let s = Sentence.fromText(text, options);

        expect(s.progress).to.equal(0);
      });
    });
  });

  describe("setEmpty", () => {
    it("should allow toggling isEmpty", () => {
      const s = Sentence.fromConllu(data["CoNNL-U"]["empty"]);
      console.log(s);
    });
  });

  describe("eles", () => {
    _.each(data["CoNLL-U"], (conllu, name) => {
      it(`should not have duplicate elements for CoNLL-U:${name}`, () => {
        let s = Sentence.fromConllu(conllu);
        let eles = new Set();

        _.each(s.eles, ele => {
          if (eles.has(ele.data.id))
            throw new Error(`duplicate: ${ele.data.id}`);
          eles.add(ele.data.id);
        });
      });
    });

    _.each(data["CG3"], (cg3, name) => {
      it(`should not have duplicate elements for CG3:${name}`, () => {
        let s = Sentence.fromCG3(cg3);
        let eles = new Set();

        _.each(s.eles, ele => {
          if (eles.has(ele.data.id))
            throw new Error(`duplicate: ${ele.data.id}`);
          eles.add(ele.data.id);
        });
      });
    });
  });

  describe("problem cases", () => {
    _.each(
        [
          data["CoNLL-U"].nested_2, data["CoNLL-U"].t,
          data["CoNLL-U"].from_cg3_with_spans
        ],
        conllu => {
          it("should set superToken and isSubToken correctly", () => {
            let s = Sentence.fromConllu(conllu);
            _.each(s.tokens, token => {
              _.each(token.subTokens, subToken => {
                expect(subToken.isSubToken).to.equal(true);
                expect(subToken.superToken instanceof Analysis).to.equal(true);
              });
              expect(token.isSubToken).to.equal(false);
              expect(token.superToken).to.equal(null);
            });
          });
        });

    _.each([data["CoNLL-U"][0], data["CoNLL-U"][1]], conllu => {
      it("should not do the funky _;_ thing when converting between CG3",
         () => {
           let s1 = Sentence.fromConllu(conllu);
           let s2 = Sentence.fromCG3(s1.cg3);
           let s3 = Sentence.fromConllu(s2.conllu);

           expect(s1.conllu).to.equal(s3.conllu);
           expect(s1.cg3).to.equal(s3.cg3);
         });
    });
  });
});
