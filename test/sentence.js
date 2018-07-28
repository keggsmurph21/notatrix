'use strict';

const _ = require('underscore'),
  expect = require('chai').expect,
  sinon = require('sinon'),
  utils = require('./utils'),
  nx = require('..');

describe('Sentence', () => {

  describe('instantiate nx.Sentence with explicit format', () => {
    utils.forEachText((text, format, name) => {

      const options = {
        interpretAs: format,
      };

      it(`${format}:${name}`, () => {

        expect(() => { new nx.Sentence(text, options) }).to.not.throw();

      });
    });
  });

  describe('instantiate nx.Sentence without explicit format', () => {
    utils.forEachText((text, format, name) => {
      it(`${format}:${name}`, () => {

        expect(() => { new nx.Sentence(text) }).to.not.throw();

      });
    });
  });

});
