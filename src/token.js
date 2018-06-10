'use strict';

const _ = require('underscore');

const NotatrixError       = require('./errors').NotatrixError;
const InvalidCG3Error     = require('./errors').InvalidCG3Error;
const InvalidCoNLLUError  = require('./errors').InvalidCoNLLUError

const Analysis = require('./analysis');

function split(str) {
  /**
   * split
   * helper function to split on whitespace
   *
   * @param {String} str
   * @return {Array}
   */

  return (str || '').split(/\s+/);
}
function getIndent(line) {
  /**
   * getIndent
   * helper function to count the number of leading `\t` characters in a string
   *
   * @param {String} line
   * @return {Number}
   */

  let chars = line.split(''),
    i = 0;

  while (chars[i++] === '\t')
    true; // do nothing

  return i - 1;
}

// CG3 parser helper functions
function cg3StringGetForm(line) {
  /**
   * cg3StringGetForm
   * extract the `form` parameter from a given string
   *
   * @param {String} line
   * @return {String||undefined}
   */

  return cg3Regex.form.test(line)
    ? line.match(cg3Regex.form)[1]
    : undefined
}
function cg3StringGetTags(line) {
  /**
   * cg3StringGetTags
   * extract all the other (not `form`) tags from a given string
   *
   * @param {String} line
   * @return {Object}
   */

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
function cg3StringParseAnalysis(token, lines) {
  /**
   * cg3StringParseAnalysis
   * parse an array of strings representing a CG3 analysis ... recall that in CG3,
   *   subTokens have an increasingly hanging indent from their superToken
   *
   * @param {Token} token token to attach the analyses to
   * @param {Array} lines [[String]]
   * @return {undefined}
   */

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

class Token extends Object {
  constructor(sent, params) {
    super();

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
  get length() {
    /**
     * Analysis::length [get]
     *
     * @return {Number} total number of analyses in this token
     */

    return this.analyses.length;
  }
  forEach(callback) {
    /**
     * Analysis::forEach
     * loop through every analysis in the sentence and apply a callback
     *
     * @param {Function} callback function to be applied to every analysis
     * @return {Token}
     */

    for (let i=0; i<this.length; i++) {
      callback(this.analyses[i], i);
    }

    // chaining
    return this;
  }

  // keeping track of ambiguous analyses
  prev() {
    /**
     * Token::prev
     * decrement the _current counter by one (set "previous" analysis as current)
     *
     * @return {Token}
     */

    // if no analyses set whatsoever
    if (this._current === null)
      return null;

    // if we're not already at the first one
    if (this._current > 0)
      this._current--;

    // chaining
    return this;
  }
  next() {
    /**
     * Token::next
     * increment the _current counter by one (set "next" analysis as current)
     *
     * @return {Token}
     */

    // if no analyses set whatsoever
    if (this._current === null)
      return null;

    // if we're not already at the last one
    if (this._current < this.length - 1)
      this._current++;

    // chaining
    return this;
  }
  get current() {
    /**
     * Token::current [get]
     * return the _current index
     *
     * @return {Number}
     */

    return this._current;
  }
  set current(current) {
    /**
     * Token::current [set]
     * set the _current index to the given index if possible
     *
     * @param {Number} current
     * @return {Number}
     */

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

  // maniuplate analyses array
  insertAnalysisAt(index, analysis) {
    /**
     * Token::insertAnalysisAt
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
  removeAnalysisAt(index) {
    /**
     * Token::removeAnalysisAt
     * remove an analysis at the given index
     *
     * NOTE: if the index is out of bounds (<0 or >length - 1), then it will be
     *   adjusted to fit the bounds. this means that you can call this with
     *   `index=-Infinity` to remove the first element of the analyses array or
     *   with `index=Infinity` to remove the last
     *
     * @param {Number} index
     * @return {Analysis||null}
     *
     * @throws {NotatrixError} if given invalid index
     */

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
  moveAnalysisAt(sourceIndex, targetIndex) {
    /**
     * Token::moveAnalysisAt
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
  pushAnalysis(analysis) {
    /**
     * Token::pushAnalysis
     * push an analysis to the end of the analyses array ... sugar for
     *   Token::insertAnalysisAt(Infinity, analysis)
     *
     * @param {Analysis} analysis
     * @return {Token}
     */

    return this.insertAnalysisAt(Infinity, analysis);
  }
  popAnalysis() {
    /**
     * Token::popAnalysis
     * pop an analysis from the end of the analyses array ... sugar for
     *   Token::insertRemoveAt(Infinity)
     *
     * @return {Analysis||null}
     */

    return this.removeAnalysisAt(Infinity);
  }

  // token insertion, removal, moving
  /*insertBefore(token) {
    const indices = this.getIndices();
    return this.sentence.insertTokenAt(indices, token);
  }
  insertAfter(token) {
    const indices = this.getIndicesAfter();
    return this.sentence.insertTokenAt(indices, token);
  }
  insertSubTokenBefore(subToken) {

  }
  insertSubTokenAfter(subToken) {

  }
  remove() {

  }
  moveBefore(token) {

  }
  moveAfter(token) {

  }
  makeSubTokenOf(token) {

  }

  // token combining, merging, splitting
  combineWith(token) {

  }
  mergeWith(token) {

  }
  split() {

  }*/

  // internal format
  get analysis() {
    /**
     * Token::analysis [get]
     * get the current analysis for the token or null if none exist
     *
     * @return {Analysis||null}
     */

    if (this.current === null)
      return null;
    return this.analyses[this.current];
  }
  set analysis(analysis) {
    /**
     * Token::analysis [set]
     * set the current analysis for the token
     *
     * NOTE: if there is already an analysis, overwrite
     *
     * @param {Analysis} analysis
     * @return {Token}
     *
     * @throws {NotatrixError} if given invalid analysis
     */

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

  get subTokens() {
    /**
     * Token::subTokens [get]
     * if we have a current analysis, return its subTokens
     *
     * @return {Array||null}
     */

    if (this.analysis === null)
      return null;
    return this.analysis.subTokens;
  }

  // external format stuff
  index(id, empty) {
    /**
     * Token::index
     * iterate over this token and its subTokens (if we have any) for the current
     *   analysis, using the `id` and `empty` params to set indices
     *
     * @param {Number} id "overall" index
     * @param {Number} empty
     * @return {Array} [Number, Number]
     *
     * @throws {NotatrixError} if given invalid id or empty
     */

    if (isNaN(parseInt(id)))
      throw new NotatrixError('can\'t index tokens using non-integers, make sure to call Sentence.index()')

    // if no analysis, nothing to do
    if (this.analysis === null)
      return id;

    // iterate over analyses
    this.forEach(analysis => {

      // only set the indices on the current analysis
      if (analysis === this.analysis) {
        if (this.isSuperToken) {

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
          });

          // set special superToken index scheme
          const firstSubAnalysis = this.subTokens[0].analysis;
          const lastSubAnalysis = this.subTokens[this.analysis.length - 1].analysis;
          this.analysis.id = `${firstSubAnalysis.id}-${lastSubAnalysis.id}`;

        } else {
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

        // non-current analyses get indices set to null
        analysis.id = null;
        _.each(analysis.subTokens, subToken => {
          subToken.analysis.id = null;
        });
      }
    });

    // return updated indices
    return [id, empty];
  }
  get nx() {
    /**
     * Token::nx [get]
     * get a serial version of the internal token representation
     *
     * @return {Object}
     */

    // serialize analyses
    let analyses = [];
    this.forEach(analysis => {
      analyses.push(analysis.nx);
    });

    // serialize other data
    return {
      current: this.current,
      analyses: analyses
    };
  }
  get text() {
    /**
     * Token::text [get]
     * get a plain-text formatted string of the current analysis text
     *
     * @return {String}
     *
     * @throws {NotatrixError} if no analysis
     */

    if (this.analysis === null)
      throw new NotatrixError('no analysis to get text for');

    return this.analysis.text || '';
  }
  get conllu() {
    /**
     * Token::conllu [get]
     * get a CoNLL-U formatted string representing the current analysis
     *
     * @return {String}
     *
     * @throws {NotatrixError} if no analysis
     * @throws {InvalidCoNLLUError} if ambiguous
     */

    if (this.analysis === null)
      throw new NotatrixError('no analysis to get CoNLL-U for');

    if (this.isAmbiguous)
      throw new InvalidCoNLLUError('Token is ambiguous, can\'t be converted to CoNNL-U');

    return this.analysis.conllu;
  }
  set conllu(serial) {
    /**
     * Token::conllu [set]
     * parse a CoNLL-U formatted string and save its contents to the current analysis
     *
     * @param {String} serial
     * @return {undefined}
     */

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
  static fromConllu(sent, serial) {
    /**
     * Token::fromConllu
     * static method allowing us to construct a new Token directly from a
     *   CoNLL-U string and bind it to a sentence
     *
     * @param {Sentence} sent
     * @param {String} serial
     * @return {Token}
     */

    let token = new Token(sent);
    token.conllu = serial;
    return token;
  }
  get cg3() {
    /**
     * Token::cg3 [get]
     * get a CG3 formatted string representing the current analysis
     *
     * @return {String}
     *
     * @throws {NotatrixError} if no analysis
     */

    if (this.analysis === null)
      throw new NotatrixError('no analysis to get CG3 for');

    // the form goes on its own line, with each analysis below
    return [ `"<${this.analysis.form}>"` ].concat(
      this.analyses.map(analysis => {
        return analysis.cg3;
      })
    ).join('\n');
  }
  set cg3(tokenLines) {
    /**
     * Token::cg3 [set]
     * parse a CG3 formatted string and save its contents to the current analysis
     *
     * @param {Array} tokenLines generated in Sentence::cg3 [set] by splitting
     *   a serial string on newlines
     * @return {undefined}
     */

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
  static fromCG3(sent, tokenLines) {
    /**
     * Token::fromCG3
     * static method allowing us to construct a new Token directly from a
     *   CG3 string
     *
     * @param {Sentence} sent
     * @param {Array} tokenLines
     * @return {Token}
     */

    let token = new Token(sent);
    token.cg3 = tokenLines;
    return token;
  }
  get params() {
    /**
     * Token::params [get]
     * get the token parameters for the current analysis
     *
     * @return {Object}
     *
     * @throws {NotatrixError} if no analysis
     */

    if (this.analysis === null)
      throw new NotatrixError('no analysis to get params for');

    return this.analysis.params;
  }
  set params(params) {
    /**
     * Token::params [set]
     * set a set of parameters as the current analysis
     *
     * @param {Object} params
     * @return {Object}
     */

    this.analysis = new Analysis(this, params);
    return this.params;
  }
  static fromParams(sent, params) {
    /**
     * Token::fromParams
     * static method allowing us to construct a new Token directly from a set
     *   of parameters
     *
     * @param {Sentence} sent
     * @param {Object} params
     * @return {Token}
     */

    let token = new Token(sent);
    token.params = params;
    return token;
  }
  get eles() {
    throw new Error('Token::eles [get] is not implemented');
  }

  // bool stuff
  get isSubToken() {
    /**
     * Token::isSubToken
     * returns true iff this token is a subToken of some other token
     *
     * @return {Boolean}
     */

    return this.superToken !== null;
  }
  get isSuperToken() {
    /**
     * Token::isSuperToken
     * returns true iff this token has subTokens
     *
     * @return {Boolean}
     */

    return this.analysis ? this.analysis.isSuperToken : null;
  }
  get isEmpty() {
    /**
     * Token::isEmpty
     * returns true iff this token or its superToken is an "empty" token
     *
     * @return {Boolean}
     */

    return this.isSubToken ? this.superToken.token.isEmpty : this._isEmpty;
  }
  get isAmbiguous() {
    /**
     * Token::isAmbiguous
     * return true iff this token has more than one analysis
     *
     * @return {Boolean}
     */

    return this.length > 1;
  }
}

// expose to application
module.exports = Token;
