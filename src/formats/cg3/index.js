'use strict';

module.exports = {

  name: 'CG3',
  split: require('../_core/default-splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator'),

};
