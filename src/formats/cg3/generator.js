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
    omitIndices: false,
  });

  sent.index();

  let lines = [];
  sent.comments.forEach(comment => lines.push('# ' + comment.body));
  sent.tokens.forEach(token => {

    const push = (token, indent) => {

      if (!token.lemma)
        throw new GeneratorError(`Unable to generate, token has no lemma`, sent, options);

      indent = (token.semicolon ? ';' : '') + '\t'.repeat(indent);

      const head = token.getHead('CG3');
      const dependency = options.omitIndices
        ? null
        : '#' + token.indices.cg3 + '->' + (head == undefined ? '' : head);

      let line = [ `"${token.lemma}"` ]
        .concat(token.xpostag)
        .concat(token._misc)
        .concat(token.deprel ? '@' + token.deprel : null)
        .concat(dependency);

      line = indent + line.filter(utils.thin).join(' ');
      lines.push(line);
    };

    lines.push(`"<${token.form || utils.fallback}>"`);

    if (token._analyses && token._analyses.length) {

      token._analyses.forEach(analysis => {
        analysis.subTokens.forEach((subToken, i) => {

          push(subToken, i+1);

        });
      });

    } else {

      push(token, 1);

    }

  });

  const output = lines.join('\n');
  if (options.checkLoss)
    checkLoss(sent, output);

  return output;
};
