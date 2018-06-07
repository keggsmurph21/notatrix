'use strict';

const _ = require('underscore');
const expect = require('chai').expect;

const data = require('./data/index');
const Sentence = require('../src/sentence');
const Token = require('../src/token');
const Analysis = require('../src/analysis');
const E = require('../src/errors');

function clean(str) {
  return str.trim().replace(/[ \t]+/g, '\t').trim();
}
function ignoreIndices(str) {
  return clean(str.split('\t').slice(1).join('\t'));
}
function ignoreAfterLemma(str) {
  return str.split('\n').map(line => {
    return line.split('\t').slice(0, 3).join(' ');
  }).join(' ');
}
function countHeads(ana) {
  let acc = 0;
  ana.eachHead(() => {
    acc++;
  });
  return acc;
}
function countDeps(ana) {
  let acc = 0;
  ana.eachDep(() => {
    acc++;
  });
  return acc;
}
function forms(token) {
  return token.analyses.map(ana => {
    return ana.form;
  }).join(' ');
}
function currentForms(sentence) {
  return sentence.tokens.map(tok => {
    return tok.analysis.form;
  }).join(' ');
}

const fallback = '_';

describe('Analysis', () => {
  describe('invalid intializer', () => {
    it(`throw a NotatrixError`, () => {
      expect(() => { let a = new Analysis(); }).to.throw(E.NotatrixError);
    });
  });

  const s = new Sentence();
  const data = [
    {
      inParams: undefined,
      outParams: {},
      text: fallback
    },
    {
      inParams: null,
      outParams: {},
      text: fallback
    },
    {
      inParams: { form: 'string' },
      outParams: { form: 'string' },
      text: 'string'
    },
    {
      inParams: { ignore: 'string' },
      outParams: {},
      text: fallback
    }
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
        expect(a.isEmpty).to.equal(false);

        expect(a._heads).to.deep.equal([]);
        expect(a._deps).to.deep.equal([]);
        expect(countDeps(a)).to.equal(0);

      });

      it(`return formats correctly`, () => {
        let t = new Token(s);
        t.params = d.inParams;
        let a = t.analysis;

        expect(() => { return a.conllu; }).to.throw(E.NotatrixError); // not indexed yet
        expect(() => { return a.cg3; }).to.throw(E.NotatrixError); // not indexed yet

        // even after indexing (Token not attached to Sentence yet)
        t.sentence.index();
        expect(() => { return a.conllu; }).to.throw(E.NotatrixError);
        expect(() => { return a.cg3; }).to.throw(E.NotatrixError);

      });

    });
  });

  describe('modify contents', () => {
    it(`handles (insert|remove|move)SubTokenAt() and (push|pop)SubToken`, () => {
      let s = new Sentence();

      let t0 = new Token(s);
      let t1 = new Token(s);
      let t2 = new Token(s);
      let t3 = new Token(s);
      let t4 = new Token(s);

      let a0 = new Analysis(t0, { form: 'zeroth' });
      let a1 = new Analysis(t1, { form: 'first' });
      let a2 = new Analysis(t2, { form: 'second' });
      let a3 = new Analysis(t3, { form: 'third' });
      let a4 = new Analysis(t4, { form: 'fourth' });

      t0.analysis = a0;
      t1.analysis = a1;
      t2.analysis = a2;
      t3.analysis = a3;
      t4.analysis = a4;

      expect(t0.text).to.equal('zeroth');
      expect(t1.text).to.equal('first');
      expect(t2.text).to.equal('second');
      expect(t3.text).to.equal('third');
      expect(t4.text).to.equal('fourth');

      expect(a0[0]).to.equal(null);
      expect(a1[0]).to.equal(null);
      expect(a2[0]).to.equal(null);
      expect(a3[0]).to.equal(null);
      expect(a4[0]).to.equal(null);

      expect(() => { a0.insertSubTokenAt(); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt({}); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(null); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(undefined); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt('x'); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(0); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(0, {}); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(0, null); }).to.throw(E.NotatrixError);
      expect(() => { a0.insertSubTokenAt(0, undefined); }).to.throw(E.NotatrixError);
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

        expect(ignoreAfterLemma(s.conllu)).to.equal('1-1 zeroth zeroth 1 first first')

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

        expect(ignoreAfterLemma(s.conllu)).to.equal('1-2 zeroth zeroth 1 second second 2 first first')

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

        expect(ignoreAfterLemma(s.conllu)).to.equal('1-3 zeroth zeroth 1 second second 2 third third 3 first first');

      a0.insertSubTokenAt(Infinity, t4);

        expect(a0.subTokens).to.deep.equal([t2, t3, t1, t4]);
        expect(ignoreAfterLemma(s.conllu)).to.equal('1-4 zeroth zeroth 1 second second 2 third third 3 first first 4 fourth fourth');

      a0.removeSubTokenAt(1);

        expect(a0.subTokens).to.deep.equal([t2, t1, t4]);
        expect(a3.superToken).to.equal(null);
        expect(a3.isSubToken).to.equal(false);
        expect(t3.isSubToken).to.equal(false);
        expect(ignoreAfterLemma(s.conllu)).to.equal('1-3 zeroth zeroth 1 second second 2 first first 3 fourth fourth');

      a0.removeSubTokenAt(2);

        expect(a0.subTokens).to.deep.equal([t2, t1]);
        expect(a4.superToken).to.equal(null);
        expect(a4.isSubToken).to.equal(false);
        expect(t4.isSubToken).to.equal(false);
        expect(ignoreAfterLemma(s.conllu)).to.equal('1-2 zeroth zeroth 1 second second 2 first first');

      a0.removeSubTokenAt(-5);

        expect(a0.subTokens).to.deep.equal([t1]);
        expect(a2.superToken).to.equal(null);
        expect(a2.isSubToken).to.equal(false);
        expect(t2.isSubToken).to.equal(false);
        expect(ignoreAfterLemma(s.conllu)).to.equal('1-1 zeroth zeroth 1 first first');

      a0.removeSubTokenAt(Infinity);

        expect(a0.subTokens).to.deep.equal([]);
        expect(a0.isSuperToken).to.equal(false);
        expect(a1.superToken).to.equal(null);
        expect(a1.isSubToken).to.equal(false);
        expect(t1.isSubToken).to.equal(false);
        expect(ignoreAfterLemma(s.conllu)).to.equal('1 zeroth zeroth');

      let ret = a0.pushSubToken(t1).pushSubToken(t2).pushSubToken(t3).popSubToken();
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

describe('Token', () => {
  describe('invalid intializer', () => {
    it(`throw a NotatrixError`, () => {
      expect(() => { let t = new Token(); }).to.throw(E.NotatrixError);
    });
  });

  const s = new Sentence();
  const data = [ {} ];

  _.each(data, d => {
    describe(`valid initializer`, () => {
      it(`initialize correctly`, () => {
        let t = new Token(s);

        expect(t.sentence).to.equal(s);
        expect(t.current).to.equal(null);
        expect(t.analyses).to.deep.equal([]);
        expect(t.analysis).to.equal(null);
        expect(t.length).to.equal(0);
        expect(t.subTokens).to.equal(null);

        expect(t.isSubToken).to.equal(false);
        expect(t.isSuperToken).to.equal(null);
        expect(t.isEmpty).to.equal(null);
        expect(t.isAmbiguous).to.equal(false);

      });

      it(`return formats correctly`, () => {
        let t = new Token(s);

        expect(() => { return t.text; }).to.throw(E.NotatrixError);
        expect(() => { return t.conllu; }).to.throw(E.NotatrixError);
        expect(() => { return t.cg3; }).to.throw(E.NotatrixError);
        expect(() => { return t.params; }).to.throw(E.NotatrixError);

        // even after "indexing" (b/c the token hasn't actually been added to the Sentence yet)
        t.sentence.index();
        expect(() => { return t.text; }).to.throw(E.NotatrixError);
        expect(() => { return t.conllu; }).to.throw(E.NotatrixError);
        expect(() => { return t.cg3; }).to.throw(E.NotatrixError);
        expect(() => { return t.params; }).to.throw(E.NotatrixError);

      })
    });

    describe(`valid after initializing first Analysis`, () => {
      it(`initialize directly with params`, () => {
        let t = new Token(s, { form: 'testing' });

        expect(t.current).to.equal(0);
        expect(forms(t)).to.equal('testing');
        expect(t.analysis).to.be.an.instanceof(Analysis);
        expect(t.analysis.form).to.equal('testing');
        expect(t.length).to.equal(1);
        expect(t.subTokens).to.deep.equal([]);

        expect(t.isSubToken).to.equal(false);
        expect(t.isSuperToken).to.equal(false);
        expect(t.isEmpty).to.equal(false);
        expect(t.isAmbiguous).to.equal(false);

      });

      it(`initialize with = operator`, () => {
        let t = new Token(s);
        t.params = { form: 'testing' }; // can only set t.analysis (i.e. current) this way

        expect(t.current).to.equal(0);
        expect(forms(t)).to.equal('testing');
        expect(t.analysis).to.be.an.instanceof(Analysis);
        expect(t.analysis.form).to.equal('testing');
        expect(t.length).to.equal(1);
        expect(t.subTokens).to.deep.equal([]);

        expect(t.isSubToken).to.equal(false);
        expect(t.isSuperToken).to.equal(false);
        expect(t.isEmpty).to.equal(false);
        expect(t.isAmbiguous).to.equal(false);

      });

      it(`initialize with Token.insertAnalysisAt() method`, () => {
        let t = new Token(s);
        t.insertAnalysisAt(0, new Analysis(t, { form: 'testing' })); // more flexible

        expect(t.current).to.equal(0);
        expect(forms(t)).to.equal('testing');
        expect(t.analysis).to.be.an.instanceof(Analysis);
        expect(t.analysis.form).to.equal('testing');
        expect(t.length).to.equal(1);
        expect(t.subTokens).to.deep.equal([]);

        expect(t.isSubToken).to.equal(false);
        expect(t.isSuperToken).to.equal(false);
        expect(t.isAmbiguous).to.equal(false);

      });

      it(`has equivalent initializers`, () => {
        let params = { form: 'testing' };

        let tokens = [
          new Token(s, params),
          new Token(s),
          new Token(s),
          Token.fromParams(s, params),
          Token.fromConllu(s, '1\ttesting'),
          //Token.fromCG3(s, /* ??? */)
        ];

        tokens[1].params = params;
        tokens[2].pushAnalysis(new Analysis(tokens[2], params));

        _.each(tokens, token => {
          expect(token).to.deep.equal(tokens[0]);
        });
      });

      it(`return formats correctly`, () => {
        let t = new Token(s);
        t.params = { form: 'testing' };

        expect(t.text).to.equal('testing');
        expect(() => { t.conllu }).to.throw(E.NotatrixError); // not indexed yet
        //expect(() => { t.cg3 }).to.throw(E.NotatrixError); // not indexed yet
        expect(t.params).to.deep.equal({ form: 'testing' });

        t.sentence.index();
        expect(() => { return t.conllu; }).to.throw(E.NotatrixError); // not attached to sentence
        //expect(() => { return t.cg3; }).to.throw(E.NotatrixError);

        s.pushToken(t);
        expect(ignoreAfterLemma(t.conllu)).to.equal('1 testing testing');
      });
    });
  });

  describe(`modify contents`, () => {
    it(`handles (insert|remove|move)AnalysisAt() and (push|pop)Analysis`, () => {
      let s = new Sentence();
      let t = new Token(s);
      t.params = { form: 'zeroth' };

      let a1 = new Analysis(t, { form: 'first' });
      let a2 = new Analysis(t, { form: 'second' });
      let a3 = new Analysis(t, { form: 'third' });
      let a4 = new Analysis(t, { form: 'fourth' });
      let a5 = null;

      expect(forms(t)).to.equal('zeroth');

      t.insertAnalysisAt(0, a1);
      expect(forms(t)).to.equal('first zeroth');

      t.insertAnalysisAt(1, a2);
      expect(forms(t)).to.equal('first second zeroth');

      t.insertAnalysisAt(-1, a3);
      expect(forms(t)).to.equal('third first second zeroth');

      t.insertAnalysisAt(Infinity, a4);
      expect(forms(t)).to.equal('third first second zeroth fourth');

      t.removeAnalysisAt(0);
      expect(forms(t)).to.equal('first second zeroth fourth');

      t.removeAnalysisAt(1);
      expect(forms(t)).to.equal('first zeroth fourth');

      t.removeAnalysisAt(-1);
      expect(forms(t)).to.equal('zeroth fourth');

      t.removeAnalysisAt(Infinity);
      expect(forms(t)).to.equal('zeroth');
      expect(t.current).to.equal(0);
      expect(t.analysis.form).to.equal('zeroth');

      t.removeAnalysisAt(Infinity);
      expect(forms(t)).to.equal('');
      expect(t.current).to.equal(null);
      expect(t.analysis).to.equal(null);

      t.removeAnalysisAt(0);
      expect(forms(t)).to.equal('');

      t.removeAnalysisAt(-3);
      expect(forms(t)).to.equal('');

      t.insertAnalysisAt(6, a1);
      expect(forms(t)).to.equal('first');
      expect(t.current).to.equal(0);
      expect(t.analysis.form).to.equal('first');

      t.insertAnalysisAt(6, a2);
      expect(forms(t)).to.equal('first second');

      t.insertAnalysisAt(6, a3).insertAnalysisAt(6, a4);
      expect(forms(t)).to.equal('first second third fourth');

      t.moveAnalysisAt(0, 1);
      expect(forms(t)).to.equal('second first third fourth');

      t.moveAnalysisAt(0, 10);
      expect(forms(t)).to.equal('first third fourth second');

      t.moveAnalysisAt(-2, 2);
      expect(forms(t)).to.equal('third fourth first second');

      t.moveAnalysisAt(Infinity, Infinity);
      expect(forms(t)).to.equal('third fourth first second');

      let ret = t.popAnalysis();
      expect(forms(t)).to.equal('third fourth first');
      expect(ret.form).to.equal('second');

      t.pushAnalysis(a2).pushAnalysis(a2).pushAnalysis(a2).pushAnalysis(a2);
      expect(forms(t)).to.equal('third fourth first second second second second');

      expect(() => { t.insertAnalysisAt(0, a5); }).to.throw(E.NotatrixError);

    });

    it(`has consistent get, set, prev, next`, () => {
      let s = new Sentence();
      let t = new Token(s);

      expect(forms(t)).to.equal('');

      t.insertAnalysisAt(0, new Analysis(t, { form: 'first' }));
      t.insertAnalysisAt(1, new Analysis(t, { form: 'second' }));
      t.insertAnalysisAt(2, new Analysis(t, { form: 'third' }));
      t.insertAnalysisAt(3, new Analysis(t, { form: 'fourth' }));
      expect(forms(t)).to.equal('first second third fourth');

      expect(t.analysis.form).to.equal('first');
      t.next();
      expect(t.analysis.form).to.equal('second');
      t.next();
      expect(t.analysis.form).to.equal('third');
      t.next();
      expect(t.analysis.form).to.equal('fourth');
      t.next();
      expect(t.analysis.form).to.equal('fourth');
      t.prev();
      expect(t.analysis.form).to.equal('third');
      t.prev();
      expect(t.analysis.form).to.equal('second');
      t.prev();
      expect(t.analysis.form).to.equal('first');
      t.prev();
      expect(t.analysis.form).to.equal('first');
      t.current = 0;
      expect(t.analysis.form).to.equal('first');
      t.current = 2;
      expect(t.analysis.form).to.equal('third');
      t.current = Infinity;
      expect(t.analysis.form).to.equal('third');
      t.current = -Infinity
      expect(t.analysis.form).to.equal('third');

    });
  });
});

describe('Sentence', () => {

  describe('valid initializer', () => {
    it(`initialize correctly`, () => {
      let s = new Sentence();

      expect(s.comments).to.deep.equal([]);
      //expect(s.conlluLoaded).to.equal(false);
      //expect(s.cg3Loaded).to.equal(false);
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
      expect(s.getByIndices(0)).to.equal(null);

    });

    it(`return formats correctly`, () => {
      let s = new Sentence();

      expect(s.text).to.equal('');
      expect(s.conllu).to.equal('');
      //expect(s.cg3).to.equal('');
      expect(s.params).to.deep.equal([]);

    });
  });

  describe(`valid after initializing first Analysis`, () => {
    let params = [{ form: 'hello' }, { form: 'world' }];

    it(`initialize directly with params`, () => {
      let s = new Sentence(params);

      expect(s.comments).to.deep.equal([]);
      //expect(s.conlluLoaded).to.equal(false);
      //expect(s.cg3Loaded).to.equal(false);
      expect(currentForms(s)).to.equal('hello world');
      expect(s.length).to.equal(2);

      expect(s.isValidConllu).to.equal(true);
      expect(s.isValidCG3).to.equal(true);

    });

    it(`initialize with = operator`, () => {
      let s = new Sentence();
      s.tokens = [ new Token(s, params[0]), new Token(s, params[1]) ];

      expect(s.comments).to.deep.equal([]);
      //expect(s.conlluLoaded).to.equal(false);
      //expect(s.cg3Loaded).to.equal(false);
      expect(currentForms(s)).to.equal('hello world');
      expect(s.length).to.equal(2);

      expect(s.isValidConllu).to.equal(true);
      expect(s.isValidCG3).to.equal(true);

    });

    it(`initialize with Sentence.insertTokenAt method`, () => {
      let s = new Sentence();
      s.pushToken(new Token(s, params[0])).pushToken(new Token(s, params[1]));

      expect(s.comments).to.deep.equal([]);
      //expect(s.conlluLoaded).to.equal(false);
      //expect(s.cg3Loaded).to.equal(false);
      expect(currentForms(s)).to.equal('hello world');
      expect(s.length).to.equal(2);

      expect(s.isValidConllu).to.equal(true);
      expect(s.isValidCG3).to.equal(true);

    });

    it(`has equivalent initializers`, () => {
      let sents = [
        new Sentence(params),
        new Sentence(),
        new Sentence(),
        new Sentence(),
        Sentence.fromConllu('1\thello\n2\tworld'),
        //Sentence.fromCG3([/* ??? */]),
        Sentence.fromParams(params)
      ];
      sents[1].tokens = [new Token(sents[1], params[0]), new Token(sents[1], params[1])];
      sents[2].pushToken(new Token(sents[2], params[0])).pushToken(new Token(sents[2], params[1]));
      sents[3].params = params;

      _.each(sents, (s, i) => {
        s.index();
        expect(s).to.deep.equal(sents[0]);
      });

    });

    it(`return formats correctly`, () => {
      let s = new Sentence(params);

      expect(s.text).to.equal('hello world');
      expect(ignoreAfterLemma(s.conllu)).to.equal('1 hello hello 2 world world');
      //expect(s.cg3).to.equal()
      expect(s.params).to.deep.equal(params);

    });
  });

  describe('parsers', () => {
    it(`parse list of params`, () => {
      let s = new Sentence();
      let params = [{ form: 'hello' }, { form: 'world' }];
      s.params = params;
      expect(s.params).to.deep.equal(params);
      expect(s.isValidConllu).to.equal(true);
      expect(s.isValidCG3).to.equal(true);
    });

    it(`parse CoNLL-U`, () => {
      let s = new Sentence();

      _.each([data['CoNLL-U'].t, data['CoNLL-U'].from_cg3_with_spans], conllu => {
        s.conllu = conllu;
        expect(clean(s.conllu)).to.equal(clean(conllu));
        expect(s.isValidConllu).to.equal(true);
      });
    });

    it(`parse CG3`, () => {

    });

    it(`parse nx`, () => {

    });
  });

  describe(`token array manipulators`, () => {
    it(`handles (insert|remove|move)TokenAt()`, () => {
      let s = new Sentence();

      let t0 = new Token(s, { form: 'zeroth' });
      let t1 = new Token(s, { form: 'first' });
      let t2 = new Token(s, { form: 'second' });
      let t3 = new Token(s, { form: 'third' });
      let t4 = new Token(s, { form: 'fourth' });
      let t5 = new Token(s, { form: 'fifth' });
      let t6 = new Token(s, { form: 'sixth' });

      expect(t5.text).to.equal('fifth');
      expect(t6.text).to.equal('sixth');

      expect(() => { s.insertTokenAt(); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt({}); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(null); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(undefined); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt('x'); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(0); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(0, {}); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(0, null); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(0, undefined); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(0, t0.analysis); }).to.throw(E.NotatrixError);

      expect(currentForms(s)).to.equal('');
      expect(s[-1]).to.equal(null);
      expect(s[0]).to.equal(null);
      expect(s[1]).to.equal(null);

      s.insertTokenAt(0, t0);
      expect(currentForms(s)).to.equal('zeroth');

      s.insertTokenAt(-1, t1);
      expect(currentForms(s)).to.equal('first zeroth');

      s.insertTokenAt(1, t2);
      expect(currentForms(s)).to.equal('first second zeroth');

      s.insertTokenAt(Infinity, t3);
      expect(currentForms(s)).to.equal('first second zeroth third');

      s.moveTokenAt(-1, 2);
      expect(currentForms(s)).to.equal('second zeroth first third');

      s.moveTokenAt(Infinity, 1);
      expect(currentForms(s)).to.equal('second third zeroth first');

      s.removeTokenAt(3);
      expect(currentForms(s)).to.equal('second third zeroth');

      s.removeTokenAt(-1);
      expect(currentForms(s)).to.equal('third zeroth');

      s.pushToken(t4).pushToken(t5).popToken();
      expect(currentForms(s)).to.equal('third zeroth fourth');

    });
  });
  return;

  describe('serializer', () => {
    _.each(data['CoNLL-U'], (text, name) => {
      it(`${name}: serialize to Notatrix and back`, () => {
        const s = new Sentence();
        s.conllu = text;

        expect(clean(s.conllu)).to.equal(clean(text));

      });
    });
  });

  describe('token validation', () => {
    _.each(data['CoNLL-U'], (text, name) => {
      describe(name, () => {
        const s = new Sentence();
        s.conllu = text;

        const lines = text.trim().split('\n');
        it(`get consistent number of comments and tokens`, () => {
          expect(s.comments.length + s.length).to.equal(lines.length);
        });

        let c = 0, t = 0;
        for (let i=0; i<lines.length; i++) {

          if (lines[i].startsWith('#')) {
            it(`get comment by index`, () => {
              const expected = lines[i].slice(1).trim();
              const actual = s.getComment(c);
              expect(actual).to.equal(expected);
              c++;
            });
          } else {

            const expected = clean(lines[i]);
            const token = s.getToken(t);
            const index = lines[i].split(/[ \t]/)[0];
            t++;

            it(`get token by number`, () => {
              const actual = clean(token.analysis.conllu);
              expect(actual).to.equal(expected);
            });

            it(`get token by indices`, () => {
              expect(s.getByIndices(token.getIndices())).to.equal(token);
            })

            it(`get token by string`, () => {
              const actual = clean(s.getById(index).conllu);
              expect(actual).to.equal(expected);
            });

            if (/\-/.test(index)) {
              it(`be a superToken`, () => {
                expect(s.getById(index).isSuperToken).to.equal(true);
              });

              let [ start, end ] = index.split('-');
              start = parseInt(start);
              end = parseInt(end);
              for (let j=start; j<=end; j++) {
                it(`be a subToken`, () => {
                  expect(s.getById(j).isSubToken).to.equal(true);
                });
              }
            }

            _.each(token.analysis.head.match(/[0-9]+/g), (match, j) => {
              match = parseInt(match);
              if (match) { // catch 0 and NaN
                it(`have found a real head`, () => {
                  expect(s.getById(match)).to.be.an.instanceof(Analysis);
                });
                it(`have found the right head`, () => {
                  expect(token.analysis._heads[j].token).to.equal(s.getById(match));
                });
              }
            });

            _.each(token.analysis.deps.match(/[0-9]+/g), (match, j) => {
              match = parseInt(match);
              if (match) {
                it(`have found a real dep`, () => {
                  expect(s.getById(match)).to.be.an.instanceof(Analysis);
                });
                it(`have found the right dep`, () => {
                  expect(token.analysis._deps[j].token).to.equal(s.getById(match));
                });
              }
            });
          }
        }

        it(`do nothing when given an invalid index to insert at`, () => {
          const original = s.conllu;
          const token = new Token(s);
          token.params = { form: 'invalid' };

          let op = () => { s.insertTokenAt({ super: null, sub: null }, token); };
          expect(op).to.throw(E.TransformationError);
          expect(s.conllu).to.equal(original);
        });

        it(`add tokens even when one of our indices are "out of bounds"`, () => { // thanks to Array.slice()

          const original = s.length;
          const token = new Token(s);
          token.params = { form: 'invalid' };

          //console.log(s.length);
          s.insertTokenAt({ super: s.length + 10, sub: null }, token);
          expect(s.length - 1).to.equal(original);
          //console.log(s.length);

          s.insertTokenAt({ super: -10, sub: null }, token);
          expect(s.length - 2).to.equal(original);
          //console.log(s.length);

          let r = s.insertTokenAt({ super: 0, sub: s.length + 10 }, token);
          //console.log(s.length);
          //console.log(s.getToken(8));
          //expect(s.length - 3).to.equal(original);

          //s.insertTokenAt({ super: 0, sub: -10 }, token);
          //expect(s.length - 4).to.equal(original);

        });
      });
    });
  });
});

describe(`Hybrid methods`, () => {
  describe(`modify heads & deps`, () => {
    it(`modify heads`, () => {
      let s = new Sentence();
      s.params = [
        { form: 'first' },
        { form: 'second' },
        { form: 'third' }
      ];

      let a0 = s[0];
      let a1 = s[1];
      let a2 = s[2];
      let a3 = s[3];

      expect(a0).to.be.an.instanceof(Analysis)
      expect(a1).to.be.an.instanceof(Analysis);
      expect(a2).to.be.an.instanceof(Analysis);
      expect(a3).to.equal(null);

      a0.removeHead(a1);

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.addHead(a1);

        expect(a0.head).to.equal('2');
        expect(countHeads(a0)).to.equal(1);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('1');
        expect(countDeps(a1)).to.equal(1);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.removeHead(a0);

        expect(a0.head).to.equal('2');
        expect(countHeads(a0)).to.equal(1);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('1');
        expect(countDeps(a1)).to.equal(1);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.removeHead(a1);

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.addHead(a1, 'test-dependent');

        expect(a0.head).to.equal('2:test-dependent');
        expect(countHeads(a0)).to.equal(1);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('1:test-dependent');
        expect(countDeps(a1)).to.equal(1);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.addHead(a1, 'test-dependent-2');  // overwrite, don't add

        expect(a0.head).to.equal('2:test-dependent-2');
        expect(countHeads(a0)).to.equal(1);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('1:test-dependent-2');
        expect(countDeps(a1)).to.equal(1);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.addHead(a1); // don't overwrite if less data than before

        expect(a0.head).to.equal('2:test-dependent-2');
        expect(countHeads(a0)).to.equal(1);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('1:test-dependent-2');
        expect(countDeps(a1)).to.equal(1);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.changeHead(a2);

        expect(a0.head).to.equal('2:test-dependent-2');
        expect(countHeads(a0)).to.equal(1);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('1:test-dependent-2');
        expect(countDeps(a1)).to.equal(1);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.addHead(a2, 'test-dependent-3');

        expect(a0.head).to.equal('2:test-dependent-2|3:test-dependent-3');
        expect(countHeads(a0)).to.equal(2);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('1:test-dependent-2');
        expect(countDeps(a1)).to.equal(1);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('1:test-dependent-3');
        expect(countDeps(a2)).to.equal(1);

      a0.changeHead(a2, 'test-dependent-4');

        expect(a0.head).to.equal('2:test-dependent-2|3:test-dependent-4');
        expect(countHeads(a0)).to.equal(2);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('1:test-dependent-2');
        expect(countDeps(a1)).to.equal(1);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('1:test-dependent-4');
        expect(countDeps(a2)).to.equal(1);

      a0.changeHead(a2);

        expect(a0.head).to.equal('2:test-dependent-2|3:test-dependent-4');
        expect(countHeads(a0)).to.equal(2);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('1:test-dependent-2');
        expect(countDeps(a1)).to.equal(1);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('1:test-dependent-4');
        expect(countDeps(a2)).to.equal(1);

      a0.removeHead(a1).removeHead(a2);

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      expect(() => { a0.addHead(a3); }).to.throw(E.NotatrixError);
      expect(() => { a0.removeHead(a3); }).to.throw(E.NotatrixError);
      expect(() => { a0.changeHead(a3); }).to.throw(E.NotatrixError);

    });

    it(`modify deps`, () => {
      let s = new Sentence();
      s.params = [
        { form: 'first' },
        { form: 'second' },
        { form: 'third' }
      ];

      let a0 = s[0];
      let a1 = s[1];
      let a2 = s[2];
      let a3 = s[3];

      expect(a0).to.be.an.instanceof(Analysis)
      expect(a1).to.be.an.instanceof(Analysis);
      expect(a2).to.be.an.instanceof(Analysis);
      expect(a3).to.equal(null);

      a0.removeDep(a1);

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.addDep(a1);

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('2');
        expect(countDeps(a0)).to.equal(1);

        expect(a1.head).to.equal('1');
        expect(countHeads(a1)).to.equal(1);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.removeDep(a0);

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('2');
        expect(countDeps(a0)).to.equal(1);

        expect(a1.head).to.equal('1');
        expect(countHeads(a1)).to.equal(1);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.removeDep(a1);

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.addDep(a1, 'test-dependent');

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('2:test-dependent');
        expect(countDeps(a0)).to.equal(1);

        expect(a1.head).to.equal('1:test-dependent');
        expect(countHeads(a1)).to.equal(1);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.addDep(a1, 'test-dependent-2');  // overwrite, don't add

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('2:test-dependent-2');
        expect(countDeps(a0)).to.equal(1);

        expect(a1.head).to.equal('1:test-dependent-2');
        expect(countHeads(a1)).to.equal(1);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.addDep(a1); // don't overwrite if less data than before

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('2:test-dependent-2');
        expect(countDeps(a0)).to.equal(1);

        expect(a1.head).to.equal('1:test-dependent-2');
        expect(countHeads(a1)).to.equal(1);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.changeDep(a2, 'test-dependent-3');

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('2:test-dependent-2');
        expect(countDeps(a0)).to.equal(1);

        expect(a1.head).to.equal('1:test-dependent-2');
        expect(countHeads(a1)).to.equal(1);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.addDep(a2, 'test-dependent-3');

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('2:test-dependent-2|3:test-dependent-3');
        expect(countDeps(a0)).to.equal(2);

        expect(a1.head).to.equal('1:test-dependent-2');
        expect(countHeads(a1)).to.equal(1);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('1:test-dependent-3');
        expect(countHeads(a2)).to.equal(1);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.changeDep(a2, 'test-dependent-4');

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('2:test-dependent-2|3:test-dependent-4');
        expect(countDeps(a0)).to.equal(2);

        expect(a1.head).to.equal('1:test-dependent-2');
        expect(countHeads(a1)).to.equal(1);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('1:test-dependent-4');
        expect(countHeads(a2)).to.equal(1);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.changeDep(a2);

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('2:test-dependent-2|3:test-dependent-4');
        expect(countDeps(a0)).to.equal(2);

        expect(a1.head).to.equal('1:test-dependent-2');
        expect(countHeads(a1)).to.equal(1);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('1:test-dependent-4');
        expect(countHeads(a2)).to.equal(1);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      a0.removeDep(a1).removeDep(a2);

        expect(a0.head).to.equal('');
        expect(countHeads(a0)).to.equal(0);
        expect(a0.deps).to.equal('');
        expect(countDeps(a0)).to.equal(0);

        expect(a1.head).to.equal('');
        expect(countHeads(a1)).to.equal(0);
        expect(a1.deps).to.equal('');
        expect(countDeps(a1)).to.equal(0);

        expect(a2.head).to.equal('');
        expect(countHeads(a2)).to.equal(0);
        expect(a2.deps).to.equal('');
        expect(countDeps(a2)).to.equal(0);

      expect(() => { a0.addDep(a3); }).to.throw(E.NotatrixError);
      expect(() => { a0.removeDep(a3); }).to.throw(E.NotatrixError);
      expect(() => { a0.changeDep(a3); }).to.throw(E.NotatrixError);

    });
  });
});
