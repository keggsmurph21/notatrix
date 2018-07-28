'use strict';

const _ = require('underscore'),
  expect = require('chai').expect,
  sinon = require('sinon'),
  utils = require('./utils'),
  nx = require('..');

describe('generator', () => {

  describe('generate output in input format', () => {

    const options = {};

    utils.forEachText((text, format, name) => {
      it(`${format}:${name}`, () => {

        const s = new nx.Sentence(text, options);

        if (format === 'CoNLL-U')
          nx.generate[format](s);

      });
    });
  });

  /*
  describe('parse formats implicitly to notatrix serial', () => {

    const options = {};

    utils.forEachText((text, format, name) => {
      it(`${format}:${name}`, () => {

        const possibilities = nx.parse(text, options);
        _.each(possibilities, possibility => {
          expect(() => nx.detect.as.notatrixSerial(possibility)).to.not.throw();
        });

      });
    });
  });
  */

});
