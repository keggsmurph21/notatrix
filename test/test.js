'use strict';

const _ = require('underscore');
const assert = require('assert');

const data = require('./data/index');
const Sentence = require('../src/sentence');
const Token = require('../src/token');
const Analysis = require('../src/analysis');

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

            it(`should get token by index-number`, () => {
              const actual = clean(token.analysis.conllu);
              assert.equal(expected, actual);
            });

            it(`should get token by index-string`, () => {
              const actual = clean(s.getTokenById(index).conllu);
              assert.equal(expected, actual);
            });

            _.each(token.analysis.head.match(/[0-9]+/g), match => {
              match = parseInt(match);
              if (match) { // catch 0 and NaN
                it(`should have found a real head`, () => {
                  assert.equal(true, s.getTokenById(match) instanceof Analysis);
                });
              }
            });
          }
        }
      });
    });
  });
});
