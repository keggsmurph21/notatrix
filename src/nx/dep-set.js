'use strict';

const _ = require('underscore');

const utils = require('../utils');
const DependencyError = utils.DependencyError;
const NxBaseClass = require('./base-class');


class DependencySet extends NxBaseClass {
  constructor(options) {
    super('DependencySet');

    this.options = options;
    this.items = new Array();
  }

  get length() {
    return this.items.length;
  }

  forEach(callback) {
    this.items.forEach(callback);
  }

  add(token, deprel=null) {

    if (token.isSuperToken)
      throw new DependencyError('superTokens cannot have dependency relations');

    let found = false;
    for (let i=0; i<this.length; i++) {
      const item = this.items[i];
      if (item.token === token)
        found = true;
    }

    if (!found)
      this.items.push({
        token: token,
        deprel: deprel,
      });

    return found;
  }

  remove(token) {

    for (let i=0; i<this.length; i++) {
      const item = this.items[i];
      if (item.token === token)
        return this.items.splice(i, 1);
    }

    return null;
  }

  modify(token, deprel=null) {

    for (let i=0; i<this.length; i++) {
      const item = this.items[i];
      if (item.token === token) {
        let change = item.deprel !== deprel;
        item.deprel = deprel;
        return change;
      }
    }

    return false;
  }

  toString(index, type) {

    const items = type === 'head' && !this.options.showEnhancedDependencies
      ? this.items.slice(0)
      : this.items;

    const showDeprel = type === 'head'
        ? this.options.headsShowDeprel
        : type === 'deps'
          ? this.options.depsShowDeprel
          : true;

    const print = item => {
      //console.log(item.deprel, this.options.showRootDeprel, item.deprel !== 'root' || this.options.showRootDeprel)
      return item.token.indices[index] == undefined
        ? null
        : showDeprel && item.deprel && (item.deprel !== 'root' || this.options.showRootDeprel)
          ? `${ item.token.indices[index] }:${ item.deprel }`
          : `${ item.token.indices[index] }`;
    }

    return items.map(print).filter(utils.thin).join('|') || null;
  }
}

module.exports = DependencySet;
