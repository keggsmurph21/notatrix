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
    //_.each(data, (texts, format) => {
      //describe(format, () => {
        _.each(data['CoNLL-U'], (text, name) => {
          it(`should serialize '${name}' to UD-Notation and back`, () => {
            const s = new Sentence();
            s.conllu = text;

            const actual = text.trim().replace(/[ \t]+/g, '\t').trim();
            const expected = s.conllu.replace(/[ \t]+/g, '\t').trim();
            assert.equal(actual, expected)
          });
        });
      //});
    //});
  });
});
