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

    return token.isSuperToken
      ? token.subTokens.map(subToken => subToken.value).join(' ')
      : token.form;

  }).join(' ').replace(utils.re.spaceBeforePunctuation, '$1');

  if (options.checkLoss)
    checkLoss(sent, output);

  return output;
};
