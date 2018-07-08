'use strict';

const _ = require('underscore');

const NotatrixError       = require('./errors').NotatrixError;
const InvalidCG3Error     = require('./errors').InvalidCG3Error;
const InvalidCoNLLUError  = require('./errors').InvalidCoNLLUError

const Analysis = require('./analysis');


/**
 * helper function to split on whitespace
 *
 * @param {String} str
 * @return {Array}
 */
function split(str) {
  return (str || '').split(/\s+/);
}

/**
 * helper function to count the number of leading `\t` characters in a string
 *
 * @param {String} line
 * @return {Number}
 */
function getIndent(line) {

  let chars = line.split(''),
    i = 0;

  while (chars[i++] === '\t')
    true; // do nothing

  return i - 1;
}

// CG3 parser helper functions

/**
 * extract the `form` parameter from a given string
 *
 * @param {String} line
 * @return {(undefined|String)}
 */
function cg3StringGetForm(line) {

  return cg3Regex.form.test(line)
    ? line.match(cg3Regex.form)[1]
    : undefined
}

/**
 * extract all the other (not `form`) tags from a given string
 *
 * @param {String} line
 * @return {Object}
 */
function cg3StringGetTags(line) {

  // initialize things
  let lemma, xpostag = [],
    head, deprel, deps, misc = [];

  // get lemma
  if (cg3Regex.lemma.test(line))
    lemma = line.match(cg3Regex.lemma)[1];

  // only consider line after lemma (if it exists)
  line = lemma ? line.slice(line.indexOf(lemma) + lemma.length + 1).trim() : line;

  // split on whitespace
  let chunks = split(line);

  // iterate over each chunk
  for (let j=0; j<chunks.length; j++) {

    // try to extract deprel
    if (cg3Regex.deprel.test(chunks[j])) {
      deprel = chunks[j].match(cg3Regex.deprel)[1];

    // try to extract head
    } else if (cg3Regex.dependency.test(chunks[j])) {
      head = chunks[j].match(cg3Regex.dependency)[2];

    // try to extract misc, track with array (can be multiple)
    } else if (cg3Regex.misc.test(chunks[j])) {
      misc.push(chunks[j]);

    // try to extract tags (and save to xpostag), track with an array (can be multiple)
    } else {
      xpostag.push(chunks[j]);
    }
  }

  // return our extracted data
  return {
    lemma: lemma,
    xpostag: xpostag.join(';') || undefined,
    head: head,
    deprel: deprel,
    deps: deps,
    misc: misc.join(';') || undefined
  };
}

/**
 * parse an array of strings representing a CG3 analysis ... recall that in CG3,
 *   subTokens have an increasingly hanging indent from their superToken
 *
 * @param {Token} token token to attach the analyses to
 * @param {Array} lines [[String]]
 * @return {undefined}
 */
function cg3StringParseAnalysis(token, lines) {

  if (lines.length === 2) {

    // no subTokens
    let tags = cg3StringGetTags(lines[1]); // extract tags
    tags.form = cg3StringGetForm(lines[0]); // extract the form
    token.pushAnalysis(new Analysis(token, tags)); // save to token

  } else {

    // has subTokens
    let analysis = new Analysis(token, {
      form: cg3StringGetForm(lines[0]) // superToken only save form
    });

    // for each subToken
    for (let i=1; i<lines.length; i++) {
      let tags = cg3StringGetTags(lines[i]); // extract tags
      let subToken = new Token(token.sentence, tags);  // make new subToken
      analysis.pushSubToken( subToken ); // attach to this analysis
    }
    token.pushAnalysis(analysis); // save to token

  }
}

// define all the CG3-parsing regex here
const cg3Regex = {
  form: /^"<((.|\\")*)>"/,
  lemma: /["\]](.*)["\]](\s|$)/,
  head: /->(.*)$/,
  dependency: /^#(.+)->(.*)/,
  deprel: /^@(.*)/,
  misc: /.+:.*/
};

/**
 * this class contains all the information associated with a token, including
 *   a possible superToken, an array of possible analyses, an index to the
 *   current analysis, and a Boolean representing whether it is an "empty" token
 */
class Token {
  constructor(sent, params) {

    // require sentence param
    if (!sent)
      throw new NotatrixError('missing required arg: Sentence')

    // pointer to parent
    this.sentence = sent;

    // internal stuff
    this.superToken = null;
    this.analyses = []; // array of analyses
    this._current = null; // index of current analysis in array
    this._isEmpty = false; // used for CoNLL-U "empty" tokens

    // try parsing an analysis from params
    if (params)
      this.analysis = new Analysis(this, params);
  }

  /**
   *
   * @return {Number} total number of analyses in this token
   */
  get length() {

    return this.analyses.length;
  }

  /**
   * loop through every analysis in the sentence and apply a callback
   *
   * @param {Function} callback function to be applied to every analysis
   * @return {Token}
   */
  forEach(callback) {

    for (let i=0; i<this.length; i++) {
      callback(this.analyses[i], i);
    }

    // chaining
    return this;
  }

  // keeping track of ambiguous analyses

  /**
   * decrement the _current counter by one (set "previous" analysis as current)
   *
   * @return {Token}
   */
  prev() {

    // if no analyses set whatsoever
    if (this._current === null)
      return null;

    // if we're not already at the first one
    if (this._current > 0)
      this._current--;

    // chaining
    return this;
  }

  /**
   * increment the _current counter by one (set "next" analysis as current)
   *
   * @return {Token}
   */
  next() {

    // if no analyses set whatsoever
    if (this._current === null)
      return null;

    // if we're not already at the last one
    if (this._current < this.length - 1)
      this._current++;

    // chaining
    return this;
  }

  /**
   * return the _current index
   *
   * @return {Number}
   */
  get current() {

    return this._current;
  }

  /**
   * set the _current index to the given index if possible
   *
   * @param {Number} current
   * @return {Number}
   */
  set current(current) {

    // force cast to int
    current = parseInt(current);
    if (isNaN(current))
      return this.current;

    // bounds checking
    if (current < 0)
      return this.current;
    if (current > this.length - 1)
      return this.current;

    // set and return it
    this._current = current;
    return this.current;
  }

  // manipulate analyses array

  /**
   * insert an analysis BEFORE the given index
   *
   * NOTE: if the index is out of bounds (<0 or >length), then it will be adjusted
   *   to fit the bounds. this means that you can call this with `index=-Infinity`
   *   to push to the front of the analyses array or with `index=Infinity` to push
   *   to the end
   *
   * @param {Number} index
   * @param {Analysis} analysis
   * @return {Token}
   *
   * @throws {NotatrixError} if given invalid index or analysis
   */
  insertAnalysisAt(index, analysis) {

    index = parseFloat(index); // catch Infinity
    if (isNaN(index))
      throw new NotatrixError('unable to insert subToken: unable to cast index to int');

    if (!(analysis instanceof Analysis))
      throw new NotatrixError('unable to insert analysis: not instance of Analysis');

    // if we had no analyses, make this the first
    if (this.current === null)
      this._current = 0;

    // bounds checking
    index = index < 0 ? 0
      : index > this.length ? this.length
      : parseInt(index);

    // set the parent pointer on the analysis
    analysis.token = this;

    // array insertion
    this.analyses = this.analyses.slice(0, index)
      .concat(analysis)
      .concat(this.analyses.slice(index));

    // chaining
    return this;
  }

  /**
   * remove an analysis at the given index
   *
   * NOTE: if the index is out of bounds (<0 or >length - 1), then it will be
   *   adjusted to fit the bounds. this means that you can call this with
   *   `index=-Infinity` to remove the first element of the analyses array or
   *   with `index=Infinity` to remove the last
   *
   * @param {Number} index
   * @return {(null|Analysis)}
   *
   * @throws {NotatrixError} if given invalid index
   */
  removeAnalysisAt(index) {

    // can't remove if we have an empty array
    if (!this.length)
      return null;

    index = parseFloat(index); // catch Infinity
    if (isNaN(index))
      throw new NotatrixError('unable to remove subToken: unable to cast index to int');

    // bounds checking
    index = index < 0 ? 0
      : index > this.length - 1 ? this.length - 1
      : parseInt(index);

    // go to previous analysis if we just deleted our current one or before it
    if (this.current >= index)
      this.prev();

    // if we now have an empty array, update _current
    if (this.length === 1)
      this._current = null;

    // array splicing, return spliced element
    return this.analyses.splice(index, 1)[0];
  }

  /**
   * move an analysis from sourceIndex to targetIndex
   *
   * NOTE: if either index is out of bounds (<0 or >length - 1), then it will
   *   be adjusted to fit the bounds. this means that you can call this with
   *   `sourceIndex=-Infinity` to select the first element of the analyses array
   *   or with `sourceIndex=Infinity` to select the last
   *
   * @param {Number} sourceIndex
   * @param {Number} targetIndex
   * @return {Token}
   *
   * @throws {NotatrixError} if given invalid sourceIndex or targetIndex
   */
  moveAnalysisAt(sourceIndex, targetIndex) {

    sourceIndex = parseFloat(sourceIndex);
    targetIndex = parseFloat(targetIndex);
    if (isNaN(sourceIndex) || isNaN(targetIndex))
      throw new NotatrixError('unable to move analysis: unable to cast indices to ints');

    // bounds checking
    sourceIndex = sourceIndex < 0 ? 0
      : sourceIndex > this.length - 1 ? this.length - 1
      : parseInt(sourceIndex);
    targetIndex = targetIndex < 0 ? 0
      : targetIndex > this.length - 1 ? this.length - 1
      : parseInt(targetIndex);

    if (sourceIndex === targetIndex) {
      // do nothing
    } else {

      // array splice and insert
      let analysis = this.analyses.splice(sourceIndex, 1);
      this.analyses = this.analyses.slice(0, targetIndex)
        .concat(analysis)
        .concat(this.analyses.slice(targetIndex));

    }

    // chaining
    return this;
  }

  /**
   * push an analysis to the end of the analyses array ... sugar for
   *   Token::insertAnalysisAt(Infinity, analysis)
   *
   * @param {Analysis} analysis
   * @return {Token}
   */
  pushAnalysis(analysis) {
    return this.insertAnalysisAt(Infinity, analysis);
  }

  /**
   * pop an analysis from the end of the analyses array ... sugar for
   *   Token::insertRemoveAt(Infinity)
   *
   * @return {(null|Analysis)}
   */
  popAnalysis() {
    return this.removeAnalysisAt(Infinity);
  }

  // token combining, merging, splitting

  combineWith(token) {

  }
  mergeWith(token) {
    if (!(token instanceof Token))
      throw new NotatrixError('unable to merge: not instance of Token');

    if (this === token)
      throw new NotatrixError('unable to merge: can\'t merge with self');

    if (this.isSuperToken || token.isSuperToken)
      throw new NotatrixError('unable to merge: can\'t merge superTokens');

    if (this.superToken !== token.superToken)
      throw new NotatrixError('unable to merge: can\'t merge tokens with different superTokens');

    const dist = Math.abs(this.analysis.clump - token.analysis.clump);
    if (dist !== 1)
      throw new NotatrixError('unable to merge: tokens must be adjacent');

    if (this.analysis === null || token.analysis === null)
      throw new NotatrixError('unable to merge: tokens must have at least one analysis');

    // combine the form and lemma fields
    this.analysis.form = ((this.analysis.form || '') + (token.analysis.form || '')) || null;
    this.analysis.lemma = ((this.analysis.lemma || '') + (token.analysis.lemma || '')) || null;

    // take one of these fields
    this.upostag = this.upostag || token.upostag || null;
    this.xpostag = this.xpostag || token.xpostag || null;
    this.feats = this.feats || token.feats || null;
    this.misc = this.misc || token.misc || null;

    // remove the token
    if (token.isSubToken) {

      const indices = this.sentence.getIndices(token);
      this.superToken.removeSubTokenAt(indices.sub);

    } else {

      const indices = this.sentence.getIndices(token);
      this.sentence.removeTokenAt(indices.super);

    }

    this.sentence.index();
    return this; // chaining
  }
  split() {

  }

  // internal format

  /**
   * get the current analysis for the token or null if none exist
   *
   * @return {(null|Analysis)}
   */
  get analysis() {

    if (this.current === null)
      return null;
    return this.analyses[this.current];
  }

  /**
   * set the current analysis for the token
   *
   * NOTE: if there is already an analysis, overwrite
   *
   * @param {Analysis} analysis
   * @return {Token}
   *
   * @throws {NotatrixError} if given invalid analysis
   */
  set analysis(analysis) {

    if (!(analysis instanceof Analysis))
      throw new NotatrixError('unable to set analysis: not instance of Analysis');

    if (this.analysis === null) {
      // push to front if we have no analyses
      this.insertAnalysisAt(0, analysis);

    } else {
      // otherwise overwrite
      analysis.token = this;
      this.analyses[this.current] = analysis;
    }

    return this;
  }


  /**
   * if we have a current analysis, return its subTokens
   *
   * @return {(null|Array)}
   */
  get subTokens() {

    if (this.analysis === null)
      return null;
    return this.analysis.subTokens;
  }

  // external format stuff

  /**
   * iterate over this token and its subTokens (if we have any) for the current
   *   analysis, using the `id` and `empty` params to set indices
   *
   * @param {Number} id "overall" index
   * @param {Number} empty
   * @return {Array} [Number, Number]
   *
   * @throws {NotatrixError} if given invalid id or empty
   */
  index(id, empty, num, clump) {

    id = parseInt(id);
    empty = parseInt(empty);
    num = parseInt(num);
    clump = parseInt(clump);

    if (isNaN(id) || isNaN(empty) || isNaN(num) || isNaN(clump))
      throw new NotatrixError('can\'t index tokens using non-integers, make sure to call Sentence.index()')

    // if no analysis, nothing to do
    if (this.analysis === null)
      return [id, empty, num, clump];

    // iterate over analyses
    this.forEach(analysis => {

      // only set the "id" and "empty" indices on the current analysis
      if (analysis.isCurrent) {
        if (this.isSuperToken) {

          // save the absolute index
          this.analysis.num = num;
          this.analysis.clump = null;
          num++;

          // index subTokens
          _.each(this.analysis.subTokens, subToken => {
            if (subToken.isEmpty) {
              empty++; // incr empty counter
              subToken.analysis.id = `${id}.${empty}` // dot syntax
            } else {
              id++; // incr regular counter
              subToken.analysis.id = `${id}`; // vanilla syntax
              empty = 0; // reset empty counter
            }

            // save the absolute index
            subToken.forEach(analysis => {
              analysis.num = num;
              num++;
              analysis.clump = clump;
              clump++;
            });
          });

          // set special superToken index scheme
          const firstSubAnalysis = this.subTokens[0].analysis;
          const lastSubAnalysis = this.subTokens[this.analysis.length - 1].analysis;
          this.analysis.id = `${firstSubAnalysis.id}-${lastSubAnalysis.id}`;

        } else {

          // save the absolute index
          this.analysis.num = num;
          num++;
          this.analysis.clump = clump;
          clump++;

          if (this.isEmpty) {
            empty++; // incr empty counter
            this.analysis.id = `${id}.${empty}` // dot syntax
          } else {
            id++; // incr regular counter
            this.analysis.id = `${id}`; // vanilla syntax
            empty = 0; // reset empty counter
          }
        }

      } else {

        // save the absolute index
        this.analysis.num = num;
        num++;

        // non-current analyses get "id" and "empty" indices set to null
        analysis.id = null;
        _.each(analysis.subTokens, subToken => {
          subToken.analysis.id = null;

          subToken.forEach(analysis => {

            // save the absolute index
            this.analysis.num = num;
            num++;

          });
        });
      }
    });

    // return updated indices
    return [id, empty, num, clump];
  }

  /**
   * get a serial version of the internal token representation
   *
   * @return {Object}
   */
  get nx() {

    // serialize analyses
    let analyses = [];
    this.forEach(analysis => {
      analyses.push(analysis.nx);
    });

    // serialize other data
    return {
      current: this.current,
      isEmpty: this.isEmpty,
      analyses: analyses
    };
  }

  /**
   * deserialize an internal representation
   *
   * @param {(String|Object)} nx JSON string or object
   * @return {undefined}
   */
  set nx(nx) {

    // parse the JSON if it's a string
    nx = (typeof nx === 'string')
      ? JSON.parse(nx)
      : nx;

    this.analyses = nx.analyses.map(analysisNx => {

      let analysis = Analysis.fromNx(this, analysisNx);
      analysis.subTokens = analysisNx.subTokens.map(subTokenNx => {
        return Token.fromNx(this.sentence, subTokenNx);
      });
      return analysis;

    });
    this.current = nx.current;
    this._isEmpty = nx.isEmpty;

  }

  /**
   * static method allowing us to construct a new Token directly from an
   *   Nx string and bind it to a sentence
   *
   * @param {Sentence} sent
   * @param {String} serial
   * @return {Token}
   */
  static fromNx(sent, serial) {
    let token = new Token(sent);
    token.nx = serial;
    return token;
  }

  /**
   * get a plain-text formatted string of the current analysis text
   *
   * @return {String}
   *
   * @throws {NotatrixError} if no analysis
   */
  get text() {

    if (this.analysis === null)
      throw new NotatrixError('no analysis to get text for');

    return this.analysis.text || '';
  }

  /**
   * get a CoNLL-U formatted string representing the current analysis
   *
   * @return {String}
   *
   * @throws {NotatrixError} if no analysis
   * @throws {InvalidCoNLLUError} if ambiguous
   */
  get conllu() {

    if (this.analysis === null)
      throw new NotatrixError('no analysis to get CoNLL-U for');

    if (this.isAmbiguous)
      throw new InvalidCoNLLUError('Token is ambiguous, can\'t be converted to CoNNL-U');

    return this.analysis.conllu;
  }

  /**
   * parse a CoNLL-U formatted string and save its contents to the current analysis
   *
   * @param {String} serial
   * @return {undefined}
   */
  set conllu(serial) {
    // split serial string on whitespace
    const fields = split(serial);

    // check if serial index indicates an "empty" token
    this._isEmpty = /\./.test(fields[0]);

    // generate an analysis from the fields
    this.analysis = new Analysis(this, {
      form: fields[1],
      lemma: fields[2],
      upostag: fields[3],
      xpostag: fields[4],
      feats: fields[5],
      head: fields[6],
      deprel: fields[7],
      deps: fields[8],
      misc: fields[9]
    });
  }

  /**
   * static method allowing us to construct a new Token directly from a
   *   CoNLL-U string and bind it to a sentence
   *
   * @param {Sentence} sent
   * @param {String} serial
   * @return {Token}
   */
  static fromConllu(sent, serial) {
    let token = new Token(sent);
    token.conllu = serial;
    return token;
  }

  /**
   * get a CG3 formatted string representing the current analysis
   *
   * @return {String}
   *
   * @throws {NotatrixError} if no analysis
   */
  get cg3() {
    if (this.analysis === null)
      throw new NotatrixError('no analysis to get CG3 for');

    // the form goes on its own line, with each analysis below
    return [ `"<${this.analysis.form}>"` ].concat(
      this.analyses.map(analysis => {
        return analysis.cg3;
      })
    ).join('\n');
  }

  /**
   * parse a CG3 formatted string and save its contents to the current analysis
   *
   * @param {Array} tokenLines generated in Sentence::cg3 [set] by splitting
   *   a serial string on newlines
   * @return {undefined}
   */
  set cg3(tokenLines) {
    // again, we have complicated parsing here ... first make sure we get an
    //   array of the important information (minimally the form on the first line)
    let analysis = [ tokenLines[0] ];

    // iterate over the strings
    for (let i=1; i<tokenLines.length; i++) {

      // ignore leading semicolons (TODO: determine what these are)
      let line = tokenLines[i].replace(/^;/, '');

      // determine line indent
      let indent = getIndent(line);

      // if we're back at indent=1 and we already have stuff in our analysis
      //   buffer, parse it as an analysis
      if (indent === 1 && i > 1) {
        // parse as analysis
        cg3StringParseAnalysis(this, analysis);
        // reset buffer
        analysis = [ tokenLines[0] ];
      }

      // add to buffer
      analysis.push(line);
    }

    // parse and clear buffer
    cg3StringParseAnalysis(this, analysis);
  }

  /**
   * static method allowing us to construct a new Token directly from a
   *   CG3 string
   *
   * @param {Sentence} sent
   * @param {Array} tokenLines
   * @return {Token}
   */
  static fromCG3(sent, tokenLines) {
    let token = new Token(sent);
    token.cg3 = tokenLines;
    return token;
  }

  /**
   * get the token parameters for the current analysis
   *
   * @return {Object}
   *
   * @throws {NotatrixError} if no analysis
   */
  get params() {
    if (this.analysis === null)
      throw new NotatrixError('no analysis to get params for');

    return this.analysis.params;
  }

  /**
   * set a set of parameters as the current analysis
   *
   * @param {Object} params
   * @return {Object}
   */
  set params(params) {
    this.analysis = new Analysis(this, params);
    return this.params;
  }

  /**
   * static method allowing us to construct a new Token directly from a set
   *   of parameters
   *
   * @param {Sentence} sent
   * @param {Object} params
   * @return {Token}
   */
  static fromParams(sent, params) {
    let token = new Token(sent);
    token.params = params;
    return token;
  }

  /**
   * get an array of elements for exporting to external visualization libraries
   *   for all the analyses of this token
   *
   * @return {Array}
   */
  get eles() {
    let eles = [];
    this.forEach(analysis => {
      eles = eles.concat(analysis.eles);
    });

    return eles;
  }

  // bool stuff

  /**
   * returns true iff this token is a subToken of some other token
   *
   * @return {Boolean}
   */
  get isSubToken() {
    return this.superToken !== null;
  }

  /**
   * returns true iff this token has subTokens
   *
   * @return {Boolean}
   */
  get isSuperToken() {
    return this.analysis ? this.analysis.isSuperToken : null;
  }

  /**
   * returns true iff this token or its superToken is an "empty" token
   *
   * @return {Boolean}
   */
  get isEmpty() {
    return this.isSubToken ? this.superToken.token.isEmpty : this._isEmpty;
  }

  /**
   * return true iff this token has more than one analysis
   *
   * @return {Boolean}
   */
  get isAmbiguous() {
    return this.length > 1;
  }
}

// expose to application
module.exports = Token;
