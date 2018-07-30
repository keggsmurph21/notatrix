'use strict';

const _ = require('underscore');

const utils = require('../../utils');
const Loss = utils.Loss;
const fields = require('./fields');

module.exports = (sent, output) => {

  const serial = sent.serialize();
  let losses = new Set();

  if (!fields.hasComments && serial.comments.length)
    losses.add('comments');

  const tokenCalcLoss = token => {
    Object.keys(_.omit(token, fields)).forEach(field => {
      switch (field) {
        case ('index'):
        case ('deps'):
          break;

        case ('misc'):
          if (token.misc !== token.other)
            losses.add(field);
          break;

        default:
          losses.add(field);
      }
    });
  };

  serial.tokens.map(token => {

    tokenCalcLoss(token);

    (token.analyses || []).forEach(analysis => {

      const analysisKeys = Object.keys(analysis);
      if (analysisKeys.length > 1 || analysisKeys[0] !== 'subTokens') {
        losses.add('analyses');
      } else {
        analysis.subTokens.map(subToken => {

          tokenCalcLoss(subToken);

          if (subToken.form != undefined)
            losses.add('form');
            
        });
      }

    });
  });

  if (losses.size)
    throw new Loss(Array.from(losses), output);
};
