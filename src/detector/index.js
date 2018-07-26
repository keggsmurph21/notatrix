'use strict';

const _ = require('underscore');

const DetectorError = require('../errors').DetectorError;

let as = {

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
    suppressDetectorErrors: false
  });

  let format = null;



  if (format)
    return format;

  if (options.suppressDetectorErrors) {
    return undefined;
  } else {
    throw new DetectorError('Unable to detect format', text, options);
  }
  if (false) {
    // catch Notatrix format here
    if (typeof text === 'object') {
      const objKeys = new Set(Object.keys(text))
      const nxKeys = new Set(['options', 'comments', 'tokens']);
      return _.isEqual(objKeys, nxKeys) ? 'nx' : format;
    }

    text = (text || '').trim();

    if (text === '') {
    	return format;
    }

    // get `word` to point to the first non-comment word
    const lines = text.split('\n');
    let wordIndex = 0, word = lines[wordIndex];

    while (word.startsWith('#')) {
  	  wordIndex++;
  	  if (wordIndex === lines.length)
  		  break;
  	  word = lines[wordIndex];
    }

    if (word.match(/^\W*[\'|\"]</)) {
  	  format = 'CG3';
    } else if (word.match(/^\s*1/)) {
  	  format = 'CoNLL-U'; // UNSAFE: the first token in the string should start with "1"
    } else if (text.includes('(')
  	  && text.includes('\n')  // SD needs to be at least two lines
  	  && (text.includes(')\n') || text[text.length-1] === ')')) {

  	  format = 'SD'; // UNSAFE

    } else if (word.match(/\[/)) {
  	  format = 'Brackets'; // UNSAFE: this will catch any plain text string starting with "[" :/
    } else if (text[text.length-1] !== ')') {
  	  format = 'plain text'; // UNSAFE
    }

    return format;
  }
};
module.exports.as = as;
