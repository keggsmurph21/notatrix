'use strict';

/*
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});*/

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

        const actual = clean(text);
        const expected = clean(s.conllu);
        assert.equal(actual, expected)
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
          const actual = lines.length;
          const expected = s.comments.length + s.length;
          assert.equal(actual, expected);
        });

        let c = 0, t = 0;
        for (let i=0; i<lines.length; i++) {

          if (lines[i].startsWith('#')) {
            it(`should get comment by index`, () => {
              const actual = lines[i].slice(1).trim();
              const expected = s.getComment(c);
              assert.equal(actual, expected);
              c++;
            });
          } else {
            it(`should get token by index-number`, () => {
              const actual = clean(lines[i]);
              const token = s.getToken(t)
              const expected = clean(token.analysis.conllu);
              assert.equal(actual, expected);
              t++;
            });
            it(`should get token by index-string`, () => {
              const actual = clean(lines[i]);
              const index = lines[i].split(/[ \t]/)[0];
              const expected = clean(s.getTokenById(index).conllu);
              assert.equal(actual, expected);
            });
          }
        }
      });
    });
  });
});
