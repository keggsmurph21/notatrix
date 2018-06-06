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

        expect(t.isSubToken).to.equal(null);
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
      it(`initialize with = operator`, () => {
        let t = new Token(s);
        t.params = { form: 'testing' }; // can only set t.analysis (i.e. current) this way

        expect(t.current).to.equal(0);
        expect(forms(t)).to.equal('testing');
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
        expect(t.analysis.form).to.equal('testing');
        expect(t.length).to.equal(1);
        expect(t.subTokens).to.deep.equal([]);

        expect(t.isSubToken).to.equal(false);
        expect(t.isSuperToken).to.equal(false);
        expect(t.isAmbiguous).to.equal(false);

      })

      it(`return formats correctly`, () => {
        let t = new Token(s);
        t.params = { form: 'testing' };

        expect(t.text).to.equal('testing');
        expect(() => { t.conllu }).to.throw(E.NotatrixError); // not indexed yet
        //expect(() => { t.cg3 }).to.throw(E.NotatrixError); // not indexed yet
        expect(t.params).to.deep.equal({ form: 'testing' });

        t.sentence.index();
        expect(() => { return t.conllu; }).to.throw(E.NotatrixError);
        //expect(() => { return t.cg3; }).to.throw(E.NotatrixError);
      })
    });

    describe(`modify contents`, () => {
      it(`has consistent insert, remove, move`, () => {
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
});

describe('Sentence', () => {

  describe('valid initializer', () => {
    it(`initialize correctly`, () => {
      let s = new Sentence();

      expect(s.comments).to.deep.equal([]);
      expect(s.conlluLoaded).to.equal(false);
      expect(s.cg3Loaded).to.equal(false);
      expect(s.tokens).to.deep.equal([]);
      expect(s.length).to.equal(0);

      expect(s.isValidConllu).to.equal(true);
      expect(s.isValidCG3).to.equal(true);

    });

    it(`well-defined getter behavior`, () => {
      let s = new Sentence();

      expect(s.getComment(0)).to.equal(null);
      expect(s.getToken(0)).to.equal(null);
      expect(s.getAnalysis(0)).to.equal(null);
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
      s.params = [
        { form: 'first' },
        { form: 'second' },
        { form: 'third' },
        { form: 'fourth' }
      ];

      expect(s.length).to.equal(4);

      let t = new Token(s);
      t.params = { form: 'inserted' };

      expect(() => { s.insertTokenAt(); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt({}); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(null); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt(undefined); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt({ super: null }); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt({ super: undefined }); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt({ super: 0 }); }).to.throw(E.NotatrixError);
      expect(() => { s.insertTokenAt({ super: 0 }, null); }).to.throw(E.NotatrixError);

      s.insertTokenAt({ super: 0 }, t);
      expect(currentForms(s)).to.equal('inserted first second third fourth');

      s.insertTokenAt({ super: 2 }, t);
      expect(currentForms(s)).to.equal('inserted first inserted second third fourth');

      s.insertTokenAt({ super: -1 }, t);
      expect(currentForms(s)).to.equal('inserted inserted first inserted second third fourth');

      s.getAnalysis(4).addHead(s.getAnalysis(5));
      s.index();
      console.log(s[0] === s.getAnalysis(0));

      console.log(s.text);

    })
  })
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

      let a0 = s.getAnalysis(0);
      let a1 = s.getAnalysis(1);
      let a2 = s.getAnalysis(2);
      let a3 = s.getAnalysis(3); // null

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

      let a0 = s.getAnalysis(0);
      let a1 = s.getAnalysis(1);
      let a2 = s.getAnalysis(2);
      let a3 = s.getAnalysis(3); // null

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
