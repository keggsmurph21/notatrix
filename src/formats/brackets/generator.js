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

  // get the root of the tree;
  let root = null;
  sent.tokens.forEach(token => {
    token.eachHead(head => {
      if (head.token.name === 'RootToken')
        root = token;
    });
  });

  if (root == null)
    throw new GeneratorError('Unable to generate, could not find root');

  // build the tree structure
  let seen = new Set([ root ]);
  root = {
    token: root,
    deprel: 'root',
    deps: [],
  };

  const visit = node => {

    if (!options.allowLossyOutputs)
      checkLoss(node.token, fields);

    node.token.eachDep(dep => {

      if (seen.has(dep.token))
        throw new GeneratorError('Unable to generate, dependency structure non-linear');

      node.deps.push({
        token: dep.token,
        deprel: dep.deprel,
        deps: [],
      });
      seen.add(dep.token);

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

  return output;
};
