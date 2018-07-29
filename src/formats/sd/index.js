'use strict';

module.exports = {

  name: 'SD',
  fields: require('./fields'),
  split: require('../_core/default-splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator'),

};
