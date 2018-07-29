'use strict';

const _ = require('underscore');

const utils = require('../../utils');
const Loss = utils.Loss;
const fields = require('./fields');

module.exports = (sent, output) => {

  const serial = sent.serialize();

  if (!fields.hasComments && serial.comments.length)
    throw new Loss(['comments'], output);

  let losses = [];

  const tokenCalcLoss = token => {
    Object.keys(_.omit(token, fields)).forEach(field => {
      switch (field) {
        case ('index'):
          break;

        case ('other'):
          if (token.misc !== token.other)
            losses.push(field);
          break;

        case ('analyses'):
          if (token.analyses.length > 1) {
            losses.push('analyses');
          } else {

            const analysis = token.analyses[0],
              analysisKeys = Object.keys(analysis);

            if (analysisKeys.length > 1 || analysisKeys[0] !== 'subTokens') {
              losses.push('analyses');
            } else {
              analysis.subTokens.map(tokenCalcLoss);
            }
          }
          break;

        default:
          losses.push(field);
      }
    });
  };

  serial.tokens.map(tokenCalcLoss);

  if (losses.length)
    throw new Loss(losses, output);
};
