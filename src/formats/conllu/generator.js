'use strict';

const _ = require('underscore');

const utils = require('../../utils');
const GeneratorError = utils.GeneratorError;
const checkLoss = require('./check-loss')


module.exports = (sent, options) => {

  if (!sent || sent.name !== 'Sentence')
    throw new GeneratorError(`Unable to generate, input not a Sentence`, sent, options);

  options = _.defaults(options, sent.options, {
    checkLoss: true,
  });

  sent.index();

  let lines = [];
  sent.comments.forEach(comment => {
    lines.push('# ' + comment.body);
  });
  sent.tokens.forEach(token => {

    const toString = token => {
      return [

        token.indices.conllu,
        token.form || utils.fallback,
        token.lemma || utils.fallback,
        token.upostag || utils.fallback,
        token.xpostag || utils.fallback,
        token.feats || utils.fallback,
        token.getHead('CoNLL-U') || utils.fallback,
        token.deprel || utils.fallback,
        token.getDeps('CoNLL-U') || utils.fallback,
        token.misc || utils.fallback,

      ].join('\t');
    };

    lines.push(toString(token));
    token.subTokens.forEach(subToken => {
      lines.push(toString(subToken));
    });
  });

  const output = lines.join('\n');
  if (options.checkLoss)
    checkLoss(sent, output);

  return output;
};
