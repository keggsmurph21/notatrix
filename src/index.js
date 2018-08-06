'use strict';

const _ = require('underscore');
const nx = require('./nx');
const utils = require('./utils');
const errors = require('./utils/errors');

module.exports = _.extend({

  constants: utils.constants,
  formats: require('./formats'),
  funcs: utils.funcs,
  regex: utils.regex,
  data: require('../data'),

  detect: require('./detector'),
  generate: require('./generator'),
  parse: require('./parser'),
  split: require('./splitter'),
  convert: require('./converter'),

}, nx, errors);
