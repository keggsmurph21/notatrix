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
    this.params = paramsList;
  }
  get length() {
    /**
     * Sentence::length [get]
     *
     * @return {Number} total number of tokens/subtokens in this sentence
     */

    let acc = 0;
    this.forEach(token => {
      acc++;
    });
    return acc;
  }
  forEach(callback) {
    /**
     * Sentence::forEach
     * loop through every token in the sentence and apply a callback
     *
     * @param {Function} callback function to be applied to every token
     * @return {Sentence}
     */

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
    /**
     * Sentence::getComment
     * return the comment at the given index, or null
     *
     * @param {Number} index
     * @return {String||null}
     */

    return this.comments[index] || null;
  }
  getToken(index) {
    /**
     * Sentence::getToken
     * return the token at the given index (note: this is regular token OR subtoken),
     *   or null.  to choose by superToken index, use Sentence[index] syntax.  this
     *   function assumes only the current analysis is desired.
     *
     * @param {Number} index
     * @return {Token||null}
     */

    let t = 0, token = null;
    this.forEach((tok, t) => {
      if (t === index)
        token = tok;
    });
    return token;
  }
  getById(index) {
    /**
     * Sentence::getById
     * return the current analysis of the token that matches a given index string
     *
     * NOTE: tokens outside the current analysis will have id=null and cannot be retrieved
     *   with this function
     *
     * @param {String} index
     * @return {Analysis||null}
     */

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
  insertTokenAt(index, token) {
    /**
     * Sentence::insertTokenAt
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
  removeTokenAt(index) {
    /**
     * Sentence::removeTokenAt
     * remove a token at the given index
     *
     * NOTE: if the index is out of bounds (<0 or >length - 1), then it will be
     *   adjusted to fit the bounds. this means that you can call this with
     *   `index=-Infinity` to remove the first element of the tokens array or
     *   with `index=Infinity` to pop from the end
     *
     * @param {Number} index
     * @return {Token||null}
     *
     * @throws {NotatrixError} if given invalid index
     */

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
  moveTokenAt(sourceIndex, targetIndex) {
    /**
     * Sentence::moveTokenAt
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
  pushToken(token) {
    /**
     * Sentence::pushToken
     * push a token to the end of the tokens array ... sugar for
     *   Sentence::insertTokenAt(Infinity, token)
     *
     * @param {Token} token
     * @return {Sentence}
     */

    return this.insertTokenAt(Infinity, token);
  }
  popToken() {
    /**
     * Sentence::popToken
     * pop a token from the end of the tokens array ... sugar for
     *   Sentence::removeTokenAt(Infinity)
     *
     * @return {Token||null}
     */

    return this.removeTokenAt(Infinity);
  }

  // external formats
  get nx() {
    /**
     * Sentence::nx [get]
     * get a serial version of the internal sentence representation
     *
     * @return {String}
     */

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
  get text() {
    /**
     * Sentence::text [get]
     * get a plain-text formatted string of the sentence's current analysis text
     *
     * @return {String}
     */

    // only care about tokens (not comments or settings)
    let tokens = [];
    this.forEach(token => {
      if (!token.isSubToken && !token.isEmpty)
        tokens.push(token.text);
    });
    return tokens.join(' ');
  }
  get conllu() {
    /**
     * Sentence::conllu [get]
     * get a CoNLL-U formatted string representing the sentence's current analysis
     *
     * @return {String||null}
     */

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
  set conllu(conllu) {
    /**
     * Sentence::conllu [set]
     * parse a CoNLL-U formatted string and save its contents to the sentence
     *
     * @param {String} conllu
     * @return {String}
     */

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
          superToken.pushSubToken( Token.fromConllu(this, lines[j + k + 1]) );
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
  static fromConllu(serial, options) {
    /**
     * Sentence::fromConllu
     * static method allowing us to construct a new Sentence directly from a
     *   CoNLL-U string
     *
     * @param {String} serial
     * @param {Object} options (optional)
     * @return {Sentence}
     */

    let sent = new Sentence(options);
    sent.conllu = serial;
    return sent;
  }
  get cg3() {
    /**
     * Sentence::cg3 [get]
     * get a CG3 formatted string representing all of the sentence's analyses
     *
     * @return {String||null}
     */

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
  set cg3(cg3) {
    /**
     * Sentence::cg3 [set]
     * parse a CG3 formatted string and save its contents to the sentence
     *
     * @param {String} conllu
     * @return {String}
     */

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
  static fromCG3(serial, options) {
    /**
     * Sentence::fromCG3
     * static method allowing us to construct a new Sentence directly from a
     *   CG3 string
     *
     * @param {String} serial
     * @param {Object} options (optional)
     * @return {Sentence}
     */

    let sent = new Sentence(options);
    sent.cg3 = serial;
    return sent;
  }
  get params() {
    /**
     * Sentence::params [get]
     * get an array of token parameters representing the sentence
     *
     * NOTE: fails (returns null) if we have subTokens or ambiguous analyses
     *
     * @return {Array||null}
     */

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
  set params(paramsList) {
    /**
     * Sentence::params [set]
     * parse an array of token parameters and save contents to the sentence
     *
     * @param {Array} paramsList
     * @return {Array||null}
     */

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
  static fromParams(paramsList, options) {
    /**
     * Sentence::fromParams
     * static method allowing us to construct a new Sentence directly from an
     *   array of parameters
     *
     * @param {Array} paramsList
     * @param {Object} options (optional)
     * @return {Sentence}
     */

    let sent = new Sentence(options);
    sent.params = paramsList;
    return sent;
  }
  get eles() {
    throw new Error('Sentence::eles [get] is not implemented'); // TODO
  }

  clean() {
    throw new Error('Sentence::clean is not implemented'); // TODO
  }
  index() {
    /**
     * Sentence::index
     * iterate through the tokens and set an appropriate index for each (following
     *   CoNLL-U indexing scheme with, e.g. 1 for regular token, 1-2 for superToken,
     *   1.1 for "empty" token)
     *
     * @return {Sentence}
     */

    // track "overall" index number (id) and "empty" index number
    // NOTE: CoNLL-U indices start at 1 (0 is root), so we will increment this
    //   index before using it (see Token::index)
    let id = 0, empty = 0;
    _.each(this.tokens, token => {
      // allow each token to return counters for the next guy
      [id, empty] = token.index(id, empty);
    });

    // chaining
    return this;
  }
  attach() {
    /**
     * Sentence::attach
     * iterate through the tokens and try to convert a plain string index to a
     *   head to the actual token given by that index (called after parsing
     *   CoNLL-U, CG3, or params)
     *
     * @return {Sentence}
     */

    // reindex in case we're out of date (valid index is crucial here)
    this.index();
    this.forEach(token => {
      token.analysis.head = token.analysis.head;
      token.analysis.deps = token.analysis.deps;
    });

    // chaining
    return this;
  }

  get isValidConllu() {
    /**
     * Sentence::isValidConllu [get]
     * iterate through the tokens and determine if they could be converted into
     *   a CoNLL-U formatted string
     *
     * NOTE: currently, only returns false if it contains one/more ambiguous analyses
     *
     * @return {Boolean}
     */

    let valid = true;
    this.forEach(token => {
      if (token.isAmbiguous)
        valid = false;
    });
    return valid;
  }
  get isValidCG3() {
    /**
     * Sentence::isValidCG3 [get]
     * iterate through the tokens and determine if they could be converted into
     *   a CG3 formatted string
     *
     * NOTE: currently, always returns true (see update below)
     *
     * @return {Boolean}
     */

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
Sentence.prototype.__proto__ = new Proxy(Sentence.prototype.__proto__, {
  /**
   * Sentence.prototype:: [get]
   * add this Proxy so that we can get using Array-like syntax on the tokens
   *   in each Sentence
   *
   * NOTE: usage: `sent[8]` would return the analysis of the token at index 8
   * NOTE: if `name` is not a Number, fall through to normal object
   *
   * @return {Mixed}
   */

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
