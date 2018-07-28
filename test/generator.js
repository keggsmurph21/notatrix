'use strict';

const _ = require('underscore'),
  expect = require('chai').expect,
  sinon = require('sinon'),
  utils = require('./utils'),
  nx = require('..');

describe('generator', () => {

  describe('generate formats from nx.Sentence instance', () => {

    const options = {};

    utils.forEachText((text, format, name) => {
      it(`should parse ${format}:${name} to notatrix serial`, () => {

        //const s = new nx.Sentence(text, options);

      });
    });
  });

  /*
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
  */

});
