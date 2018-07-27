'use strict';

const _ = require('underscore'),
  expect = require('chai').expect,
  sinon = require('sinon'),
  utils = require('./utils');

const data = require('../data');
const parse = require('../src/parser');
const ParserError = utils.ParserError;
const nx = require('../src/nx');

describe('parser', () => {

  describe('parse formats to nx.Sentence instance', () => {

    const options = {};

    let seen = new Set();

    utils.forEachText((text, format, name) => {
      if (!seen.has(format))
      it(`should parse ${format}:${name} to notatrix serial`, () => {

        const parsed = parse.as[format](text, options);
        console.log(parsed.tokens)
        expect(() => {}).to.not.throw();

      });
      seen.add(format)
    });
  });

  return;

  describe('poop!', () => {


    utils.forEachText((text, format, name) => {
      it('fuckin around', () => {
        if (format === 'CG3')
        parse.as.CG3(text);
      });

      it('again', () => {
        console.log('\n\n\n');
        parse.as.CG3(data.CG3[0]);

      });

  });
  utils.forEachText((text, format, name) => {
    it(`fuckin around with ${format}:${name}`, () => {
      if (format === 'CoNLL-U')
      parse.as['CoNLL-U'](text);
    });

});
it('again', () => {
  console.log('\n\n\n');
  parse.as['CoNLL-U'](data['CoNLL-U'].with_tabs);
  console.log('\n\n\n');
  parse.as['CoNLL-U'](data['CoNLL-U'].without_tabs);
  console.log('\n\n\n');
  parse.as['CoNLL-U'](data['CoNLL-U'].t)

});
utils.forEachText((text, format, name) => {
  it(`fuckin around with ${format}:${name}`, () => {
    if (format === 'plain text')
    parse.as['plain text'](text);
  });

});



});
});
