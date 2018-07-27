'use strict';

const _ = require('underscore');

const DetectorError = require('../errors').DetectorError;
const funcs = require('../utils/funcs');
const constants = require('../utils/constants');

let as = {

	'apertium-stream': require('./apertium-stream'),
	Brackets: require('./brackets'),
	CG3: require('./cg3'),
	'CoNLL-U': require('./conllu'),
	'notatrix serial': require('./notatrix-serial'),
	Params: require('./params'),
	'plain text': require('./plain-text'),
	SD: require('./sd'),

};

module.exports = (text, options) => {

  options = _.defaults(options, {
    suppressDetectorErrors: false,
		returnAllMatches: false,
  });

	const matches = constants.formats.map(format => {
		return as[format](text, options);
	}).filter(funcs.noop);

	if (matches.length)
		return options.returnAllMatches ? matches : matches[0];

	return undefined;
};
module.exports.as = as;
