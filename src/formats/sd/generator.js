'use strict';

const _ = require('underscore');

const utils = require('../../utils');
const GeneratorError = utils.GeneratorError;
const generateText = require('../plain-text').generate;
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

  lines.push(generateText(sent, { checkLoss: false }));

  sent.tokens.forEach(token => {

    token.mapHeads(head => {
      if (head.token.name === 'RootToken')
        lines.push(`root(ROOT, ${token.form})`);
    });
  });
  sent.tokens.forEach(token => {
    let deps = [];
    token.mapDeps(dep => {
      if (dep.deprel)
        deps.push(`${dep.deprel}(${token.form}, ${dep.token.form})`);
    });
    while (deps.length)
      lines.push(deps.pop());
  });

  const output = lines.join('\n');
  if (options.checkLoss)
    checkLoss(sent, output);

  return output;
};
