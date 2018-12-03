const _ = require('underscore');
const errors = require('./errors');
const funcs = require('./funcs');

module.exports = _.extend({

  re: require('./regex'),

}, errors, funcs);
