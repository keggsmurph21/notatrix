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
          break;

        case ('other'):
          if (token.misc !== token.other)
            losses.add(field);
          break;

        case ('analyses'):
          if (token.analyses.length > 1) {
            losses.add('analyses');
          } else {

            const analysis = token.analyses[0],
              analysisKeys = Object.keys(analysis);

            if (analysisKeys.length > 1 || analysisKeys[0] !== 'subTokens') {
              losses.add('analyses');
            } else {
              analysis.subTokens.map(tokenCalcLoss);
            }
          }
          break;

        default:
          losses.add(field);
      }
    });
  };

  serial.tokens.map(tokenCalcLoss);

  if (losses.size)
    throw new Loss(Array.from(losses), output);
};
