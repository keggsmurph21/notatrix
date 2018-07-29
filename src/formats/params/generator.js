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

    if (token.analysis)
      throw new GeneratorError('Unable to generate, contains ambiguous analyses or multiword tokens');

    let params = _.pick(token, utils.fields);
    params.head = token.getHead();
    params.deps = token.getDeps();

    return _.pick(params, value => value != undefined);
  });

  if (options.checkLoss)
    checkLoss(sent, output);

  return output;
};
