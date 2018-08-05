'use strict';

const _ = require('underscore');

const utils = require('../utils');
const NxBaseClass = require('./base-class');
const Label = require('./label');


class Labeler extends NxBaseClass {
  constructor(corpus) {

    super('Labeler');
    this.corpus = corpus;

    this._labels = {};
    this._filter = new Set();

  }

  serialize() {
    return {
      labels: this._labels.map(label => label.state),
      filter: Array.from(this._filter)
    };
  }

  get(name) {
    return this._labels[name];
  }

  count(name) {
    return this._labels[name]
      ? this._labels[name]._sents.size
      : 0;
  }



  sentenceHasLabel(sent, searching) {

    let hasLabel = false;
    sent.comments.forEach(comment => {
      if (comment.type === 'label') {
        comment.labels.forEach(name => {
          if (name === searching)
            hasLabel = true;
        });
      }
    });

    return hasLabel;
  }

  sentenceInFilter(sent) {

    let inFilter = false;
    sent.comments.forEach(comment => {
      if (comment.type === 'label') {
        comment.labels.forEach(name => {
          if (this._filter.has(name))
            inFilter = true;
        });
      }
    });

    return inFilter;
  }

  addToFilter(name) {
    if (this.get(name))
      return this._filter.add(name);
  }

  removeFromFilter(name) {
    return this._filter.delete(name);
  }



  onAdd(sent) {
    sent.comments.forEach(comment => {
      if (comment.type === 'label') {
        comment.labels.forEach(name => {

          this.addLabel(name, [sent]);

        });
      }
    });
  }

  onRemove(sent) {
    sent.comments.forEach(comment => {
      if (comment.type === 'label') {
        comment.labels.forEach(name => {

          this.removeLabel(name, [sent]);

        });
      }
    })
  }



  addLabel(name, sents=[]) {

    let label = this.get(name);
    if (label) {

      label._sents.add(...sents);

    } else {

      label = {
        _label: new Label(name),
        _sents: new Set(),
      };
      this._labels[name] = label;

    }

    sents.forEach(sent => {
      sent.comments.forEach(comment => {
        if (comment.type === 'label') {

          comment.labels.push(name);
          label._sents.add(sent);

        }
      });
    });

    return label;
  }

  removeLabel(name, sents) {

    const label = this.get(name);
    if (!label)
      return false;

    (sents || label._sents).forEach(sent => {
      sent.comments.forEach(comment => {
        if (comment.type === 'label') {

          const index = comment.labels.indexOf(oldName);
          comment.labels.splice(index, 1);

        }
      })
    });

    if (!this.count(name))
      delete this._labels[name];

    return label;
  }

  changeLabelName(oldName, newName) {

    if (this.get(newName))
      return false; // already exists

    const oldLabel = this.removeLabel(oldName);
    if (!label)
      return false;

    const newLabel = this.addLabel(newName, oldLabel._sents);
    newLabel.desc = oldLabel.desc;
    newLabel.bColor = oldLabel.bColor;
    newLabel.tColor = oldLabel.tColor;

    return newLabel;
  }

  changeLabelColor(name, color) {

    const label = this.get(name);
    if (!label)
      return false;

    if (color) {

      color = (color.match(utils.re.hexColorSixDigit) || [])[1];
      const int = parseInt(color, 16);
      if (isNaN(int) || int < 0 || int > magic)
        return false; // out of bounds

    } else {
      color = utils.getRandomHexColor();
    }

    label._label.bColor = color;
    label._label.tColor = utils.getContrastingColor(color);

    return true;
  }

  changeLabelDesc(name, desc) {

    const label = this.get(name);
    if (!label)
      return false;

    if (typeof desc !== 'string')
      return false;

    label._label.desc = desc;
    return true;
  }

}


module.exports = Labeler;
