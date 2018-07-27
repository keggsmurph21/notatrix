'use strict';

const _ = require('underscore');

const DetectorError = require('./errors').DetectorError;
const funcs = require('./utils/funcs');
const constants = require('./utils/constants');

let as = {

	'apertium stream': require('./formats/apertium-stream/detector'),
	Brackets: require('./formats/brackets/detector'),
	CG3: require('./formats/cg3/detector'),
	'CoNLL-U': require('./formats/conllu/detector'),
	'notatrix serial': require('./formats/notatrix-serial/detector'),
	Params: require('./formats/params/detector'),
	'plain text': require('./formats/plain-text/detector'),
	SD: require('./formats/sd/detector'),

};

module.exports = (text, options) => {

  options = _.defaults(options, {
    suppressDetectorErrors: true,
		returnAllMatches: true,
  });

	const matches = constants.formats.map(format => {

		try {
			return as[format](text, options);
		} catch (e) {

			if (e instanceof DetectorError && options.suppressDetectorErrors)
				return;

			throw e;
		}

	}).filter(funcs.noop);

	if (!matches.length && !options.suppressDetectorErrors)
		throw new DetectorError('Unable to detect format', text, options);

	return options.returnAllMatches ? matches : matches[0];
};
module.exports.as = as;
