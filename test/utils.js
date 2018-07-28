'use strict';

const _ = require('underscore');

const srcUtils = require('../src/utils');
const data = require('../data');

module.exports = _.extend({

  forEachText: callback => {

    callback = callback || srcUtils.noop;

    _.each(data, (texts, format) => {
      if (srcUtils.formats.indexOf(format) > -1)
        _.each(texts, (text, name) => {
          callback(text, format, name);
        });
    });
  },

  randomInt: (min, max) => {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.floor(Math.random() * max) + min;
  },

  forEachFormat: callback => {

    callback = callback || srcUtils.noop;
    _.each(srcUtils.formats, callback);

  },

}, srcUtils);
