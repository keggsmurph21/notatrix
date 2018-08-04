'use strict';

const _ = require('underscore');

const utils = require('../../utils');
const ParserError = utils.ParserError;
const detect = require('./detector');

module.exports = (text, options) => {

  function assertNext(supStr, subStr) {

    const parseIndex = str => {
      const match = str.match(utils.re.conlluEmptyIndex);
      return match[2]
        ? {
            major: parseInt(match[1]),
            minor: parseInt(match[2]),
          }
        : {
            major: parseInt(match[1]),
            minor: null,
          };
    }

    if (supStr === null)
      return;

    const sup = parseIndex(supStr),
      sub = parseIndex(subStr);

    if (sub.minor === null) {
      if (sub.major - sup.major !== 1)
        throw new ParserError(`unexpected token index (at: ${sup.major}${sup.minor === null ? '' : '.' + sup.minor}, got: ${sup.major}${sup.minor === null ? '' : '.' + sup.minor})`);

    } else if (sup.minor === null) {
      if (sub.minor !== 1)
        throw new ParserError(`unexpected token index (at: ${sup.major}${sup.minor === null ? '' : '.' + sup.minor}, got: ${sup.major}${sup.minor === null ? '' : '.' + sup.minor})`);

    } else {
      if (sub.minor - sup.minor !== 1)
        throw new ParserError(`unexpected token index (at: ${sup.major}${sup.minor === null ? '' : '.' + sup.minor}, got: ${sup.major}${sup.minor === null ? '' : '.' + sup.minor})`);

    }
  }

  options = _.defaults(options, {
    allowEmptyString: false,
    requireTenParams: false,
    allowWhiteLines: true,
  });

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof utils.DetectorError)
      throw new ParserError(e.message);

    throw e;
  }

  //console.log();
  //console.log(text);

  // "tokenize" into chunks
  let i = 0, chunks = [];
  const lines = text.split('\n');
  const tokenRegex = options.requireTenParams
    ? utils.re.conlluTokenLineTenParams
    : utils.re.conlluTokenLine;

  lines.forEach(line => {
    const whiteline = line.match(utils.re.whiteline),
      comment = line.match(utils.re.comment),
      tokenLine = line.match(tokenRegex);

    if (whiteline) {

    } else if (comment) {

      chunks.push({
        type: 'comment',
        body: comment[2]
      });

    } else if (tokenLine) {

      let token;
      const fields = tokenLine[7].split(/\s/).filter(utils.thin);

      if (tokenLine[4]) {

        token = {
        	type: 'super-token',
          index: tokenLine[1],
        	startIndex: tokenLine[2],
        	stopIndex: tokenLine[5],
        	form: utils.re.fallback.test(fields[0]) ? null : fields[0],
        	misc: utils.re.fallback.test(fields[8]) ? null : fields[8],
        };

      } else {

        token = {
        	type: 'token',
          index: tokenLine[1],
        	isEmpty: !!tokenLine[3],
        	form: utils.re.fallback.test(fields[0]) ? null : fields[0],
        	lemma: utils.re.fallback.test(fields[1]) ? null : fields[1],
        	upostag: utils.re.fallback.test(fields[2]) ? null : fields[2],
        	xpostag: utils.re.fallback.test(fields[3]) ? null : fields[3],
        	feats: utils.re.fallback.test(fields[4]) ? null : fields[4],
        	head: utils.re.fallback.test(fields[5]) ? null : fields[5],
        	deprel: utils.re.fallback.test(fields[6]) ? null : fields[6],
        	deps: utils.re.fallback.test(fields[7]) ? null : fields[7],
        	misc: utils.re.fallback.test(fields[8]) ? null : fields[8],
        };

      }
      chunks.push(token);

    } else {
      throw new ParserError(`unable to match line: ${line}`, text, options);

    }

  });

  //console.log(chunks);

  let tokens = [];
  let comments = [];
  let expecting = ['comment', 'super-token', 'token'];
  let superToken = null;

  chunks.filter(utils.thin).forEach(chunk => {

    if (expecting.indexOf(chunk.type) === -1)
      throw new ParserError(`expecting ${expecting.join('|')}, got ${chunk.type}`, text, options);

    if (chunk.type === 'comment') {

      comments.push(chunk.body);
      expecting = ['comment', 'super-token', 'token'];

    } else if (chunk.type === 'super-token') {

      superToken = {
        form: chunk.form,
        misc: chunk.misc,
        analyses: [{
          subTokens: []
        }],
        index: chunk.index,
        currentIndex: null,
        stopIndex: chunk.stopIndex
      };

      expecting = ['token'];

    } else if (chunk.type === 'token') {

      if (superToken) {

        assertNext(superToken.currentIndex, chunk.index);
        superToken.currentIndex = chunk.index;

        superToken.analyses[0].subTokens.push(_.omit(chunk, ['type']));

        if (superToken.currentIndex === superToken.stopIndex) {

          tokens.push(_.omit(superToken, ['currentIndex', 'stopIndex']));
          superToken = null;
          expecting = ['super-token', 'token'];

        } else {
          expecting = ['token'];
        }

      } else {

        tokens.push(_.omit(chunk, ['type']));
        expecting = ['super-token', 'token'];

      }

    } else {
      throw new ParserError(`unrecognized chunk type: ${chunk.type}`, text, options);

    }
  });

  //console.log(comments);
  //console.log(tokens);

  return {
    input: text,
    options: options,
    comments: comments,
    tokens: tokens,
  };
};
