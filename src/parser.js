'use strict';

const _ = require('underscore');

const utils = require('./utils');
const ParserError = utils.ParserError;

let as = {

	'apertium stream': require('./formats/apertium-stream').parse,
	Brackets: require('./formats/brackets').parse,
	CG3: require('./formats/cg3').parse,
	'CoNLL-U': require('./formats/conllu').parse,
	'notatrix serial': require('./formats/notatrix-serial').parse,
	Params: require('./formats/params').parse,
	'plain text': require('./formats/plain-text').parse,
	SD: require('./formats/sd').parse,

};

module.exports = (text, options) => {

  throw new ParserError('not implemented');

};
module.exports.as = as;
