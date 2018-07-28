'use strict';

const _ = require('underscore');
const nx = require('./nx');
const errors = require('./utils/errors');

module.exports = _.extend({

  constants: require('./utils/constants'),
  formats: require('./formats'),
  regex: require('./utils/regex'),
  data: require('../data'),

  detect: require('./detector'),
  generate: require('./generator'),
  parse: require('./parser'),
  split: require('./splitter'),

}, nx, errors);