'use strict';

const _ = require('underscore');

const utils = require('../utils');
const NxBaseClass = require('./base-class');


class Label extends NxBaseClass {
  constructor(name) {

    super('Label');
    this.name = name;
    this.bColor = utils.hashStringToHex(name);
    this.tColor = utils.getContrastingColor(this.bColor);
    this.desc = '';

  }

  serialize() {
    return {
      name: this.name,
      desc: this.desc,
      bColor: this.bColor,
      tColor: this.tColor,
    };
  }


  /*

  set state(state) {
    if (!state.name)
      throw new DeserializationError(`cannot set name to "${state.name}"`);

    state.desc = state.desc || '';
    if (typeof state.desc !== 'string')
      throw new DeserializationError(`cannot set description to non-string value`);

    this.name = state.name;
    this.desc = state.desc;

    if (!this.changeColor(state.bColor))
      throw new DeserializationError(`cannot set background color to "${state.bColor}"`);
  }

  render(labeler) {

    const inComments = labeler.has(this.name),
      filtering = labeler._filter.has(this.name);

    $(`#labels-horiz`).append($('<li>')
      .attr('name', this.name)
      .addClass('label horiz')
      .addClass(inComments ? 'in-comments' : 'not-in-comments')
      .addClass(filtering  ? 'filtering'   : 'not-filtering')
      .append($('<div>')
        .addClass('label-text')
        .text(this.name)
        .css('background-color', this.bColor)
        .css('color', this.tColor)
        .click(e => labeler.handle.click.label(e))
      )
      .append($('<div>')
        .addClass('label-hidden')
        .append($('<div>')
          .addClass('label-hidden-group')
          .append($('<div>')
            .addClass('label-hidden-item')
            .append($('<strong>')
              .text('Name')
            )
            .append($('<input>')
              .attr('name', 'label-name')
              .val(this.name)
              .keyup(e => labeler.handle.keyup.name(e))
            ))
          .append($('<div>')
            .addClass('label-hidden-item')
            .append($('<strong>')
              .text('Description')
            )
            .append($('<input>')
              .attr('name', 'label-desc')
              .val(this.desc)
              .keyup(e => labeler.handle.keyup.desc(e))
            ))
          .append($('<div>')
            .addClass('label-hidden-item')
            .append($('<strong>')
              .text('Color')
            )
            .append($('<div>')
              .addClass('label-hidden-item-inner')
              .append($('<span>')
                .addClass('hex-color-group')
                .text('#')
                .append($('<input>')
                  .attr('name', 'label-color')
                  .attr('pattern', '[A-Fa-f\\d]{6}')
                  .val(this.bColor.substr(1))
                  .keyup(e => labeler.handle.keyup.color(e))
                )
              )
              .append($('<button>')
                .attr('type', 'button')
                .addClass('btn btn-secondary refresh-color')
                .css('background-color', this.bColor)
                .click(e => labeler.handle.click.refresh(e))
                .append($('<i>')
                  .addClass('fa fa-refresh')
                )
              )
            )
          )
        )
        .append($('<hr>'))
        .append($('<div>')
          .addClass('label-hidden-group')
          .append($('<div>')
            .addClass('label-hidden-item')
            .append($('<div>')
              .addClass('label-hidden-item-inner')
              .append($('<input>')
                .attr('name', 'filtering')
                .attr('type', 'checkbox')
                .prop('checked', filtering)
                .click(e => labeler.handle.click.checkbox.filtering(e))
              )
              .append($('<span>')
                .addClass('filtering-label checkbox-label')
                .text('filtering')
              )
            )
          )
        )
        .append($('<hr>'))
        .append($('<div>')
          .addClass('label-hidden-group')
          .append($('<div>')
            .addClass('label-hidden-item delete-item')
            .append($('<button>')
              .attr('type', 'button')
              .addClass('btn btn-secondary delete-button')
              .text('delete')
              .click(e => labeler.handle.click.delete(e))
            )
          )
        )
      )
    );
  }
  */
}


module.exports = Label;
