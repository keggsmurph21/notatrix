'use strict';

const _ = require('underscore');

const utils = require('./utils');
const SplitterError = utils.SplitterError;

let as = {

	'apertium stream': require('./formats/apertium-stream').split,
  apertiumStream: require('./formats/apertium-stream').split,
  Brackets: require('./formats/brackets').split,
  brackets: require('./formats/brackets').split,
  CG3: require('./formats/cg3').split,
  cg3: require('./formats/cg3').split,
  'CoNLL-U': require('./formats/conllu').split,
  conllu: require('./formats/conllu').split,
  'notatrix serial': require('./formats/notatrix-serial').split,
  notatrixSerial: require('./formats/notatrix-serial').split,
  Params: require('./formats/params').split,
  params: require('./formats/params').split,
  'plain text': require('./formats/plain-text').split,
  plainText: require('./formats/plain-text').split,
	SD: require('./formats/sd').split,
  sd: require('./formats/sd').split,

};

module.exports = (text, options) => {

  throw new SplitterError('not implemented');

};
module.exports.as = as;
