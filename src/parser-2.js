'use strict';

const _ = require('underscore');

const utils = require('./utils');
const ParserError = utils.ParserError;
const Emitter = require('events');

let as = {

	//'apertium stream': require('./formats/apertium-stream').parse,
  //apertiumStream: require('./formats/apertium-stream').parse,
  //Brackets: require('./formats/brackets').parse,
  //brackets: require('./formats/brackets').parse,
  //CG3: require('./formats/cg3').parse,
  //cg3: require('./formats/cg3').parse,
  //'CoNLL-U': require('./formats/conllu').parse,
  conllu: require('./formats/conllu/parser-2'),
  //'notatrix serial': require('./formats/notatrix-serial').parse,
  //notatrixSerial: require('./formats/notatrix-serial').parse,
  //Params: require('./formats/params').parse,
  //params: require('./formats/params').parse,
  //'plain text': require('./formats/plain-text').parse,
  //plainText: require('./formats/plain-text').parse,
	//SD: require('./formats/sd').parse,
  //sd: require('./formats/sd').parse,

};

function parse(emitter) {

	var lineNum = -1,
		textBuffer = [];

	emitter.on('line', line => {

		++lineNum;
		textBuffer.push(line);

		const examining = textBuffer[0];

		let isBlank = /^\s*$/.test(examining);
		if (isBlank)
		 	return emitter.emit('find-break');

		let commentContent = examining.match(/^#\s*(.*)$/);
		if (commentContent)
			return emitter.emit('find-comment', commentContent[1]);

		let tokenContent = examining.match(/^\s*([\d.-]+.*)$/);
		if (tokenContent)
			return emitter.emit('find-token', tokenContent[1]);

		const errorLine = lineNum - textBuffer.length;
		throw new Error(`Unable to parse line ${errorLine} "${examining}"`);

	});

	emitter.on('find-break', () => {
		console.log('<br />');
		emitter.emit('consume');
	});

	emitter.on('find-comment', comment => {
		console.log(`<comment>${comment.slice(0,10)}...</comment>`);
		emitter.emit('consume');
	});

	emitter.on('find-token', token => {
		console.log(`<token>${token.slice(0,10)}...</token>`);
		emitter.emit('consume');
	});

	emitter.on('consume', () => {
		textBuffer.shift();
	});

}

module.exports = { parse };

/*
module.exports = (text, options) => {

	options = _.defaults(options, {
    suppressDetectorErrors: true,
		suppressParserErrors: true,
		returnAllPossibilities: true,
		requireOne: false,
  });

	const possibilities = utils.formats.map(format => {

		try {
			return as[format](text, options);
		} catch (e) {

			if (e instanceof ParserError && options.suppressParserErrors)
				return;

			throw e;
		}

	}).filter(utils.thin);

	if (!possibilities.length && !options.suppressDetectorErrors)
		throw new ParserError('Unable to detect format', text, options);

	if (options.requireOne && possibilities.length > 1)
		throw new ParserError('Unable to detect, ambiguous input');

	return options.returnAllPossibilities ? possibilities : possibilities[0];

};
module.exports.as = as;
*/
