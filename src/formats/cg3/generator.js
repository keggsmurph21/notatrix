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
    omitIndices: false,
  });

  sent.index();
  let lines = [];

  sent.comments.forEach(comment => lines.push('# ' + comment.body));
  sent.tokens.forEach(token => {

    if (!options.allowLossyOutputs)
      checkLoss(token, fields);

    const push = (token, indent) => {

      if (!token.lemma)
        throw new GeneratorError(`Unable to generate, token has no lemma`, sent, options);

      indent = (token.semicolon ? ';' : '') + '\t'.repeat(indent);

      const head = token.getHead();
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

  /*
  return [].concat(
    sent.comments.map(comment => '# ' + comment.body),
    sent.tokens.map(token => {

      const toString = (token, i) => {

        if (i === 0) {

          return `"<${token.form || utils.fallback}>"`;

        } else {

          return 'tmp';
        }
      };

      const tokens = token.analyses && token.analyses.length
        ? []
        : [ token ];

      return tokens.map(toString).join('\n');

      /*
      const toString = token => {
        return [

          token.indices.conllu,
          token.form || utils.fallback,
          token.lemma || utils.fallback,
          token.upostag || utils.fallback,
          token.xpostag || utils.fallback,
          token.feats || utils.fallback,
          token.getHead('cg3') || utils.fallback,
          token.deprel || utils.fallback,
          token.getDeps('cg3') || utils.fallback,
          token.misc || utils.fallback,

        ].join('\t');
      };


      return [ token ].concat(token.subTokens).map(toString).join('\n');
      */

  return lines.join('\n');
};
