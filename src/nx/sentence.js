'use strict';

const _ = require('underscore');

const utils = require('../utils');
const SentenceError = utils.SentenceError;
const parse = require('../parser');
const generate = require('../generator');

const NxBaseClass = require('./base-class');
const Comment = require('./comment');
const Token = require('./token');
const RootToken = require('./root');
const update = require('./update');

class Sentence extends NxBaseClass {
  constructor(serial, options) {

    super('Sentence');

    this.to = (format, options) => generate[format](this, options);

    options = _.defaults(options, {
      interpretAs: null,
      addHeadOnModifyFailure: true,
      addHeadsWhenAddingDeps: true,
      headsShowDeprel: true,
      addDepOnModifyFailure: true,
      addDepsWhenAddingHeads: true,
      depsShowDeprel: true,
      showRootDeprel: true,
      showEnhancedDependencies: true,
      useTokenDeprel: true,
      debugUpdates: false,
    });

    if (options.interpretAs) {

      // interpret as a particular format if passed option
      serial = parse.as[options.interpretAs](serial, options);

    } else {

      // otherwise, get an array of possible interpretations
      serial = parse(serial, options);

      // choose one of them if possible
      if (serial.length === 0) {
        throw new SentenceError('Unable to parse input', this);
      } else if (serial.length === 1) {
        serial = serial[0];
      } else {
        throw new SentenceError(
          `Unable to disambiguate input interpretations (${serial.length})`, this);
      }

    }

    this.input = serial.input;
    this.options = serial.options;
    this.comments = serial.comments.map(com => new Comment(com, options));
    this.tokens = serial.tokens.map(tok => new Token(tok, options));

    this.attach();
  }

  serialize() {
    return {
      input: this.input,
      options: this.options,
      comments: this.comments.map(com => com.serialize()),
      tokens: this.tokens.map(token => token.serialize()),
    };
  }

  iterate(callback) {
    for (let i=0; i<this.tokens.length; i++) {

      const token = this.tokens[i];
      callback(token, i, null, null);

      for (let j=0; j<token._analyses.length; j++) {
        for (let k=0; k<token._analyses[j]._subTokens.length; k++) {

          const subToken = token._analyses[j]._subTokens[k];
          callback(subToken, i, j, k);

        }
      }
    }
  }

  query(predicate) {

    let matches = [];
    this.iterate(token => {
      if (predicate(token))
        matches.push(token);
    });

    return matches;
  }

  getByIndices(tokenId, analysisId=null, subTokenId=null) {

    if (!this.tokens[tokenId])
      return null;

    if (analysisId === null)
      return this.tokens[tokenId];

    if (!this.tokens[tokenId]._analyses[analysisId])
      return null;

    if (subTokenId === null)
      return this.tokens[tokenId]._analyses[analysisId];

    return this.tokens[tokenId]._analyses[analysisId]._subTokens[subTokenId] || null;
  }

  index() {

    let absolute = 0,
      majorToken = null,
      superToken = null,
      empty = 0,
      conllu = 0,
      cg3 = 0,
      cytoscape = 0;

    this.iterate((token, i, j, k) => {

      token.indices.absolute = ++absolute;

      if (!token._analyses || !token._analyses.length)
        token.indices.cg3 = ++cg3;

      if (j === null || k === null) {

        majorToken = token;

        if (superToken) {
          superToken.token.indices.conllu = superToken.start + '-' + superToken.stop;
          superToken = null;
        }

        if (token.subTokens.length) {
          superToken = {
            token: token,
            start: null,
            stop: null
          };
        } else {

          if (token.isEmpty) {
            empty += 1;
          } else {
            empty = 0;
            conllu += 1;
          }

          token.indices.conllu = empty ? conllu + '.' + empty : conllu;
        }

      } else {

        if (majorToken._i === j) {

          if (token.isEmpty) {
            empty += 1;
          } else {
            empty = 0;
            conllu += 1;
          }

          token.indices.conllu = empty ? conllu + '.' + empty : conllu;
        }

        if (superToken) {
          if (superToken.start === null) {
            superToken.start = empty ? conllu + '.' + empty : conllu;
          } else {
            superToken.stop = empty ? conllu + '.' + empty : conllu;
          }
        }
      }
    });

    if (superToken) {
      superToken.token.indices.conllu = `${superToken.start}-${superToken.stop}`;
      superToken = null;
    }

    this.size = absolute;
  }

  attach() {
    this.iterate((token, i, j, k) => {

      (token.serial.head || '').split('|').forEach(fullHead => {

        fullHead = fullHead.split(':');
        const head = fullHead[0];
        const deprel = fullHead[1] || null;

        if (head === '0') {

          token.addHead(new RootToken(), 'root');

        } else if (head) {

          const query = this.query(token => token.serial.index === head);
          if (query.length !== 1) {
            console.log(token.serial)
            throw new SentenceError(`cannot locate token with serial index "${head}"`);
          }

          token.addHead(query[0], deprel);
        }
      });

      (token.serial.deps || '').split('|').forEach(fullDep => {

        fullDep = fullDep.split(':');
        const dep = fullDep[0];
        const deprel = fullDep[1] || null;

        if (dep === '0') {

        } else if (dep) {

          const query = this.query(token => token.serial.index === dep);
          if (query.length !== 1)
            throw new SentenceError(`cannot locate token with serial index "${dep}"`);

          token.addDep(query[0], deprel);
        }
      });

    });

    this.iterate(token => { delete token.serial });

    this.index();
  }

  update(serial, options) {
    try {

      const sent = new Sentence(serial, options);
      update(this, sent, options);

    } catch(e) {

      if (e instanceof utils.ToolError || utils.NxError)
        throw new SentenceError('Unable to update: ' + e.message);

      throw e;
    }
  }
}

module.exports = Sentence;
