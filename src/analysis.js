'use strict';

const _ = require('underscore');

const NotatrixError = require('./errors').NotatrixError;

/**
 * convert a string to subscripts (for ele labels)
 *
 * @param {String} str string to be subscripted
 * @return {String}
 */
function toSubscript(str) {
  const subscripts = { 0:'₀', 1:'₁', 2:'₂', 3:'₃', 4:'₄', 5:'₅',
    6:'₆', 7:'₇', 8:'₈', 9:'₉', '-':'₋', '(':'₍', ')':'₎' };

  return str.split('').map((char) => {
    return (subscripts[char] || char);
  }).join('');
}

/**
 * strip whitespace from a string
 *
 * @param {String} str
 * @return {String}
 */
function sanitize(str) {
  return (str || '').replace(/\s/g, '');
}

/**
 * take a string possibly given in enhanced notation and extract the head
 *   and deprel
 *
 * e.g. `2:ccomp|3:nsubj` => `[
 *   { token: 2, deprel: 'ccomp' },
 *   { token: 3, deprel: 'nsubj' } ]`
 *
 * @param {String} str
 * @return {Array} [[Object]]
 */
function parseEnhancedString(str) {

  // strip whitespace in input
  str = sanitize(str);

  // keep our heads here
  let heads = [];

  // iterate over "|"-delimited chunks
  _.each(str.split('|'), head => {
    head = head.split(':');

    // ignore it if we don't parse a head
    if (head[0])
      heads.push({
        token: head[0],
        deprel: head[1]
      });
  });
  return heads;
}

/**
 * automatically add PUNCT pos tags to strings that consist of only punctuation
 *
 * NOTE: only has an effect if sentence-level options help.upostag|help.xpostag
 *   are set to true (default: true)
 *
 * @param {Analysis} ana the analysis to evaluate for
 * @param {String} string
 * @return {undefined}
 */
function evaluatePunctPos(ana, string) {
  if (puncts.test(string)) {
    if (ana.sentence.options.help.upostag && !ana.upostag)
      ana.upostag = 'PUNCT';

    if (ana.sentence.options.help.xpostag && !ana.xpostag)
      ana.xpostag = 'PUNCT';
  }
}

/**
 * helper function for Analysis::cg3 [get] ... actually does the work of
 *   deciding how we want to display the information contained in an analysis
 *
 * @param {Analysis} ana
 * @param {Number} tabs current indent level
 * @return {String}
 */
function cg3FormatOutput(analysis, tabs) {

  let indent = new Array(tabs).fill('\t').join('');
  let tags = analysis.xpostag ? ` ${analysis.xpostag.replace(/;/g, ' ')}` : '';
  let misc = analysis.misc ? ` ${analysis.misc.replace(/;/g, ' ')}` : '';
  let deprel = analysis.deprel ? ` @${analysis.deprel}` : '';
  let id = analysis.id ? ` #${analysis.id}->` : '';
  let head = (id && analysis.head) ? `${analysis.head}` : ``;
  let dependency = analysis.sentence.options.showEmptyDependencies || analysis.head !== fallback
    ? `${id}${head}`
    : ``;

  return `${indent}"${analysis.lemma}"${tags}${misc}${deprel}${dependency}`;
}


// placeholder for CoNLL-U export in `undefined` fields
const fallback = '_';
// setteable fields
const fields = [
  // NB: 'id' is not kept here
  'form',
  'lemma',
  'upostag',
  'xpostag',
  'feats',
  'head',
  'deprel',
  'deps',
  'misc'
];
// supported punctuation characters
const puncts = /[.,!?]/;

/**
 * this class contains all the information associated with an analysis, including
 *   a value for each of form, lemma, upostag, xpostag, feats, head, deprel,
 *   deps, & misc ... also keeps an array of subTokens and an index
 */
class Analysis {
  constructor(token, params) {

    // require token param
    if (!token)
      throw new NotatrixError('missing required arg: Token');

    // used to make sure we only add the head/deps strings on first pass, since
    //   we'll eventually call attach() whenever we're constructing like this
    this.initializing = true;

    // pointers to parents
    this.token = token;
    this.sentence = token.sentence;

    // internal arrays of Analyses
    this._heads = [];
    this._deps = [];

    // iterate over passed params
    _.each(params, (value, key) => {
      if (value === undefined || fields.indexOf(key) === -1) {
        // delete invalid parameters
        delete params[key];
      } else {
        // save valid ones (using our setters defined below)
        this[key] = value;
      }
    });

    // save updated params (mostly for debugging purposes)
    this.params = params || {};

    // internal index (see Sentence::index and Token::index), don't change this!
    this.id = null;

    // array of Tokens
    this.subTokens = [];

    // safe to unset this now
    this.initializing = false;

  }

  /**
   * @return {Number} total number of subTokens for this analysis
   */
  get length() {
    return this.subTokens.length;
  }

  // manipulate subTokens array

  /**
   * get subToken at the given index or null
   *
   * @param {Number} index
   * @return {(null|Token)}
   */
  getSubToken(index) {
    return this.subTokens[index] || null;
  }

  /**
   * insert a subToken BEFORE the given index
   *
   * NOTE: if the index is out of bounds (<0 or >length), then it will be adjusted
   *   to fit the bounds. this means that you can call this with `index=-Infinity`
   *   to push to the front of the subTokens array or with `index=Infinity` to push
   *   to the end
   *
   * @param {Number} index
   * @param {Token} token
   * @return {Analysis}
   *
   * @throws {NotatrixError} if given invalid index or analysis (see below)
   */
  insertSubTokenAt(index, token) {

    // enforce only indices that can be cast as Numbers
    index = parseFloat(index); // catch Infinity
    if (isNaN(index))
      throw new NotatrixError('unable to insert subToken: unable to cast index to int');

    // enforce token is a Token
    if (!token)
      throw new NotatrixError('unable to insert subToken: no subToken provided');

    // enforce token is a Token
    if (token.__proto__ !== this.token.__proto__) // hacky, but don't have access to Token class
      throw new NotatrixError('unable to insert subToken: not instance of Token');

    // enforce not trying to add a superToken as a subToken
    if (token.isSuperToken)
      throw new NotatrixError('unable to insert subToken: token has subTokens');

    // enforce not trying to add a subToken of some other token
    if (token.isSubToken)
      throw new NotatrixError('unable to insert subToken: token is already a subToken')

    // enforce not trying to add a subToken to a subToken
    if (this.isSubToken)
      throw new NotatrixError('unable to insert subToken: this is already a subToken');

    // bounds checking
    index = index < 0 ? 0
      : index > this.length ? this.length
      : parseInt(index);

    // set the superToken pointer on the token
    token.superToken = this;

    // array insertion
    this.subTokens = this.subTokens.slice(0, index)
      .concat(token)
      .concat(this.subTokens.slice(index));

    // chaining
    return this;
  }

  /**
   * remove a subToken at the given index
   *
   * NOTE: if the index is out of bounds (<0 or >length - 1), then it will be
   *   adjusted to fit the bounds. this means that you can call this with
   *   `index=-Infinity` to remove the first element of the subTokens array or
   *   with `index=Infinity` to remove the last
   *
   * @param {Number} index
   * @return {(null|Token)}
   *
   * @throws {NotatrixError} if given invalid index
   */
  removeSubTokenAt(index) {

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

    // remove the superToken pointer from the removed token
    this.subTokens[index].superToken = null;

    // array splicing, return spliced element
    return this.subTokens.splice(index, 1)[0];
  }

  /**
   * move a subToken from sourceIndex to targetIndex
   *
   * NOTE: if either index is out of bounds (<0 or >length - 1), then it will
   *   be adjusted to fit the bounds. this means that you can call this with
   *   `sourceIndex=-Infinity` to select the first element of the subTokens array
   *   or with `sourceIndex=Infinity` to select the last
   *
   * @param {Number} sourceIndex
   * @param {Number} targetIndex
   * @return {Analysis}
   *
   * @throws {NotatrixError} if given invalid sourceIndex or targetIndex
   */
  moveSubTokenAt(sourceIndex, targetIndex) {

    sourceIndex = parseFloat(sourceIndex);
    targetIndex = parseFloat(targetIndex);
    if (isNaN(sourceIndex) || isNaN(targetIndex))
      throw new NotatrixError('unable to move subToken: unable to cast indices to ints');

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
      let subToken = this.subTokens.splice(sourceIndex, 1);
      this.subTokens = this.subTokens.slice(0, targetIndex)
        .concat(subToken)
        .concat(this.subTokens.slice(targetIndex));

    }

    // chaining
    return this;
  }

  /**
   * push a subToken to the end of the subTokens array ... sugar for
   *   Analysis::insertSubTokenAt(Infinity, analysis)
   *
   * @param {Token} token
   * @return {Analysis}
   */
  pushSubToken(token) {
    return this.insertSubTokenAt(Infinity, token);
  }

  /**
   * pop a subToken from the end of the subTokens array ... sugar for
   *   Analysis::removeSubTokenAt(Infinity)
   *
   * @return {(null|Analysis)}
   */
  popSubToken() {
    return this.removeSubTokenAt(Infinity);
  }

  // external formats

  /**
   * get a serial version of the internal analysis representation
   *
   * @return {Object}
   */
  get nx() {

    // serialize "values" (getter/setter version of fields)
    let values = {};
    _.each(fields, field => {
      values[field] = this[field];
    });

    // serialize other data
    return {
      id: this.id,
      num: this.num,
      params: this.params,
      values: values,
      subTokens: this.subTokens.map(subToken => {
        return subToken.nx;
      })
    };

  }

  /**
   * get a plain-text formatted string of the analysis
   *
   * @return {String}
   */
  get text() {

    // first check if we have a form
    if (this.form && this.form !== fallback)
      return this.form;

    // fall back to using lemma
    if (this.lemma && this.lemma !== fallback)
      return this.lemma;

    // if set, fall back to our fallback (defined above)
    if (this.sentence.fallbackOnText)
      return fallback;

    // otherwise just give an empty string
    return '';
  }

  /**
   * get a CoNLL-U formatted string representing the analysis
   *
   * @return {String}
   *
   * @throws {NotatrixError} if id has not been set
   */
  get conllu() {

    // reindex just in case since this is crucial
    this.sentence.index();

    // we can't output CoNLL-U for analyses that aren't indexed, since that
    //   means they're not in the current analysis
    if (this.id === null || this.id === undefined)
      throw new NotatrixError('analysis is not currently indexed');

    // return a tab-delimited string with the information contained in each field
    //   and the index out front
    return `${this.id}\t${
      _.map(fields, field => {

        // if we have no data for a field, use our fallback to maintain
        //   the correct matrix structure
        return this[field] || fallback;

      }).join('\t')
    }`;
  }

  /**
   * get a CG3 formatted string representing the analysis
   *
   * @return {String}
   */
  get cg3() {

    // reindex just in case since this is crucial
    this.sentence.index();

    // either output this analysis or its subTokens
    if (this.isSuperToken) {
      return this.subTokens.map((subToken, i) => {

        // recall subTokens get hanging indents
        return cg3FormatOutput(subToken.analysis, i + 1);

      }).join('\n');
    } else {

      // regular tokens get an index of 1
      return cg3FormatOutput(this, 1);

    }
  }

  /**
   * get an array of nodes relating to this analysis for export to an external
   *   graphing library (e.g. Cytoscape, D3)
   *
   * @return {Array}
   */
  get eles() {
    let eles = [];

    if (this.isCurrent) {

      if (this.isSuperToken) {

        eles.push({ // multiword label
          data: {
            id: `multiword-${this.id}`,
            num: this.num,
            name: `multiword`,
            label: `${this.form} ${toSubscript(this.id)}`,
            /*length: `${this.form.length > 3
              ? this.form.length * 0.7
              : this.form.length}em`*/
          },
          classes: 'multiword'
        }/*, {

        } */);

        _.each(this.subTokens, subToken => {
          eles = eles.concat(subToken.eles);
        });

      } else {

        eles.push({ // "number" node
          data: {
            id: `num-${this.id}`,
            num: this.num,
            name: 'number',
            label: this.id,
            pos: this.pos,
            parent: this.superToken ? `multiword-${this.superToken.id}` : undefined,
            analysis: this
          },
          classes: 'number'
        }, { // "form" node
          data: {
            id: `form-${this.id}`,
            num: this.num,
            name: `form`,
            attr: `form`,
            form: this.form,
            label: this.form,
            length: `${this.form.length > 3
              ? this.form.length * 0.7
              : this.form.length}em`,
            state: `normal`,
            parent: `num-${this.id}`,
            analysis: this
          },
          classes: `form${this.head == 0 ? ' root' : ''}`
        }, { // "pos" node
          data: {
            id: `pos-node-${this.id}`,
            num: this.num,
            name: `pos-node`,
            attr: `upostag`,
            label: this.pos || '',
            length: `${(this.pos || '').length * 0.7 + 1}em`,
            analysis: this
          },
          classes: 'pos'
        }, { // "pos" edge
          data: {
            id: `pos-edge-${this.id}`,
            num: this.num,
            name: `pos-edge`,
            source: `form-${this.id}`,
            target: `pos-node-${this.id}`
          },
          classes: 'pos'
        });

        this.eachHead((head, deprel) => {
          deprel = deprel || '';

          if (!head || !head.id) // ROOT
            return;

          eles.push({
            data: {
              id: `dep_${this.id}_${head.id}`,
              name: `dependency`,
              attr: `deprel`,
              source: `form-${this.id}`,
              sourceAnalysis: this,
              target: `form-${head.id}`,
              targetAnalysis: head,
              length: `${deprel.length / 3}em`,
              label: null, // NB overwrite this before use
              ctrl: null   // NB overwrite this before use
            },
            classes: null  // NB overwrite this before use
          });

        });
      }
    }

    return eles;
  }

  // array-field (heads & deps) manipulators

  /**
   * iterate over the `head`s for this analysis and apply a callback to each
   *
   * @param {Function} callback
   * @return {Analysis}
   */
  eachHead(callback) {
    _.each(this._heads, (head, i) => {
      callback(head.token, head.deprel, i);
    });

    // chaining
    return this;
  }

  /**
   * add a head on the given token with a dependency relation
   *
   * @param {Analysis} head pointer directly to the analysis
   * @param {String} deprel
   * @return {Analysis}
   */
  addHead(head, deprel) {
    if (!(head instanceof Analysis))
      throw new NotatrixError('can\'t add head: not Analysis instance');

    // first try to change an existing one (don't want duplicate heads)
    if (this.changeHead(head, deprel))
      return this;

    // get rid of "empty" value
    if (this._heads.length === 1 && this._heads[0].token === '_')
      this._heads = [];

    // otherwise push a new one
    this._heads.push({
      token: head,
      deprel: deprel
    });

    // if applicable, add to the head's deps field too
    if (this.sentence.options.help.head)
      head._deps.push({
        token: this,
        deprel: deprel
      });

    // chaining
    return this;
  }

  /**
   * remove a head from the given analysis if it exists
   *
   * @param {Analysis} head
   * @return {Analysis}
   */
  removeHead(head) {
    if (!(head instanceof Analysis))
      throw new NotatrixError('can\'t remove head: not Analysis instance');

    // remove from _heads
    let removing = -1;
    this.eachHead((token, deprel, i) => {
      if (token === head)
        removing = i;
    });
    if (removing > -1)
      this._heads.splice(removing, 1);

    // if applicable, also remove from head's _deps
    removing = -1
    if (this.sentence.options.help.head)
      head.eachDep((token, deprel, i) => {
        if (token === this)
          removing = i;
      });
    if (removing > -1)
      head._deps.splice(removing, 1);

    // chaining
    return this;
  }

  /**
   * change the dependency relation for a given head ... returns null if unable
   *   to make the change
   *
   * @param {Analysis} head
   * @param {String} deprel
   * @return {(Analysis|null)}
   */
  changeHead(head, deprel) {
    if (!(head instanceof Analysis))
      throw new NotatrixError('can\'t change head: not Analysis instance');

    // change for this head
    let done = false;
    this.eachHead((token, _deprel, i) => {
      if (token === head) {
        this._heads[i].deprel = deprel || _deprel;
        done = true;
      }
    });

    // if applicable, change for the head's dep too
    if (this.sentence.options.help.head)
      head.eachDep((token, _deprel, i) => {
        if (token === this)
          head._deps[i].deprel = deprel || _deprel;
      });

    return done ? this : null;
  }

  /**
   * iterate over the `deps`s for this analysis and apply a callback to each
   *
   * @param {Function} callback
   * @return {Analysis}
   */
  eachDep(callback) {
    _.each(this._deps, (dep, i) => {
      callback(dep.token, dep.deprel, i);
    });

    // chaining
    return this;
  }

  /**
   * add a dep on the given token with a dependency relation
   *
   * @param {Analysis} dep pointer directly to the analysis
   * @param {String} deprel
   * @return {Analysis}
   */
  addDep(dep, deprel) {
    if (!(dep instanceof Analysis))
      throw new NotatrixError('can\'t add dep: not Analysis instance');

    // first try to change an existing one (don't want duplicate deps)
    if (this.changeDep(dep, deprel))
      return this;

    // get rid of "empty" value
    if (this._deps.length === 1 && this._deps[0].token === '_')
      this._deps = [];

    // otherwise push a new one
    this._deps.push({
      token: dep,
      deprel: deprel
    });

    // if applicable, add to the dep's head field too
    if (this.sentence.options.help.deps)
      dep._heads.push({
        token: this,
        deprel: deprel
      });

    // chaining
    return this;
  }

  /**
   * remove a dep from the given analysis if it exists
   *
   * @param {Analysis} dep
   * @return {Analysis}
   */
  removeDep(dep) {
    if (!(dep instanceof Analysis))
      throw new NotatrixError('can\'t remove dep: not Analysis instance');

    // remove from _deps
    let removing = -1;
    this.eachDep((token, deprel, i) => {
      if (token === dep)
        removing = i;
    });
    if (removing > -1)
      this._deps.splice(removing, 1);

    // if applicable, also remove from dep's _heads
    removing = -1
    if (this.sentence.options.help.deps)
      dep.eachHead((token, deprel, i) => {
        if (token === this)
          removing = i;
      });
    if (removing > -1)
      dep._heads.splice(removing, 1);

    // chaining
    return this;
  }

  /**
   * change the dependency relation for a given dep ... returns null if unable
   *   to make the change
   *
   * @param {Analysis} dep
   * @param {String} deprel
   * @return {(Analysis|null)}
   */
  changeDep(dep, deprel) {
    if (!(dep instanceof Analysis))
      throw new NotatrixError('can\'t change dep: not Analysis instance');

    // change for this dep
    let done = false;
    this.eachDep((token, _deprel, i) => {
      if (token === dep) {
        this._deps[i].deprel = deprel || _deprel;
        done = true;
      }
    });

    // if applicable, change for the dep's head too
    if (this.sentence.options.help.deps)
      dep.eachHead((token, _deprel, i) => {
        if (token === this)
          dep._heads[i].deprel = deprel || _deprel;
      });

    return done ? this : null;
  }

  // field getters and setters

  /**
   * get the `form` ... if none defined, `help.form` setting `= true` (default:
   *   `true`), and `lemma` is set, return `lemma` instead
   *
   * @return {(String|undefined)}
   */
  get form() {
    return this.sentence.options.help.form
      ? this._form || this._lemma
      : this._form;
  }

  /**
   * set the `form` ... if the form is just punctuation, possibly set the pos tags
   *   to `PUNCT` (see {@link evaluatePunctPos})
   *
   * @return {undefined}
   */
  set form(form) {
    form = sanitize(form);
    evaluatePunctPos(this, form);
    this._form = form;
  }

  /**
   * get the `lemma` ... if none defined, `help.lemma` setting `= true` (default:
   *   `true`), and `form` is set, return `form` instead
   *
   * @return {(String|undefined)}
   */
  get lemma() {
    return this.sentence.options.help.lemma
      ? this._lemma || this._form
      : this._lemma;
  }

  /**
   * set the `lemma` ... if the lemma is just punctuation, possibly set the pos tags
   *   to `PUNCT` (see {@link evaluatePunctPos})
   *
   * @return {undefined}
   */
  set lemma(lemma) {
    lemma = sanitize(lemma);
    evaluatePunctPos(this, lemma);
    this._lemma = lemma;
  }

  /**
   * get the `pos`, which is just `upostag || xpostag`
   *
   * @return {(String|undefined)}
   */
  get pos() {
    return this.upostag || this.xpostag;
  }

  /**
   * get the `upostag`
   *
   * @return {(String|undefined)}
   */
  get upostag() {
    return this._upostag;
  }

  /**
   * set the `upostag`
   *
   * @return {undefined}
   */
  set upostag(upostag) {
    this._upostag = sanitize(upostag);
  }

  /**
   * get the `xpostag`
   *
   * @return {(String|undefined)}
   */
  get xpostag() {
    return this._xpostag;
  }

  /**
   * set the `xpostag`
   *
   * @return {undefined}
   */
  set xpostag(xpostag) {
    this._xpostag = sanitize(xpostag);
  }

  /**
   * get the `feats`
   *
   * @return {(String|undefined)}
   */
  get feats() {
    return this._feats;
  }

  /**
   * set the `feats`
   *
   * @return {undefined}
   */
  set feats(feats) {
    this._feats = sanitize(feats);
  }

  /**
   * get the `head` ... if the `showEnhanced` setting `= true` (default: `true`)
   *   will return a `|`-delimited list of `index`:`deprel` pairs
   *
   * @return {(String)}
   */
  get head() {
    if (this.sentence.options.showEnhanced) {
      let heads = [];
      this.eachHead((token, deprel) => {
        if (token === this.sentence.getById(token.id) || !this.sentence.options.help.head) {
          heads.push(`${token.id || token}${deprel ? `:${deprel}` : ''}`);
        } else {
          heads.push(`${token}${deprel ? `:${deprel}` : ''}`);
        }
      });
      return heads.join('|') || fallback;

    } else {
      return this._heads.length
        ? this._heads[0].id || this._heads[0]
        : fallback;
    }
  }

  /**
   * set the `head` ... if the `Analysis` is `initializing`, just save a plain
   *   string, otherwise try to get the head by index (see {@link Sentence#getById})
   *
   * @return {undefined}
   */
  set head(heads) {
    if (typeof heads === 'string')
      heads = parseEnhancedString(heads);

    this._heads = heads.map(head => {
      return this.initializing
        ? {
            token: head.token,
            deprel: head.deprel
          }
        : {
            token: this.sentence.getById(head.token) || head.token,
            deprel: head.deprel
          };
    }).filter(head => {
      if (head.token !== fallback)
        return head;
    });
  }

  /**
   * get the `deprel`
   *
   * @return {(String|undefined)}
   */
  get deprel() {
    return this._deprel;
  }

  /**
   * set the `deprel`
   *
   * @return {undefined}
   */
  set deprel(deprel) {
    this._deprel = sanitize(deprel);
  }

  /**
   * get the `deps` returns a `|`-delimited list of `index`:`deprel` pairs
   *
   * @return {(String)}
   */
  get deps() {
    // don't worry about enhanced stuff for deps (always can be multiple)
    let deps = [];
    this.eachDep((token, deprel) => {
      if (token === this.sentence.getById(token.id) || !this.sentence.options.help.deps) {
        deps.push(`${token.id || token}${deprel ? `:${deprel}` : ''}`);
      } else {
        deps.push(`${token}${deprel ? `:${deprel}` : ''}`);
      }
    });
    return deps.join('|') || fallback;
  }

  /**
   * set the `deps` ... if the `Analysis` is `initializing`, just save a plain
   *   string, otherwise try to get the dep by index (see {@link Sentence#getById})
   *
   * @return {undefined}
   */
  set deps(deps) {
    if (typeof deps === 'string')
      deps = parseEnhancedString(deps);

    this._deps = deps.map(dep => {
      return this.initializing
        ? {
            token: dep.token,
            deprel: dep.deprel
          }
        : {
            token: this.sentence.getById(dep.token) || dep.token,
            deprel: dep.deprel
          };
    }).filter(dep => {
      if (dep.token !== fallback)
        return dep;
    });
  }

  /**
   * get the `misc`
   *
   * @return {(String|undefined)}
   */
  get misc() {
    return this._misc;
  }

  /**
   * set the `misc`
   *
   * @return {undefined}
   */
  set misc(misc) {
    this._misc = sanitize(misc);
  }

  // bool stuff

  /**
   * returns this analysis's superToken if it exists
   *
   * @return {(Token|null)}
   */
  get superToken() {
    return this.token.superToken;
  }

  /**
   * returns true iff this analysis is a subToken of some other token
   *
   * @return {Boolean}
   */
  get isSubToken() {
    return this.superToken !== null;
  }

  /**
   * returns true iff this analysis has subTokens
   *
   * @return {Boolean}
   */
  get isSuperToken() {
    return this.subTokens.length > 0;
  }

  /**
   * returns true iff this analysis is the current analysis
   *
   * @return {Boolean}
   */
  get isCurrent() {
    return this.token.analysis === this;
  }
}

/**
 * Proxy so that we can get subTokens using Array-like syntax
 *
 * NOTE: usage: `ana[8]` would return the analysis of the subToken at index 8
 * NOTE: if `name` is not a Number, fall through to normal object
 *
 * @return {Mixed}
 * @name Analysis#get
 */
Analysis.prototype.__proto__ = new Proxy(Analysis.prototype.__proto__, {

  // default getter, called any time we use Analysis.name or Analysis[name]
  get(target, name, receiver) {

    // Symbols can't be cast to floats, so check here to avoid errors
    if (typeof name === 'symbol')
      return this[name];

    // cast, catch Infinity
    let id = parseFloat(name);
    if (!isNaN(id)) {

      // if we got a number, return analysis of subToken at that index
      id = parseInt(id);
      let token = receiver.subTokens[id];
      return token ? token.analysis : null;

    } else {

      // fall through to normal getting
      return this[name];

    }
  }
});

// expose to application
module.exports = Analysis;
