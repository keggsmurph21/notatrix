const _ = require('underscore');
const errors = require('./errors');

module.exports = _.extend({

  re: require('./regex'),

}, errors);
