'use strict';

const _ = require('underscore');
const assert = require('assert');

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
      assert.throws(() => { let a = new Analysis(); }, E.NotatrixError);
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

        assert.equal(t, a.token);
        assert.equal(s, a.sentence);
        assert.deepEqual(d.outParams, a.params);
        assert.equal(null, a.id);
        assert.equal(null, a.superToken);
        assert.deepEqual([], a.subTokens);
        assert.equal(0, a.length);
        assert.equal(null, a[0]);
        assert.equal(null, a.getSubToken(0));

        assert.equal(false, a.isSuperToken);
        assert.equal(false, a.isSubToken);
        assert.equal(true, a.isCurrent);
        assert.equal(false, a.isEmpty);

        assert.deepEqual([], a._heads);
        assert.deepEqual([], a._deps);
        assert.equal(0, countDeps(a));

      });

      it(`return formats correctly`, () => {
        let t = new Token(s);
        t.params = d.inParams;
        let a = t.analysis;

        assert.throws(() => { return a.conllu; }, E.NotatrixError); // not indexed yet
        assert.throws(() => { return a.cg3; }, E.NotatrixError); // not indexed yet

        // even after indexing (Token not attached to Sentence yet)
        t.sentence.index();
        assert.throws(() => { return a.conllu; }, E.NotatrixError);
        assert.throws(() => { return a.cg3; }, E.NotatrixError);

      });

    });
  });
});

describe('Token', () => {
  describe('invalid intializer', () => {
    it(`throw a NotatrixError`, () => {
      assert.throws(() => { let t = new Token(); }, E.NotatrixError);
    });
  });

  const s = new Sentence();
  const data = [ {} ];

  _.each(data, d => {
    describe(`valid initializer`, () => {
      it(`initialize correctly`, () => {
        let t = new Token(s);

        assert.equal(s, t.sentence);
        assert.equal(null, t.current);
        assert.deepEqual([], t.analyses);
        assert.equal(null, t.analysis);
        assert.equal(0, t.length);
        assert.equal(null, t.subTokens);

        assert.equal(null, t.isSubToken);
        assert.equal(null, t.isSuperToken);
        assert.equal(null, t.isEmpty);
        assert.equal(false, t.isAmbiguous);

      });

      it(`return formats correctly`, () => {
        let t = new Token(s);

        assert.throws(() => { return t.text; }, E.NotatrixError);
        assert.throws(() => { return t.conllu; }, E.NotatrixError);
        assert.throws(() => { return t.cg3; }, E.NotatrixError);
        assert.throws(() => { return t.params; }, E.NotatrixError);

        // even after "indexing" (b/c the token hasn't actually been added to the Sentence yet)
        t.sentence.index();
        assert.throws(() => { return t.text; }, E.NotatrixError);
        assert.throws(() => { return t.conllu; }, E.NotatrixError);
        assert.throws(() => { return t.cg3; }, E.NotatrixError);
        assert.throws(() => { return t.params; }, E.NotatrixError);

      })
    });

    describe(`valid after initializing first Analysis`, () => {
      it(`initialize with = operator`, () => {
        let t = new Token(s);
        t.params = { form: 'testing' }; // can only set t.analysis (i.e. current) this way

        assert.equal(0, t.current);
        assert.equal('testing', forms(t));
        assert.equal('testing', t.analysis.form);
        assert.equal(1, t.length);
        assert.deepEqual([], t.subTokens);

        assert.equal(false, t.isSubToken);
        assert.equal(false, t.isSuperToken);
        assert.equal(false, t.isEmpty);
        assert.equal(false, t.isAmbiguous);

      });

      it(`initialize with Token.insertAnalysisAt() method`, () => {
        let t = new Token(s);
        t.insertAnalysisAt(0, new Analysis(t, { form: 'testing' })); // more flexible

        assert.equal(0, t.current);
        assert.equal('testing', forms(t));
        assert.equal('testing', t.analysis.form);
        assert.equal(1, t.length);
        assert.deepEqual([], t.subTokens);

        assert.equal(false, t.isSubToken);
        assert.equal(false, t.isSuperToken);
        assert.equal(false, t.isAmbiguous);

      })

      it(`return formats correctly`, () => {
        let t = new Token(s);
        t.params = { form: 'testing' };

        assert.equal('testing', t.text);
        assert.throws(() => { t.conllu }, E.NotatrixError); // not indexed yet
        //assert.throws(() => { t.cg3 }, E.NotatrixError); // not indexed yet
        assert.deepEqual({ form: 'testing' }, t.params);

        t.sentence.index();
        assert.throws(() => { return t.conllu; }, E.NotatrixError);
        //assert.throws(() => { return t.cg3; }, E.NotatrixError);
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

        assert.equal('zeroth', forms(t));

        t.insertAnalysisAt(0, a1);
        assert.equal('first zeroth', forms(t));

        t.insertAnalysisAt(1, a2);
        assert.equal('first second zeroth', forms(t));

        t.insertAnalysisAt(-1, a3);
        assert.equal('third first second zeroth', forms(t));

        t.insertAnalysisAt(Infinity, a4);
        assert.equal('third first second zeroth fourth', forms(t));

        t.removeAnalysisAt(0);
        assert.equal('first second zeroth fourth', forms(t));

        t.removeAnalysisAt(1);
        assert.equal('first zeroth fourth', forms(t));

        t.removeAnalysisAt(-1);
        assert.equal('zeroth fourth', forms(t));

        t.removeAnalysisAt(Infinity);
        assert.equal('zeroth', forms(t));
        assert.equal(0, t.current);
        assert.equal('zeroth', t.analysis.form);

        t.removeAnalysisAt(Infinity);
        assert.equal('', forms(t));
        assert.equal(null, t.current);
        assert.equal(null, t.analysis);

        t.removeAnalysisAt(0);
        assert.equal('', forms(t));

        t.removeAnalysisAt(-3);
        assert.equal('', forms(t));

        t.insertAnalysisAt(6, a1);
        assert.equal('first', forms(t));
        assert.equal(0, t.current);
        assert.equal('first', t.analysis.form);

        t.insertAnalysisAt(6, a2);
        assert.equal('first second', forms(t));

        t.insertAnalysisAt(6, a3).insertAnalysisAt(6, a4);
        assert.equal('first second third fourth', forms(t));

        t.moveAnalysisAt(0, 1);
        assert.equal('second first third fourth', forms(t));

        t.moveAnalysisAt(0, 10);
        assert.equal('first third fourth second', forms(t));

        t.moveAnalysisAt(-2, 2);
        assert.equal('third fourth first second', forms(t));

        t.moveAnalysisAt(Infinity, Infinity);
        assert.equal('third fourth first second', forms(t));

        assert.throws(() => { t.insertAnalysisAt(0, a5); }, E.NotatrixError);

      });

      it(`has consistent get, set, prev, next`, () => {
        let s = new Sentence();
        let t = new Token(s);

        assert.equal('', forms(t));

        t.insertAnalysisAt(0, new Analysis(t, { form: 'first' }));
        t.insertAnalysisAt(1, new Analysis(t, { form: 'second' }));
        t.insertAnalysisAt(2, new Analysis(t, { form: 'third' }));
        t.insertAnalysisAt(3, new Analysis(t, { form: 'fourth' }));
        assert.equal('first second third fourth', forms(t));

        assert.equal('first', t.analysis.form);
        t.next();
        assert.equal('second', t.analysis.form);
        t.next();
        assert.equal('third', t.analysis.form);
        t.next();
        assert.equal('fourth', t.analysis.form);
        t.next();
        assert.equal('fourth', t.analysis.form);
        t.prev();
        assert.equal('third', t.analysis.form);
        t.prev();
        assert.equal('second', t.analysis.form);
        t.prev();
        assert.equal('first', t.analysis.form);
        t.prev();
        assert.equal('first', t.analysis.form);
        t.current = 0;
        assert.equal('first', t.analysis.form);
        t.current = 2;
        assert.equal('third', t.analysis.form);
        t.current = Infinity;
        assert.equal('third', t.analysis.form);
        t.current = -Infinity
        assert.equal('third', t.analysis.form);

      });
    });
  });
});

describe('Sentence', () => {

  describe('valid initializer', () => {
    it(`initialize correctly`, () => {
      let s = new Sentence();

      assert.deepEqual([], s.comments);
      assert.equal(false, s.conlluLoaded);
      assert.equal(false, s.cg3Loaded);
      assert.deepEqual([], s.tokens);
      assert.equal(0, s.length);

      assert.equal(true, s.isValidConllu);
      assert.equal(true, s.isValidCG3);

    });

    it(`well-defined getter behavior`, () => {
      let s = new Sentence();

      assert.equal(null, s.getComment(0));
      assert.equal(null, s.getToken(0));
      assert.equal(null, s.getAnalysis(0));
      assert.equal(null, s.getById(0));
      assert.equal(null, s.getByIndices(0));

    });

    it(`return formats correctly`, () => {
      let s = new Sentence();

      assert.equal('', s.text);
      assert.equal('', s.conllu);
      //assert.equal('', s.cg3);
      assert.deepEqual([], s.params);

    });
  });

  describe('parsers', () => {
    it(`parse list of params`, () => {
      let s = new Sentence();
      let params = [{ form: 'hello' }, { form: 'world' }];
      s.params = params;
      assert.deepEqual(params, s.params);
      assert.equal(true, s.isValidConllu);
      assert.equal(true, s.isValidCG3);
    });

    it(`parse CoNLL-U`, () => {
      let s = new Sentence();

      _.each([data['CoNLL-U'].t, data['CoNLL-U'].from_cg3_with_spans], conllu => {
        s.conllu = conllu;
        assert.equal(clean(conllu), clean(s.conllu));
        assert.equal(true, s.isValidConllu);
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

      assert.equal(4, s.length);

      let t = new Token(s);
      t.params = { form: 'inserted' };

      assert.throws(() => { s.insertTokenAt(); }, E.NotatrixError);
      assert.throws(() => { s.insertTokenAt({}); }, E.NotatrixError);
      assert.throws(() => { s.insertTokenAt(null); }, E.NotatrixError);
      assert.throws(() => { s.insertTokenAt(undefined); }, E.NotatrixError);
      assert.throws(() => { s.insertTokenAt({ super: null }); }, E.NotatrixError);
      assert.throws(() => { s.insertTokenAt({ super: undefined }); }, E.NotatrixError);
      assert.throws(() => { s.insertTokenAt({ super: 0 }); }, E.NotatrixError);
      assert.throws(() => { s.insertTokenAt({ super: 0 }, null); }, E.NotatrixError);

      s.insertTokenAt({ super: 0 }, t);
      assert.equal('inserted first second third fourth', currentForms(s));

      s.insertTokenAt({ super: 2 }, t);
      assert.equal('inserted first inserted second third fourth', currentForms(s));

      s.insertTokenAt({ super: -1 }, t);
      assert.equal('inserted inserted first inserted second third fourth', currentForms(s));

      s.getAnalysis(4).addHead(s.getAnalysis(5));
      s.index();
      console.log(s[0].id)
      console.log(s.getAnalysis(0).id);

      console.log(s.text);

    })
  })
  return;

  describe('serializer', () => {
    _.each(data['CoNLL-U'], (text, name) => {
      it(`${name}: serialize to Notatrix and back`, () => {
        const s = new Sentence();
        s.conllu = text;

        const expected = clean(text);
        const actual = clean(s.conllu);
        assert.equal(expected, actual)

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
          const expected = lines.length;
          const actual = s.comments.length + s.length;
          assert.equal(expected, actual);
        });

        let c = 0, t = 0;
        for (let i=0; i<lines.length; i++) {

          if (lines[i].startsWith('#')) {
            it(`get comment by index`, () => {
              const expected = lines[i].slice(1).trim();
              const actual = s.getComment(c);
              assert.equal(expected, actual);
              c++;
            });
          } else {

            const expected = clean(lines[i]);
            const token = s.getToken(t);
            const index = lines[i].split(/[ \t]/)[0];
            t++;

            it(`get token by number`, () => {
              const actual = clean(token.analysis.conllu);
              assert.equal(expected, actual);
            });

            it(`get token by indices`, () => {
              assert.equal(token, s.getByIndices(token.getIndices()));
            })

            it(`get token by string`, () => {
              const actual = clean(s.getById(index).conllu);
              assert.equal(expected, actual);
            });

            if (/\-/.test(index)) {
              it(`be a superToken`, () => {
                assert.equal(true, s.getById(index).isSuperToken);
              });

              let [ start, end ] = index.split('-');
              start = parseInt(start);
              end = parseInt(end);
              for (let j=start; j<=end; j++) {
                it(`be a subToken`, () => {
                  assert.equal(true, s.getById(j).isSubToken);
                });
              }
            }

            _.each(token.analysis.head.match(/[0-9]+/g), (match, j) => {
              match = parseInt(match);
              if (match) { // catch 0 and NaN
                it(`have found a real head`, () => {
                  assert.equal(true, s.getById(match) instanceof Analysis);
                });
                it(`have found the right head`, () => {
                  assert.equal(s.getById(match), token.analysis._heads[j].token);
                });
              }
            });

            _.each(token.analysis.deps.match(/[0-9]+/g), (match, j) => {
              match = parseInt(match);
              if (match) {
                it(`have found a real dep`, () => {
                  assert.equal(true, s.getById(match) instanceof Analysis);
                });
                it(`have found the right dep`, () => {
                  assert.equal(s.getById(match), token.analysis._deps[j].token);
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
          assert.throws(op, E.TransformationError);
          assert.equal(original, s.conllu);
        });

        it(`add tokens even when one of our indices are "out of bounds"`, () => { // thanks to Array.slice()

          const original = s.length;
          const token = new Token(s);
          token.params = { form: 'invalid' };

          //console.log(s.length);
          s.insertTokenAt({ super: s.length + 10, sub: null }, token);
          assert.equal(original, s.length - 1);
          //console.log(s.length);

          s.insertTokenAt({ super: -10, sub: null }, token);
          assert.equal(original, s.length - 2);
          //console.log(s.length);

          let r = s.insertTokenAt({ super: 0, sub: s.length + 10 }, token);
          //console.log(s.length);
          //console.log(s.getToken(8));
          //assert.equal(original, s.length - 3);

          //s.insertTokenAt({ super: 0, sub: -10 }, token);
          //assert.equal(original, s.length - 4);

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

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.addHead(a1);

        assert.equal('2', a0.head);
        assert.equal(1, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('1', a1.deps);
        assert.equal(1, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.removeHead(a0);

        assert.equal('2', a0.head);
        assert.equal(1, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('1', a1.deps);
        assert.equal(1, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.removeHead(a1);

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.addHead(a1, 'test-dependent');

        assert.equal('2:test-dependent', a0.head);
        assert.equal(1, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('1:test-dependent', a1.deps);
        assert.equal(1, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.addHead(a1, 'test-dependent-2');  // overwrite, don't add

        assert.equal('2:test-dependent-2', a0.head);
        assert.equal(1, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('1:test-dependent-2', a1.deps);
        assert.equal(1, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.addHead(a1); // don't overwrite if less data than before

        assert.equal('2:test-dependent-2', a0.head);
        assert.equal(1, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('1:test-dependent-2', a1.deps);
        assert.equal(1, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.changeHead(a2);

        assert.equal('2:test-dependent-2', a0.head);
        assert.equal(1, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('1:test-dependent-2', a1.deps);
        assert.equal(1, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.addHead(a2, 'test-dependent-3');

        assert.equal('2:test-dependent-2|3:test-dependent-3', a0.head);
        assert.equal(2, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('1:test-dependent-2', a1.deps);
        assert.equal(1, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('1:test-dependent-3', a2.deps);
        assert.equal(1, countDeps(a2));

      a0.changeHead(a2, 'test-dependent-4');

        assert.equal('2:test-dependent-2|3:test-dependent-4', a0.head);
        assert.equal(2, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('1:test-dependent-2', a1.deps);
        assert.equal(1, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('1:test-dependent-4', a2.deps);
        assert.equal(1, countDeps(a2));

      a0.changeHead(a2);

        assert.equal('2:test-dependent-2|3:test-dependent-4', a0.head);
        assert.equal(2, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('1:test-dependent-2', a1.deps);
        assert.equal(1, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('1:test-dependent-4', a2.deps);
        assert.equal(1, countDeps(a2));

      a0.removeHead(a1).removeHead(a2);

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      assert.throws(() => { a0.addHead(a3); }, E.NotatrixError);
      assert.throws(() => { a0.removeHead(a3); }, E.NotatrixError);
      assert.throws(() => { a0.changeHead(a3); }, E.NotatrixError);

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

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.addDep(a1);

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('2', a0.deps);
        assert.equal(1, countDeps(a0));

        assert.equal('1', a1.head);
        assert.equal(1, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.removeDep(a0);

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('2', a0.deps);
        assert.equal(1, countDeps(a0));

        assert.equal('1', a1.head);
        assert.equal(1, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.removeDep(a1);

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.addDep(a1, 'test-dependent');

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('2:test-dependent', a0.deps);
        assert.equal(1, countDeps(a0));

        assert.equal('1:test-dependent', a1.head);
        assert.equal(1, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.addDep(a1, 'test-dependent-2');  // overwrite, don't add

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('2:test-dependent-2', a0.deps);
        assert.equal(1, countDeps(a0));

        assert.equal('1:test-dependent-2', a1.head);
        assert.equal(1, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.addDep(a1); // don't overwrite if less data than before

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('2:test-dependent-2', a0.deps);
        assert.equal(1, countDeps(a0));

        assert.equal('1:test-dependent-2', a1.head);
        assert.equal(1, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.changeDep(a2, 'test-dependent-3');

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('2:test-dependent-2', a0.deps);
        assert.equal(1, countDeps(a0));

        assert.equal('1:test-dependent-2', a1.head);
        assert.equal(1, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.addDep(a2, 'test-dependent-3');

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('2:test-dependent-2|3:test-dependent-3', a0.deps);
        assert.equal(2, countDeps(a0));

        assert.equal('1:test-dependent-2', a1.head);
        assert.equal(1, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('1:test-dependent-3', a2.head);
        assert.equal(1, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.changeDep(a2, 'test-dependent-4');

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('2:test-dependent-2|3:test-dependent-4', a0.deps);
        assert.equal(2, countDeps(a0));

        assert.equal('1:test-dependent-2', a1.head);
        assert.equal(1, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('1:test-dependent-4', a2.head);
        assert.equal(1, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.changeDep(a2);

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('2:test-dependent-2|3:test-dependent-4', a0.deps);
        assert.equal(2, countDeps(a0));

        assert.equal('1:test-dependent-2', a1.head);
        assert.equal(1, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('1:test-dependent-4', a2.head);
        assert.equal(1, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      a0.removeDep(a1).removeDep(a2);

        assert.equal('', a0.head);
        assert.equal(0, countHeads(a0));
        assert.equal('', a0.deps);
        assert.equal(0, countDeps(a0));

        assert.equal('', a1.head);
        assert.equal(0, countHeads(a1));
        assert.equal('', a1.deps);
        assert.equal(0, countDeps(a1));

        assert.equal('', a2.head);
        assert.equal(0, countHeads(a2));
        assert.equal('', a2.deps);
        assert.equal(0, countDeps(a2));

      assert.throws(() => { a0.addDep(a3); }, E.NotatrixError);
      assert.throws(() => { a0.removeDep(a3); }, E.NotatrixError);
      assert.throws(() => { a0.changeDep(a3); }, E.NotatrixError);

    });
  });
});
