'use strict';

const _ = require('underscore'),
  expect = require('chai').expect,
  sinon = require('sinon'),
  utils = require('./utils');

const data = require('./data');
const detect = require('../src/detector');


describe('detector', () => {

  describe('detect formats explicitly', () => {

    const options = {
      requireTenParams: true,
    };

    utils.forEachText((text, format, name) => {
      it(`should detect ${format}:${name} as ${format}`, () => {

        expect(detect.as[format](text, options)).to.equal(format);

      });
    });
  });

  return;
  describe('detect formats implicitly', () => {

    const options = {};

    utils.forEachText((text, format, name) => {
      it(`should detect ${format}:${name} as ${format}`, () => {

        expect(detect(text, options)).to.equal(format);

      });
    });
  });

});
