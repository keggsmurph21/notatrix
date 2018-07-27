'use strict';

module.exports = {

  name: 'Brackets',
  split: require('../_core/default-splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator'),

};
