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

  if (!sent.root)
    throw new GeneratorError('Unable to generate, could not find root');

  // build the tree structure
  let seen = new Set([ sent.root ]);
  let root = {
    token: sent.root,
    deprel: 'root',
    deps: [],
  };

  const visit = node => {

    sent.getDependents(node.token).forEach(dep => {

      if (seen.has(dep))
        throw new GeneratorError('Unable to generate, dependency structure non-linear');

      node.deps.push({
        token: dep,
        deprel: dep.deprel,
        deps: [],
      });
      seen.add(dep);

      const next = node.deps.slice(-1)[0];
      if (next)
        visit(next);
    });
  }
  visit(root);

  //console.log(root);

  if (seen.size < sent.size)
    throw new GeneratorError('Unable to generate, sentence not fully connected');

  // parse the tree into a string
  let output = '';
  const walk = node => {
    output += '[' + (node.deprel || '') + ' ';

    node.deps.forEach(dep => {
      if (dep.token.indices.absolute < node.token.indices.absolute)
        walk(dep);
    });

    output += ' ' + node.token.form + ' ';

    node.deps.forEach(dep => {
      if (dep.token.indices.absolute > node.token.indices.absolute)
        walk(dep);
    });

    output += ' ] ';
  }
  walk(root);

  // clean up the output
  output = output
    .replace(/\s+/g, ' ')
    .replace(/ \]/g, ']')
    .replace(/(\w)_(\w)/, '$1 $2')
    .trim();

  // console.log(output);

  if (options.checkLoss)
    checkLoss(sent, output);

  return output;
};
