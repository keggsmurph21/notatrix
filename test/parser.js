'use strict';

const _ = require('underscore'),
  expect = require('chai').expect,
  sinon = require('sinon'),
  utils = require('./utils'),
  nx = require('..');

describe('parser', () => {

  describe('parse formats explicitly to nx.Sentence instance', () => {

    const options = {};

    utils.forEachText((text, format, name) => {
      it(`should parse ${format}:${name} to notatrix serial`, () => {

        const parsed = nx.parse.as[format](text, options);
        expect(() => nx.detect.as.notatrixSerial(parsed)).to.not.throw();

      });
    });
  });

  describe('parse formats implicitly to nx.Sentence instance', () => {

    const options = {};

    utils.forEachText((text, format, name) => {
      it(`should detect ${format}:${name} as ${format}`, () => {

        const possibilities = nx.parse(text, options);
        _.each(possibilities, possibility => {
          expect(() => nx.detect.as.notatrixSerial(possibility)).to.not.throw();
        });

      });
    });
  });

});
