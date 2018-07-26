'use strict';

const _ = require('underscore');

const SplitterError = require('../errors').SplitterError;
const onDoubleNewlines = require('./on-double-newlines');
const onPunctuation = require('./on-punctuation');

const detect = require('../detector');

let as = {

	Brackets: onDoubleNewlines,
	CG3: onDoubleNewlines,
	'CoNLL-U': onDoubleNewlines,
	'notatrix serial': (text, options) => {
  	throw new SplitterError('Can\'t split serial');
  },
	Params: (text, options) => {
  	throw new SplitterError('Can\'t split params');
  },
	'plain text': onPunctuation,
	SD: onDoubleNewlines,

};


module.exports = (text, options) => {

  const format = detect(text, options);
  const splitted = as[format](text, options);

  return splitted;

};
module.exports.as = as;
_.extend(module.exports, {
  onDoubleNewlines,
  onPunctuation
});
