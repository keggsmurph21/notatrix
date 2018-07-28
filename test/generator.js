'use strict';

const _ = require('underscore'),
  expect = require('chai').expect,
  sinon = require('sinon'),
  utils = require('./utils'),
  nx = require('..');

describe('generator', () => {

  describe('generate nx.Sentence instance from explicit formats', () => {
    utils.forEachText((text, format, name) => {

      const options = {
        interpretAs: format,
        suppressDetectorErrors: true,
        suppressParserErrors: true,
      };

      it(`should generate nx.Sentence from ${format}:${name}`, () => {

        new nx.Sentence(text, options);
        //expect(() => { new nx.Sentence(text, options) }).to.not.throw();

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
