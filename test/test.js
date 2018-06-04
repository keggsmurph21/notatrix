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

describe('Analysis', () => {

});

describe('Token', () => {

});

describe('Sentence', () => {
  describe('serializer', () => {
    _.each(data['CoNLL-U'], (text, name) => {
      it(`${name}: should serialize to UD-Notation and back`, () => {
        const s = new Sentence();
        s.conllu = text;

        const actual = text.trim().replace(/[ \t]+/g, '\t').trim();
        const expected = s.conllu.replace(/[ \t]+/g, '\t').trim();
        assert.equal(actual, expected)
      });
    });
  });

  describe('token getters', () => {
    _.each(data['CoNLL-U'], (text, name) => {
      describe(name, () => {
        const s = new Sentence();
        s.conllu = text;

        const lines = text.split('\n');
        let c = 0, t = 0;
        for (let i=0; i<lines.length; i++) {

          const actual = lines[i].slice(1).trim();

          if (lines[i].startsWith('#')) {
            it(`should get comment by index`, () => {
              const expected = s.getComment(c);
              assert.equal(actual, expected);
              c++;
            });
          } else {
            it(`should get token by index`, () => {
              const expected = s.getAnalysis(t).conllu;
              assert.equal(actual, expected);
              t++;
            });
          }
        }
          /*
          const actual = text.trim().replace(/[ \t]+/g, '\t').trim();
          const expected = s.conllu.replace(/[ \t]+/g, '\t').trim();
          assert.equal(actual, expected)*/
      });
    });
  });
});
