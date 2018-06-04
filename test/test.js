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

describe('Analysis', () => {

});

describe('Token', () => {

});

describe('Sentence', () => {
  describe('serializer', () => {
    _.each(data['CoNLL-U'], (text, name) => {
      it(`${name}: should serialize to Notatrix and back`, () => {
        const s = new Sentence();
        s.conllu = text;

        const expected = clean(text);
        const actual = clean(s.conllu);
        assert.equal(expected, actual)

      });
    });
  });

  describe('token getters', () => {
    _.each(data['CoNLL-U'], (text, name) => {
      describe(name, () => {
        const s = new Sentence();
        s.conllu = text;

        const lines = text.trim().split('\n');
        it(`should get consistent number of comments and tokens`, () => {
          const expected = lines.length;
          const actual = s.comments.length + s.length;
          assert.equal(expected, actual);
        });

        let c = 0, t = 0;
        for (let i=0; i<lines.length; i++) {

          if (lines[i].startsWith('#')) {
            it(`should get comment by index`, () => {
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

            it(`should get token by number`, () => {
              const actual = clean(token.analysis.conllu);
              assert.equal(expected, actual);
            });

            it(`should get token by indices`, () => {
              assert.equal(token, s.getByIndices(token.getIndices()));
            })

            it(`should get token by string`, () => {
              const actual = clean(s.getById(index).conllu);
              assert.equal(expected, actual);
            });

            if (/\-/.test(index)) {
              it(`should be a superToken`, () => {
                assert.equal(true, s.getById(index).isSuperToken);
              });

              let [ start, end ] = index.split('-');
              start = parseInt(start);
              end = parseInt(end);
              for (let j=start; j<=end; j++) {
                it(`should be a subToken`, () => {
                  assert.equal(true, s.getById(j).isSubToken);
                });
              }
            }

            _.each(token.analysis.head.match(/[0-9]+/g), (match, j) => {
              match = parseInt(match);
              if (match) { // catch 0 and NaN
                it(`should have found a real head`, () => {
                  assert.equal(true, s.getById(match) instanceof Analysis);
                });
                it(`should have found the right head`, () => {
                  assert.equal(s.getById(match), token.analysis._heads[j].token);
                });
              }
            });

            _.each(token.analysis.deps.match(/[0-9]+/g), (match, j) => {
              match = parseInt(match);
              if (match) {
                it(`should have found a real dep`, () => {
                  assert.equal(true, s.getById(match) instanceof Analysis);
                });
                it(`should have found the right dep`, () => {
                  assert.equal(s.getById(match), token.analysis._deps[j].token);
                });
              }
            });
          }
        }

        it(`should do nothing when given an invalid index to insert at`, () => {
          const original = s.conllu;
          const token = new Token();
          token.params = { form: 'invalid' };

          let op = () => { s.insertTokenAt({ super: null, sub: null }, token); };
          assert.throws(op, E.TransformationError);
          assert.equal(original, s.conllu);
        });

        it(`should add tokens even when one of our indices are "out of bounds"`, () => { // thanks to Array.slice()

          const original = s.length;
          const token = new Token();
          token.params = { form: 'invalid' };

          console.log(s.length);
          s.insertTokenAt({ super: s.length + 10, sub: null }, token);
          assert.equal(original, s.length - 1);
          console.log(s.length);

          s.insertTokenAt({ super: -10, sub: null }, token);
          assert.equal(original, s.length - 2);
          console.log(s.length);

          let r = s.insertTokenAt({ super: 0, sub: s.length + 10 }, token);
          console.log(s.length);
          console.log(s.getToken(8));
          assert.equal(original, s.length - 3);

          s.insertTokenAt({ super: 0, sub: -10 }, token);
          assert.equal(original, s.length - 4);

        });
      });
    });
  });
});
