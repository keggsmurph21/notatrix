'use strict';

const _ = require('underscore');

const utils = require('../../utils');
const GeneratorError = utils.GeneratorError;
const generateText = require('../plain-text').generate;
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

  let lines = [];
  sent.comments.forEach(comment => {
    lines.push('# ' + comment.body);
  });

  lines.push(generateText(sent, options));

  sent.tokens.forEach(token => {

    if (!options.allowLossyOutputs)
      checkLoss(token, fields);

    token.eachHead(head => {
      if (head.token.name === 'RootToken')
        lines.push(`root(ROOT, ${token.form})`);
    });
  });
  sent.tokens.forEach(token => {
    let deps = [];
    token.eachDep(dep => {
      if (dep.deprel)
        deps.push(`${dep.deprel}(${token.form}, ${dep.token.form})`);
    });
    while (deps.length)
      lines.push(deps.pop());
  });

  return lines.join('\n');
};
