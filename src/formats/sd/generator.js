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

  if (sent.root)
    lines.push(`root(ROOT, ${sent.root.form})`);

  sent.tokens.forEach(token => {

    if (token._head && token.deprel && token._head.name !== 'RootToken')
      lines.push(`${token.deprel}(${token._head.form}, ${token.form})`);

  });

  const output = lines.join('\n');
  if (options.checkLoss)
    checkLoss(sent, output);

  return output;
};
