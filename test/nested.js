'use strict';

const _ = require('underscore');
const expect = require('chai').expect;

const conllu = require('./data/index')['CoNLL-U'];
const cg3 = require('./data/index').CG3;

const Sentence = require('../src/sentence');
const Token = require('../src/token');
const Analysis = require('../src/analysis');
const NotatrixError = require('../src/errors').NotatrixError;

function ignoreSemicolons(str) {
  return str.split('\n').map(line => {
    return line.replace(/^;/, '');
  }).join('\n');
}

describe('CoNLL-U', () => {
  _.each(['nested_2'], name => {
    describe(`parsing ${name}`, () => {
      const serial = conllu[name];
      let s = new Sentence();
      s.conllu = serial;

      //console.log(serial);
      //console.log(s.conllu);

      it(`is identical`, () => {
        expect(s.conllu).to.be.equal(serial);
      });

    });
  });

});

describe('CG3', () => {

  //if (false)
  describe('parsing "nested"', () => {
    const serial = cg3.nested;
    let s = new Sentence({
      showEmptyDependencies: false
    });
    s.cg3 = serial;

    it(`is identical`, () => {
      expect(s.cg3).to.be.equal(serial);
    });
  });

  //if (false)
  describe('parsing "nested_2"', () => {
    const serial = cg3.nested_2;
    let s = new Sentence();
    s.cg3 = serial;

    it(`is identical`, () => {
      expect(s.cg3).to.be.equal(serial);
    });
  });

  describe('parsing "kdt_tagged_1"', () => {
    const serial = cg3.kdt_tagged_1;
    let s = new Sentence({
      showEmptyDependencies: false
    });
    s.cg3 = serial;

    it(`is identical`, () => {
      expect(s.cg3).to.be.equal(serial);
    });
  });

  describe('parsing "apertium_kaz_1"', () => {
    const serial = cg3.apertium_kaz_1;
    let s = new Sentence({
      showEmptyDependencies: false
    });
    s.cg3 = serial;

    it(`is identical`, () => {
      expect(s.cg3).to.be.equal(ignoreSemicolons(serial));
    });
  });
});
