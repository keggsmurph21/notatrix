'use strict';

const _ = require('underscore');

const utils = require('../utils');
const NxBaseClass = require('./base-class');

class Comment extends NxBaseClass {
  constructor(body) {
    super('Comment');

    this.type = 'normal';
    this.body = body;

    const label = body.match(utils.re.commentLabel),
      sentId = body.match(utils.re.commentSentId);

    if (label) {

      let labels = [];
      label[3].split(/\s/).forEach(label => {
        if (label && labels.indexOf(label) === -1)
          labels.push(label)
      });

      this.type = 'label';
      this.labels = labels;

    } else if (sentId) {

      this.type = 'sent-id';
      this.id = sentId[2];

    }
  }
}

module.exports = Comment;
