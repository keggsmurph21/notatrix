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
  return sent.tokens.map(token => {

    if (!options.allowLossyOutputs)
      checkLoss(token, fields);

    if (token.analysis)
      throw new GeneratorError('Unable to generate, contains ambiguous analyses or multiword tokens');

    let params = _.pick(token, utils.fields);
    params.head = token.getHead();
    params.deps = token.getDeps();

    return _.pick(params, value => value != undefined);
  });
};
