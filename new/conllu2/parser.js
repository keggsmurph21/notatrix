'use strict';

const _ = require('underscore');

const core = require('../core');
const utils = require('../../src/utils');
const ParserError = utils.ParserError;
const detect = require('./detector');

var sentence;
var expecting;
var superToken;

function getHeads(head, deprel, deps) {

  head = utils.re.fallback.test(head) ? null : head;
  deprel = utils.re.fallback.test(deprel) ? null : deprel;
  deps = utils.re.fallback.test(deps) ? null : deps;

  let heads = [];
  let seen = new Set();

  if (!head)
    return null;

  heads.push({
    index: head,
    deprel: deprel || null,
  });

  seen.add(head);

  if (deps)
    deps.split('|').forEach(dep => {

      dep = dep.split(':');

      if (!seen.has(dep[0]))
        heads.push({
          index: dep[0],
          deprel: dep[1] || null,
        });

      seen.add(dep[0]);
    });

  return heads;
}

function parseIndex(str) {

  const index = (str || '').match(utils.re.conlluEmptyIndex);
  if (!index)
    return null;

  return index[2]
    ? {
      major: parseInt(index[1]),
      minor: parseInt(index[2]),
    }
    : {
      major: parseInt(index[1]),
      minor: null,
    };
}

function assertNext(supStr, subStr) {

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

/*core.on('tokenize-reset', () => {


});*/

core.on('tokenize-comment', comment => {

  if (expecting.indexOf('comment') < 0)
    throw new ParserError(`expecting ${expecting.join('|')}, got comment`);

  expecting = ['comment', 'super-token', 'token'];
  sentence.comments.push(comment);

});

core.on('tokenize-token', token => {

  if (expecting.indexOf('token') < 0)
    throw new ParserError(`expecting ${expecting.join('|')}, got token`);

  if (superToken) {

    assertNext(superToken.currentIndex, token.index);
    superToken.currentIndex = token.index;

    superToken.analyses[0].subTokens.push(_.omit(token, ['type']));

    if (superToken.currentIndex === superToken.stopIndex) {

      superToken = null;
      expecting = ['super-token', 'token'];
      sentence.tokens.push(_.omit(superToken, ['currentIndex', 'stopIndex']));

    } else {
      expecting = ['token'];
    }

  } else {

    expecting = ['super-token', 'token'];
    sentence.tokens.push(_.omit(token, ['type']));

  }

});

core.on('tokenize-super-token', superToken => {

  if (expecting.indexOf('super-token') < 0)
    throw new ParserError(`expecting ${expecting.join('|')}, got super-token`);

  superToken = {
    form: superToken.form,
    misc: superToken.misc,
    analyses: [{
      subTokens: []
    }],
    index: superToken.index,
    currentIndex: null,
    stopIndex: superToken.stopIndex
  };

  expecting = ['token'];

});

core.on('parse-comment', comment => {

  sentence.comments.push(comment);

});

core.on('parse-token', token => {

  sentence.tokens.push(token);

});

module.exports = (lines, options) => {

  options = _.defaults(options, {
    allowEmptyString: false,
    requireTenParams: false,
    allowWhiteLines: true,
  });

  sentence = {
    comments: [],
    tokens: [],
  };
  expecting = ['comment', 'super-token', 'token'];
  superToken = null;

  try {
    detect(lines.join('\n'), options);
  } catch (e) {
    if (e instanceof utils.DetectorError)
      throw new ParserError(e.message);

    throw e;
  }

  if (!Array.isArray(lines))
    throw new ParserError('expected array of strings');

  // "tokenize" into comments/tokens/superTokens
  core.emit('tokenize-reset');

  lines.forEach(line => {

    const commentLine = line.match(utils.re.comment);
    const tokenLine = line.match(options.requireTenParams
      ? utils.re.conlluTokenLineTenParams
      : utils.re.conlluTokenLine);

    if (line.match(utils.re.whiteline)) {

      // do nothing

    } else if (commentLine) {

      core.emit('tokenize-comment', commentLine[2]);

    } else if (tokenLine) {

      let fields = tokenLine[7];
      if (/(\t|[ ]{2,})/g.test(fields)) {

        fields = fields.replace(/[ ]{2,}/g, '\t').split(/\t/g).filter(utils.thin);

      } else {

        fields = fields.split(/[\t ]+/g).filter(utils.thin);

      }

      if (tokenLine[4]) {

        core.emit('tokenize-super-token', {
          index: tokenLine[1],
        	startIndex: tokenLine[2],
        	stopIndex: tokenLine[5],
        	form: utils.re.fallback.test(fields[0]) ? null : fields[0],
        	misc: utils.re.fallback.test(fields[8]) ? null : fields[8].split('|'),
        });

      } else {

        core.emit('tokenize-token', {
          index: tokenLine[1],
        	isEmpty: !!tokenLine[3],
        	form: !fields[0] || utils.re.fallback.test(fields[0])
            ? null
            : fields[0],
        	lemma: !fields[1] || utils.re.fallback.test(fields[1])
            ? null
            : fields[1],
        	upostag: !fields[2] || utils.re.fallback.test(fields[2])
            ? null
            : fields[2],
        	xpostag: !fields[3] || utils.re.fallback.test(fields[3])
            ? null
            : fields[3],
        	feats: !fields[4] || utils.re.fallback.test(fields[4])
            ? null
            : fields[4].split('|'),
          heads: getHeads(fields[5], fields[6], fields[7]),
        	misc: !fields[8] || utils.re.fallback.test(fields[8])
            ? null
            : fields[8].split('|'),
        });
      }

    } else {
      throw new ParserError(`unable to match line: ${line}`, lines.join('\n'), options);
    }

  });

  core.emit('parse-sentence', sentence);

  return {
    input: lines.join('\n'),
    //options: options,
    //comments: comments,
    //tokens: tokens,
  };
};
