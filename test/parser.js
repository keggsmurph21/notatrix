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

    utils.forEachText((text, format, name) => {
      it(`should detect ${format}:${name} as ${format}`, () => {

        //expect(parse.as[format](text, options) instanceof nx.Sentence).to.equal(true);

      });
    });
  });

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

  });});
});
