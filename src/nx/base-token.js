'use strict';

const _ = require('underscore');
const uuid = require('uuid/v4');

const utils = require('../utils');
const BaseTokenError = utils.BaseTokenError;

const NxBaseClass = require('./base-class');
const RelationSet = require('./relation-set');

class BaseToken extends NxBaseClass {
  constructor(sent, name) {

    super(name);

    this.sent = sent;
    this.uuid = uuid();

    this._feats_init = false;
    this._misc_init = false;

    this.heads = new RelationSet(this, 'dependents');
    this.dependents = new RelationSet(this, 'heads');

    this.indices = {
      conllu: null,
      cg3: null,
      cytoscape: null,
    };
  }

  addHead(head, deprel) {

    if (!(head instanceof BaseToken))
      throw new BaseTokenError('cannot add head unless it is a token');

    if (head === this)
      throw new BaseTokenError('token cannot be its own head');

    if (typeof deprel !== 'string' && deprel != null)
      throw new BaseTokenError('deprel must be a string, null, or undefined');

    // if we're not enhanced, only can have 1 head at a time
    if (!this.sent.options.enhanced)
      this.heads.clear();

    return this.heads.add(head, deprel);

  }

  modifyHead(head, deprel) {

    if (!(head instanceof BaseToken))
      throw new BaseTokenError('cannot add head unless it is a token');

    if (typeof deprel !== 'string' && deprel != null)
      throw new BaseTokenError('deprel must be a string, null, or undefined');

    return this.heads.modify(head, deprel);

  }

  removeHead(head) {

    if (!(head instanceof BaseToken))
      throw new BaseTokenError('cannot add head unless it is a token');

    return this.heads.remove(head);

  }

  mapHeads(callback) {

    if (this.sent.options.enhanced) {
      return this.heads.map(callback);
    } else {
      return this.heads.first
        ? [ callback(this.heads.first) ]
        : [];
    }

  }

  mapDependents(callback) {

    return this.dependents.map(callback);

  }

  getHead(format) {

    if (!this.heads.length)
      return null;

    if (format === 'CoNLL-U')
      return `${this.heads.first.token.indices.conllu}`;

    if (format === 'CG3')
      return `${this.heads.first.token.indices.cg3}`;

    return `${this.heads.first.token.indices.absolute}`;
  }

  _getDeprel() {

    if (!this.heads.length)
      return null;

    return this.heads.first.deprel;
  }

  _getDeps(format) {

    function getIndex(token) {
      if (format === 'CoNLL-U')
        return token.indices.conllu;

      if (format === 'CG3')
        return token.indices.cg3;

      return token.indices.absolute;
    }

    if (!this.heads.length || !this.sent.options.enhanced)
      return [];

    return this.mapHeads(utils.noop).sort((x,y) => {

      if (getIndex(x.token) < getIndex(y.token))
        return -1;

      if (getIndex(x.token) > getIndex(y.token))
        return 1;

      return 0;

    }).map(head => {

      return head.deprel
        ? `${getIndex(head.token)}:${head.deprel}`
        : `${getIndex(head.token)}`;

    });
  }

  walk(callback) {
    let i = 0;
    if (this._analyses)
      return this._analyses.map(analysis => {
        return analysis._subTokens.map(subToken => {
          return callback(subToken, ++i);
        });
      });

    return null;
  }

  hashFields(...fields) {

    fields = _.flatten(fields);

    let hash = _.intersection(fields, [
      'form',
      'lemma',
      'upostag',
      'xpostag',
      'feats',
      'deprel',
      'misc',
      'isEmpty',
      'semicolon',
    ]).map(field => `<${this[field] || field}>`).join('|');

    if (fields.indexOf('indices') > -1)
      hash += `|${_.map(this.indices, index => `{${index}}`).join('')}`;

    if (fields.indexOf('head') > -1)
      hash += `|(h:${this.head.token.indices.absolute}:${h.deprel})`;

    if (fields.indexOf('deps') > -1)
      hash += `|(d:${this.mapDeps(d => `${d.token.indices.absolute}:${d.deprel}`).join('|') || ''})`;

    if (fields.indexOf('analyses') > -1 || fields.indexOf('subTokens') > -1)
      hash += `|[s:${this.walk(t => t.hashFields(fields)) || ''}]`;

    return hash;
  }

  serialize() {
    let serial = {

      uuid: this.uuid,
      form: this.form,
      index: this.indices.absolute,

      semicolon: this.semicolon,
      isEmpty: this.isEmpty,
      lemma: this.lemma,
      upostag: this.upostag,
      xpostag: this.xpostag,
      feats: this.feats,
      deprel: this.deprel,
      misc: this.misc,
      other: this.misc,

      head: this.getHead('serial'),
      deps: this._getDeps('serial').join('|'),

    };

    if (this._analyses && this._analyses.length)
      serial.analyses = this._analyses.map(analysis => {
        return {
          subTokens: analysis._subTokens.map(subToken => subToken.serialize()),
        };
      });

    serial = _.pick(serial, value => value !== undefined);

    return serial;
  }

  get isSuperToken() {
    return !!(this._analyses || []).reduce((total, analysis) => {
      return total += analysis._subTokens.length;
    }, 0);
  }

  get value() {
    return this.form || this.lemma;
  }

  get feats() {
    return this._feats_init
      ? this._feats.length
        ? this._feats.join('|')
        : null
      : undefined;
  }

  set feats(feats) {
    if (feats === undefined)
      return;

    this._feats_init = true;
    this._feats = (feats || '').split('|').filter(utils.thin);
  }

  get misc() {
    return this._misc_init
      ? this._misc.length
        ? this._misc.join('|')
        : null
      : undefined;
  }

  set misc(misc) { // [(serial.misc || ''), (serial.other || []).join('|')].join('|');
    if (misc === undefined)
      return;

    this._misc_init = true;
    this._misc = (misc || '').split('|').filter(utils.thin);
  }

  set other(other) {
    if (other === undefined)
      return;

    this._misc_init = true;
    this._misc = (other || []).filter(utils.thin);
  }
}

module.exports = BaseToken;
