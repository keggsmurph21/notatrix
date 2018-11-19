const _ = require('underscore');
const errors = require('./errors');
const regex = require('./regex');

module.exports = _.extend({

  regex,

}, errors);
