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

  const output = sent.tokens.map(token => {

    if (token.analysis && token.analyses.length > 1)
      throw new GeneratorError('Unable to generate, contains ambiguous analyses');

    if (token.isSuperToken) {
      return token.subTokens.map(subToken => subToken.form).join(' ');
    } else {
      return token.form;
    }
  }).join(' ').replace(utils.re.spaceBeforePunctuation, '$1');

  if (options.checkLoss)
    checkLoss(sent, output);

  return output;
};
