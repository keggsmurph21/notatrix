'use strict';

const _ = require('underscore');

const NotatrixError       = require('./errors').NotatrixError;
const InvalidCG3Error     = require('./errors').InvalidCG3Error;
const InvalidCoNLLUError  = require('./errors').InvalidCoNLLUError

const Token = require('./token');

// define all the regex we use in this module here
const regex = {
  comment: /^\W*\#/,
  commentContent: /^\W*\#\W*(.*)/,
  superToken: /^\W*[0-9.]+\-[0-9.]+/,
  empty: /^\W*[0-9]+\.[0-9]+/,
  cg3TokenStart: /^"<(.|\\")*>"/,
  cg3TokenContent: /^;?\s+"(.|\\")*"/
}

/**
 * this class contains all the information associated with a sentence, including
 *   an comments array, a tokens array, and a list of options/settings that apply
 *   to all subelements of this sentence
 */
class Sentence extends Object {

  constructor(paramsList, options) {
    super();

    // handle only receiving one arg better
    if (options === undefined && !Array.isArray(paramsList)) {
      options = paramsList;
      paramsList = undefined;
    }

    // save sentence-wide settings here
    this.options = _.defaults(options, {
      help: {
        form: true,
        lemma: true,
        upostag: true,
        xpostag: true,
        head: true,
        deps: true
      },
      prettyOutput: true,
      showEnhanced: true,
      showEmptyDependencies: true
    });

    // the actual data
    this.comments = [];
    this.tokens = [];

    // try parsing a list of parameters
    if (paramsList)
      this.params = paramsList;
  }
  /**
   * @return {Number} total number of tokens/subTokens in this sentence
   */
  get length() {

    let acc = 0;
    this.forEach(token => {
      acc++;
    });
    return acc;
  }
  /**
   * loop through every token in the sentence and apply a callback
   *
   * @param {Function} callback function to be applied to every token
   * @return {Sentence}
   */
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

    // chaining
    return this;
  }


  /**
   * return the comment at the given index, or null
   *
   * @param {Number} index
   * @return {(String|null)}
   */
  getComment(index) {
    return this.comments[index] || null;
  }

  /**
   * return the token at the given index (note: this is regular token OR subToken),
   *   or null.  to choose by superToken index, use Sentence[index] syntax.  this
   *   function assumes only the current analysis is desired.
   *
   * @param {Number} index
   * @return {(Token|null)}
   */
  getToken(index) {
    let t = 0, token = null;
    this.forEach((tok, t) => {
      if (t === index)
        token = tok;
    });
    return token;
  }

  /**
   * return the current analysis of the token that matches a given index string
   *
   * NOTE: tokens outside the current analysis will have id=null and cannot be retrieved
   *   with this function
   *
   * @param {String} index
   * @return {(Analysis|null)}
   */
  getById(index) {
    for (let i=0; i<this.tokens.length; i++) {
      const token = this.tokens[i];
      if (token.analysis.id == index)
        return token.analysis;
      for (let j=0; j<token.subTokens.length; j++) {
        const subToken = token.subTokens[j];
        if (subToken.analysis.id == index)
          return subToken.analysis;
      }
    }
    return null;
  }

  // manipulate token array

  /**
   * insert a token BEFORE the given index
   *
   * NOTE: if the index is out of bounds (<0 or >length), then it will be adjusted
   *   to fit the bounds. this means that you can call this with `index=-Infinity`
   *   to push to the front of the tokens array or with `index=Infinity` to push
   *   to the end
   *
   * @param {Number} index
   * @param {Token} token
   * @return {Sentence}
   *
   * @throws {NotatrixError} if given invalid index or token
   */
  insertTokenAt(index, token) {
    index = parseFloat(index); // catch Infinity
    if (isNaN(index))
      throw new NotatrixError('unable to insert token: unable to cast index to int');

    if (!(token instanceof Token))
      throw new NotatrixError('unable to insert token: not instance of Token');

    // bounds checking
    index = index < 0 ? 0
      : index > this.length ? this.length
      : parseInt(index);

    // array insertion
    this.tokens = this.tokens.slice(0, index)
      .concat(token)
      .concat(this.tokens.slice(index));

    // chaining
    return this;
  }

  /**
   * remove a token at the given index
   *
   * NOTE: if the index is out of bounds (<0 or >length - 1), then it will be
   *   adjusted to fit the bounds. this means that you can call this with
   *   `index=-Infinity` to remove the first element of the tokens array or
   *   with `index=Infinity` to remove the last
   *
   * @param {Number} index
   * @return {(Token|null)}
   *
   * @throws {NotatrixError} if given invalid index
   */
  removeTokenAt(index) {
    // can't remove if we have an empty sentence
    if (!this.tokens.length)
      return null;

    index = parseFloat(index); // catch Infinity
    if (isNaN(index))
      throw new NotatrixError('unable to remove token: unable to cast index to int');

    // bounds checking
    index = index < 0 ? 0
      : index > this.tokens.length - 1 ? this.tokens.length - 1
      : parseInt(index);

    // array splicing, return spliced element
    return this.tokens.splice(index, 1)[0];
  }

  /**
   * move a token from sourceIndex to targetIndex
   *
   * NOTE: if either index is out of bounds (<0 or >length - 1), then it will
   *   be adjusted to fit the bounds. this means that you can call this with
   *   `sourceIndex=-Infinity` to select the first element of the tokens array
   *   or with `sourceIndex=Infinity` to select the last
   *
   * @param {Number} sourceIndex
   * @param {Number} targetIndex
   * @return {Sentence}
   *
   * @throws {NotatrixError} if given invalid sourceIndex or targetIndex
   */
  moveTokenAt(sourceIndex, targetIndex) {
    sourceIndex = parseFloat(sourceIndex);
    targetIndex = parseFloat(targetIndex);
    if (isNaN(sourceIndex) || isNaN(targetIndex))
      throw new NotatrixError('unable to move token: unable to cast indices to ints');

    // bounds checking
    sourceIndex = sourceIndex < 0 ? 0
      : sourceIndex > this.tokens.length - 1 ? this.tokens.length - 1
      : parseInt(sourceIndex);
    targetIndex = targetIndex < 0 ? 0
      : targetIndex > this.tokens.length - 1 ? this.tokens.length - 1
      : parseInt(targetIndex);

    if (sourceIndex === targetIndex) {
      // do nothing
    } else {

      // array splice and insert
      let token = this.tokens.splice(sourceIndex, 1);
      this.tokens = this.tokens.slice(0, targetIndex)
        .concat(token)
        .concat(this.tokens.slice(targetIndex));

    }

    // chaining
    return this;
  }

  /**
   * push a token to the end of the tokens array ... sugar for
   *   Sentence::insertTokenAt(Infinity, token)
   *
   * @param {Token} token
   * @return {Sentence}
   */
  pushToken(token) {
    return this.insertTokenAt(Infinity, token);
  }

  /**
   * pop a token from the end of the tokens array ... sugar for
   *   Sentence::removeTokenAt(Infinity)
   *
   * @return {(Token|null)}
   */
  popToken() {
    return this.removeTokenAt(Infinity);
  }

  // external formats

  /**
   * get a serial version of the internal sentence representation
   *
   * @return {String}
   */
  get nx() {
    // update indices
    this.index();

    // serialize tokens
    let tokens = [];
    for (let i=0; i<this.tokens.length; i++) {
      tokens.push(this.tokens[i].nx);
    }

    // serialize other data
    return JSON.stringify({
      comments: this.comments,
      options: this.options,
      tokens: tokens
    }, null, this.options.prettyOutput ? 2 : 0);
  }

  /**
   * get a plain-text formatted string of the sentence's current analysis text
   *
   * @return {String}
   */
  get text() {
    // only care about tokens (not comments or settings)
    let tokens = [];
    this.forEach(token => {
      if (!token.isSubToken && !token.isEmpty)
        tokens.push(token.text);
    });
    return tokens.join(' ');
  }

  /**
   * get a CoNLL-U formatted string representing the sentence's current analysis
   *
   * @return {(String|null)}
   */
  get conllu() {
    // comments first
    const comments = _.map(this.comments, comment => {
      return `# ${comment}`;
    });

    try {

      let tokens = [];
      this.forEach(token => {
        tokens.push(token.conllu);
      });
      return comments.concat(tokens).join('\n');

    } catch (e) {

      // if the sentence contains ambiguous analyses, we will get an error,
      // so catch only those types of errors here
      if (!(e instanceof InvalidCoNLLUError))
        throw e;

      // if sentence is ambiguous
      return null;
    }
  }

  /**
   * parse a CoNLL-U formatted string and save its contents to the sentence
   *
   * @param {String} conllu
   * @return {String}
   */
  set conllu(conllu) {
    // clear existing data
    this.comments = [];
    this.tokens = [];

    // split on newlines
    const lines = conllu.trim().split('\n');
    for (let i=0; i<lines.length; i++) {

      // extract comments
      if (regex.comment.test(lines[i])) {
        this.comments.push(
          lines[i].match(regex.commentContent)[1] );

      // extract tokens
      } else if (regex.superToken.test(lines[i])) {

        // the top-level token
        const superToken = Token.fromConllu(this, lines[i]);

        // check which subTokens belong to this superToken
        const k = i;
        const subTokenIndices = lines[i]
          .match(regex.superToken)[0]
          .trim()
          .split('-')
          .map(str => { return parseInt(str); });

        // push them all to the superToken's current analysis
        for (let j=0; j<=(subTokenIndices[1] - subTokenIndices[0]); j++) {
          superToken.analysis.pushSubToken( Token.fromConllu(this, lines[j + k + 1]) );
          i++;
        }

        // push the superToken to the sentence
        this.pushToken(superToken);

      } else {

        // regular (non-super) tokens pushed to sentence here
        if (lines[i].trim().length)
          this.pushToken( Token.fromConllu(this, lines[i]) );

      }
    }

    // attach heads and return CoNLL-U string
    return this.attach().conllu;
  }

  /**
   * static method allowing us to construct a new Sentence directly from a
   *   CoNLL-U string
   *
   * @param {String} serial
   * @param {Object} options (optional)
   * @return {Sentence}
   */
  static fromConllu(serial, options) {
    let sent = new Sentence(options);
    sent.conllu = serial;
    return sent;
  }

  /**
   * get a CG3 formatted string representing all of the sentence's analyses
   *
   * @return {(String|null)}
   */
  get cg3() {
    // comments first
    const comments = _.map(this.comments, comment => {
      return `# ${comment}`;
    });

    try {

      let tokens = [];
      for (let i=0; i<this.tokens.length; i++) { // iterate over superTokens
        tokens.push(this.tokens[i].cg3);
      }
      return comments.concat(tokens).join('\n');

    } catch (e) {

      // if the sentence is not analyzeable as CG3, we'll get an error
      // NOTE: this doesn't currently happen under any circumstances
      if (!(e instanceof InvalidCG3Error))
        throw e;

      return null;
    }
  }

  /**
   * parse a CG3 formatted string and save its contents to the sentence
   *
   * @param {String} conllu
   * @return {String}
   */
  set cg3(cg3) {
    // clear existing data
    this.comments = [];
    this.tokens = [];

    // since this parsing is more complicated than CoNLL-U parsing, keep this
    //   array of lines for the current token we're parsing
    // NOTE: CG3 tokens are separated by lines of the form `/^"<EXAMPLE>"/`
    //   and lines beginning with one/more indent give data for that token
    let tokenLines = [];

    // split on newlines
    const lines = cg3.trim().split('\n');
    for (let i=0; i<lines.length; i++) {

      // decide what the current line is
      let isToken = regex.cg3TokenStart.test(lines[i]);
      let isContent = regex.cg3TokenContent.test(lines[i]);

      // current line is the start of a new token
      if (isToken) {

        // if we already have stuff in our tokenLines buffer, parse it as a token
        if (tokenLines.length)
          this.tokens.push(Token.fromCG3(this, tokenLines));

        // reset tokenLines buffer
        tokenLines = [ lines[i] ];

      } else {

        // add content lines to tokenLines buffer
        if (tokenLines.length && isContent) {
          tokenLines.push(lines[i]);

        // push comment
        } else {
          this.comments.push(lines[i].match(regex.commentContent)[1]);
        }
      }
    }

    // clear tokenLines buffer
    if (tokenLines.length)
      this.tokens.push(Token.fromCG3(this, tokenLines));

    // attach heads and return CG3 string
    return this.attach().cg3;
  }

  /**
   * static method allowing us to construct a new Sentence directly from a
   *   CG3 string
   *
   * @param {String} serial
   * @param {Object} options (optional)
   * @return {Sentence}
   */
  static fromCG3(serial, options) {
    let sent = new Sentence(options);
    sent.cg3 = serial;
    return sent;
  }

  /**
   * get an array of token parameters representing the sentence
   *
   * NOTE: fails (returns null) if we have subTokens or ambiguous analyses
   *
   * @return {(Array|null)}
   */
  get params() {
    try {

      let params = [];
      this.forEach(token => {

        if (token.isSuperToken || token.isSubToken)
          throw new InvalidCoNLLUError();
        if (token.isAmbiguous)
          throw new InvalidCG3Error();

        params.push(token.params);
      });
      return params;

    } catch (e) {
      if (e instanceof InvalidCoNLLUError) {
        console.warn('cannot get params for this sentence: contains MultiWordTokens');
        return null;

      } else if (e instanceof InvalidCG3Error) {
        console.warn('cannot get params for this sentence: contains ambiguous analyses');
        return null;

      } else {
        // throw other errors
        throw e;
      }
    }
  }

  /**
   * parse an array of token parameters and save contents to the sentence
   *
   * @param {Array} paramsList
   * @return {(Array|null)}
   */
  set params(paramsList) {
    // can only parse arrays
    if (!(paramsList instanceof Array))
      return null;

    // clear existing data
    this.comments = [];
    this.tokens = [];

    // push a new token for each set of parameters
    _.each(paramsList, params => {
      this.tokens.push(Token.fromParams(this, params));
    });

    // attach heads and return validated parameter list
    return this.attach().params;
  }

  /**
   * static method allowing us to construct a new Sentence directly from an
   *   array of parameters
   *
   * @param {Array} paramsList
   * @param {Object} options (optional)
   * @return {Sentence}
   */
  static fromParams(paramsList, options) {
    let sent = new Sentence(options);
    sent.params = paramsList;
    return sent;
  }

  /**
   * get an array of the elements of this sentence, useful for exporting the data
   *   to visualization libraries such as Cytoscape or D3
   *
   * @return {Array}
   */
  get eles() {

    // just in case, since it's critical
    this.index();

    let eles = [];
    this.forEach(token => {
      eles = eles.concat(token.eles);
    });

    return eles;
  }

  clean() {
    throw new Error('Sentence::clean is not implemented'); // TODO
  }

  /**
   * iterate through the tokens and set an appropriate index for each (following
   *   CoNLL-U indexing scheme with, e.g. 1 for regular token, 1-2 for superToken,
   *   1.1 for "empty" token)
   *
   * @return {Sentence}
   */
  index() {
    // track "overall" index number (id) and "empty" index number and "absolute" num
    // NOTE: CoNLL-U indices start at 1 (0 is root), so we will increment this
    //   index before using it (see Token::index)
    let id = 0, empty = 0, num = 0;
    _.each(this.tokens, token => {
      // allow each token to return counters for the next guy
      [id, empty, num] = token.index(id, empty, num);
    });

    // chaining
    return this;
  }

  /**
   * iterate through the tokens and try to convert a plain string index to a
   *   head to the actual token given by that index (called after parsing
   *   CoNLL-U, CG3, or params)
   *
   * @return {Sentence}
   */
  attach() {
    // reindex in case we're out of date (valid index is crucial here)
    this.index();
    this.forEach(token => {
      token.analysis.head = token.analysis.head;
      token.analysis.deps = token.analysis.deps;
    });

    // chaining
    return this;
  }


  /**
   * iterate through the tokens and determine if they could be converted into
   *   a CoNLL-U formatted string
   *
   * NOTE: currently, only returns false if it contains one/more ambiguous analyses
   *
   * @return {Boolean}
   */
  get isValidConllu() {
    let valid = true;
    this.forEach(token => {
      if (token.isAmbiguous)
        valid = false;
    });
    return valid;
  }

  /**
   * iterate through the tokens and determine if they could be converted into
   *   a CG3 formatted string
   *
   * NOTE: currently, always returns true (see update below)
   *
   * @return {Boolean}
   */
  get isValidCG3() {
    let valid = true;
    this.forEach(token => {
      /*
      UPDATE 6/9/18: apparently CG3 can handle all this stuff, it's just a bit lossy
        (e.g. subTokens won't have their own `form` and `empty` tokens won't show up)

      if (token.isSubToken || token.isSuperToken || token.isEmpty)
        valid = false;
      */
    });
    return valid;
  }
}

/**
 * Proxy so that we can get tokens using Array-like syntax
 *
 * NOTE: usage: `sent[8]` would return the analysis of the token at index 8
 * NOTE: if `name` is not a Number, fall through to normal object
 *
 * @return {Mixed}
 * @name Sentence#get
 */
Sentence.prototype.__proto__ = new Proxy(Sentence.prototype.__proto__, {

  // default getter, called any time we use Sentence.name or Sentence[name]
  get(target, name, receiver) {

    // Symbols can't be cast to floats, so check here to avoid errors
    if (typeof name === 'symbol')
      return this[name];

    // cast, catch Infinity
    let id = parseFloat(name);
    if (!isNaN(id)) {

      // if we got a number, return analysis at that index
      id = parseInt(id);
      let token = receiver.tokens[id];
      return token ? token.analysis : null;

    } else {

      // fall through to normal getting
      return this[name];

    }
  }
});

// expose to application
module.exports = Sentence;
