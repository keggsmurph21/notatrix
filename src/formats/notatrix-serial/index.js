'use strict';

module.exports = {

  name: 'notatrix serial',
  split: require('./splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator'),

};
