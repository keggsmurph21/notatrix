'use strict';

module.exports = {

  name: 'CoNLL-U',
  split: require('../_core/default-splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator'),

};
