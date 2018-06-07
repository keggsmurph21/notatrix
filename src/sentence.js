'use strict';

const _ = require('underscore');
const E = require('./errors');
const Token = require('./token');

const regex = {
  comment: /^\W*\#/,
  commentContent: /^\W*\#\W*(.*)/,
  superToken: /^\W*[0-9]+\-[0-9]+/
}

class Sentence extends Object {

  constructor(paramsList, options) {
    super();

    this.comments = [];
    //this.conlluLoaded = false;
    //this.cg3Loaded = false;

    this.options = _.defaults(options, {
      help: {
        form: true,
        lemma: true,
        head: true,
        deps: true
      },
      prettyOutput: true,
      showEnhanced: true
    });

    this.tokens = [];

    this.params = paramsList;
  }
  get length() { // total number of tokens/subtokens, use this.tokens.length for
    let acc = 0;
    this.forEach(token => {
      acc++;
    });
    return acc;
  }
  forEach(callback) {
    let t = 0;
    for (let i=0; i<this.tokens.length; i++) {
      const token = this.tokens[i];
      callback(token, t);
      t++;
      for (let j=0; j<token.subTokens.length; j++) {
        callback(token.subTokens[j], t);
        t++;
      }
    }
    return this;
  }

  // sub-object getters
  getComment(index) {
    return this.comments[index] || null;
  }
  getToken(index) { // get the <index>th token or subtoken, assuming current analysis
    let t = 0, token = null;
    this.forEach(tok => {
      if (t === index)
        token = tok;
      t++;
    });
    return token;
  }
  getById(index) { // get the token or subtoken by the given CoNLL-U index, assume current analysis
    let t=0;
    for (let i=0; i<this.tokens.length; i++) {
      const token = this.tokens[i];
      if (token.analysis.id == index)
        return token.analysis;
      t++;
      for (let j=0; j<token.subTokens.length; j++) {
        const subToken = token.subTokens[j];
        if (subToken.analysis.id == index)
          return subToken.analysis;
        t++;
      }
    }
    return null;
  }
  getByIndices(indices) {
    if (indices.super === null)
      return null;

    if (indices.sub === null)
      return this.tokens[indices.super];

    if (!this.tokens[indices.super])
      return null;

    return this.tokens[indices.super].subTokens[indices.sub];
  }

  // manipulate token array
  insertTokenAt(index, token) {
    index = parseFloat(index); // catch Infinity
    if (isNaN(index))
      throw new E.NotatrixError('unable to insert token: unable to cast index to int');

    if (!(token instanceof Token))
      throw new E.NotatrixError('unable to insert token: not instance of Token');

    index = index < 0 ? 0
      : index > this.length ? this.length
      : parseInt(index);

    this.tokens = this.tokens.slice(0, index)
      .concat(token)
      .concat(this.tokens.slice(index));

    return this;
  }
  removeTokenAt(index) {
    if (!this.tokens.length)
      return null;

    index = parseFloat(index); // catch Infinity
    if (isNaN(index))
      throw new E.NotatrixError('unable to remove token: unable to cast index to int');

    index = index < 0 ? 0
      : index > this.tokens.length - 1 ? this.tokens.length - 1
      : parseInt(index);

    return this.tokens.splice(index, 1)[0];
  }
  moveTokenAt(sourceIndex, targetIndex) {
    sourceIndex = parseFloat(sourceIndex);
    targetIndex = parseFloat(targetIndex);
    if (isNaN(sourceIndex) || isNaN(targetIndex))
      throw new E.NotatrixError('unable to move token: unable to cast indices to ints');

    sourceIndex = sourceIndex < 0 ? 0
      : sourceIndex > this.tokens.length - 1 ? this.tokens.length - 1
      : parseInt(sourceIndex);
    targetIndex = targetIndex < 0 ? 0
      : targetIndex > this.tokens.length - 1 ? this.tokens.length - 1
      : parseInt(targetIndex);

    if (sourceIndex === targetIndex) {
      // do nothing
    } else {

      let token = this.tokens.splice(sourceIndex, 1);
      this.tokens = this.tokens.slice(0, targetIndex)
        .concat(token)
        .concat(this.tokens.slice(targetIndex));

    }

    return this;
  }
  pushToken(token) {
    return this.insertTokenAt(Infinity, token);
  }
  popToken() {
    return this.removeTokenAt(Infinity);
  }

  // external formats
  get nx() {
    this.index();

    let tokens = [];
    this.forEach(token => {
      tokens.push(token.nx);
    });

    return JSON.stringify({
      comments: this.comments,
      //conlluLoaded: this.conlluLoaded,
      //cg3Loaded: this.cg3Loaded,
      options: this.options,
      tokens: tokens
    }, null, this.options.prettyOutput ? 2 : 0);
  }
  get text() {
    let tokens = [];
    this.forEach(token => {
      if (!token.isSuperToken)
        tokens.push(token.text);
    });
    return tokens.join(' ');
  }
  get conllu() {

    //if (!this.conlluLoaded)
      //this.logger.warn('note: CoNLL-U has not been explicitly loaded for this sentence');

    const comments = _.map(this.comments, comment => {
      return `# ${comment}`;
    });

    let tokens = [];

    try {

      this.forEach(token => {
        tokens.push(token.conllu);
      });

      return comments.concat(tokens).join('\n');

    } catch (e) {
      if (!(e instanceof E.InvalidCoNLLUError))
        throw e;

      return null;
    }
  }
  set conllu(conllu) {

    this.comments = [];
    this.tokens = [];

    const lines = conllu.split('\n');
    for (let i=0; i<lines.length; i++) {
      if (regex.comment.test(lines[i])) {
        this.comments.push(
          lines[i].match(regex.commentContent)[1] );

      } else if (regex.superToken.test(lines[i])) {
        const subTokenIndices = lines[i]
          .match(regex.superToken)[0]
          .trim()
          .split('-')
          .map(str => { return parseInt(str); });

        const superToken = new Token(this);
        superToken.conllu = lines[i];
        for (let j=subTokenIndices[0]; j<=subTokenIndices[1]; j++) {
          const subToken = new Token(this);
          subToken.conllu = lines[j + this.comments.length];
          i++;
          superToken.pushSubToken(subToken);
        }
        this.tokens.push(superToken);

      } else {
        if (lines[i].trim().length) {
          const token = new Token(this);
          this.tokens.push(token);
          token.conllu = lines[i];

        }
      }
    }

    //this.conlluLoaded = true;
    return this.attach().conllu;
  }
  static fromConllu(serial, options) {
    let sent = new Sentence(options);
    sent.conllu = serial;
    return sent;
  }
  get cg3() {

  }
  set cg3(cg3) {

  }
  static fromCG3(serial, options) {
    let sent = new Sentence(options);
    sent.cg3 = serial;
    return sent;
  }
  get params() {
    try {
      let params = [];
      this.forEach(token => {
        if (token.isSuperToken || token.isSubToken)
          throw new E.InvalidCoNLLUError();
        if (token.isAmbiguous)
          throw new E.InvalidCG3Error();

        params.push(token.params);
      });
      return params;

    } catch (e) {
      if (e instanceof E.InvalidCoNLLUError) {
        console.warn('cannot get params for this sentence: contains MultiWordTokens');
        return null;

      } else if (e instanceof E.InvalidCG3Error) {
        console.warn('cannot get params for this sentence: contains ambiguous analyses');
        return null;

      } else {
        throw e;
      }
    }
  }
  set params(paramsList) {
    if (!(paramsList instanceof Array))
      return null;

    _.each(paramsList, params => {
      const token = new Token(this);
      token.params = params;
      this.tokens.push(token);
    });
    return this.attach().params;
  }
  static fromParams(paramsList, options) {
    let sent = new Sentence(options);
    sent.params = paramsList;
    return sent;
  }
  get eles() {

  }

  clean() {

  }
  index() {
    let id = 1; // CoNLL-U indexes start at 1 (because 0 is root)
    _.each(this.tokens, token => {
      id = token.index(id);
    });
    return this;
  }
  attach() {
    this.index();
    this.forEach(token => {
      token.analysis.head = token.analysis.head;
      token.analysis.deps = token.analysis.deps;
    });
    return this;
  }

  get isValidConllu() {
    let valid = true;
    this.forEach(token => {
      if (token.isAmbiguous)
        valid = false;
    });
    return valid;
  }
  get isValidCG3() {
    let valid = true;
    this.forEach(token => {
      if (token.isSubToken || token.isSuperToken || token.isEmpty)
        valid = false;
    });
    return valid;
  }
}
Sentence.prototype.__proto__ = new Proxy(Sentence.prototype.__proto__, {
  /**
   * add this so that we can have Array-like access to the Sentence (for tokens)
   *   i.e. sent[0] is just an alias for sent.getToken(0)
   */
  get(target, name, receiver) {
    if (typeof name === 'symbol')
      return this[name];

    let id = parseFloat(name); // catch Infinity (used in tests, and maybe other stuff)
    if (!isNaN(id)) {
      id = parseInt(id);
      let token = receiver.getToken(id);
      return token ? token.analysis : null;
    } else {
      return this[name];
    }
  }
});


module.exports = Sentence;
