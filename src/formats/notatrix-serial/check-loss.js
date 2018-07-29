'use strict';

const _ = require('underscore');

const utils = require('../../utils');
const Loss = utils.Loss;
const fields = require('./fields');

module.exports = (sent, output) => {

  throw new Error('not implemented');
  const serial = sent.serialize();

  if (!fields.hasComments && serial.comments.length)
    throw new Loss(['comments'], output);

  let losses = [];
  serial.tokens.forEach(token => {
    Object.keys(_.omit(token, fields)).forEach(field => {
      switch (field) {
        case ('index'):
          break;

        default:
          losses.push(field);
      }
    })

    if (losses.length)
      throw new Loss(losses, output);
  });
};
