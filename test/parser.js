'use strict';

const _ = require('underscore'),
  expect = require('chai').expect,
  sinon = require('sinon'),
  utils = require('./utils');

const data = require('../data');
const parse = require('../src/parser');
const ParserError = utils.ParserError;
const nx = require('../src/nx');
const nxDetector = require('../src/formats/notatrix-serial').detect;

describe('parser', () => {

  describe('parse formats explicitly to nx.Sentence instance', () => {

    const options = {};

    utils.forEachText((text, format, name) => {
      it(`should parse ${format}:${name} to notatrix serial`, () => {

        const parsed = parse.as[format](text, options);
        expect(() => nxDetector(parsed)).to.not.throw();

      });
    });
  });

  describe('parse formats implicitly to nx.Sentence instance', () => {

    const options = {};

    utils.forEachText((text, format, name) => {
      it(`should detect ${format}:${name} as ${format}`, () => {

        const possibilities = parse(text, options);
        _.each(possibilities, possibility => {
          expect(() => nxDetector(possibility)).to.not.throw();
        });

      });
    });
  });

});
