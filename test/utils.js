'use strict';

const _ = require('underscore');

const data = require('./data');
const noop = (arg) => arg;

module.exports = {

  noop,

  formats: [
    'Brackets',
    'CG3',
    'CoNLL-U',
    'notatrix serial',
    'Params',
    'plain text',
    'SD'
  ],

  forEachText: (callback) => {

    callback = callback || noop;

    _.each(data, (texts, format) => {
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

};
