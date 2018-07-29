'use strict';

const _ = require('underscore');

const utils = require('../../utils');
const GeneratorError = utils.GeneratorError;
const checkLoss = require('../_core/check-loss');
const fields = require('./fields');

module.exports = (sent, options) => {

  if (!sent || sent.name !== 'Sentence')
    throw new GeneratorError(`Unable to generate, input not a Sentence`, sent, options);

  options = _.extend(options, sent.options);
  options = _.defaults(options, {
    allowLossyOutputs: true,
  });

  sent.index();
  return [].concat(
    sent.comments.map(comment => '# ' + comment.body),
    sent.tokens.map(token => {

      if (!options.allowLossyOutputs)
        checkLoss(token, fields);

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

      return [ token ].concat(token.subTokens).map(toString).join('\n');
    })
  ).join('\n');
};
