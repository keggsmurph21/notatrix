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

  serial.tokens.forEach(token => {
    Object.keys(_.omit(token, fields)).forEach(field => {
      switch (field) {
        case ('uuid'):
        case ('index'):
        case ('deps'):
          break;

        default:
          losses.add(field);
      }
    })

    if (losses.size)
      throw new Loss(Array.from(losses), output);
  });
};
