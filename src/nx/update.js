'use strict';

const _ = require('underscore');

const utils = require('../utils');
const SentenceError = utils.SentenceError;
const formats = require('../formats');
const detect = require('../detector');

function debug(show, ...args) {
  if (show)
    console.log('d>', ...args);
}

function compareFields(fields, t1, t2, maxDistance) {
  debug(false, `comparing fields at maxDistance: ${maxDistance}`);


  /*
  const compare = field => {
    debug(false, `comparing "${field}" (${t1[field]}, ${t2[field]})`);

    if (field === 'analyses' && (t1._analyses || t2._analyses)) {

      console.log('analyses', t1.analyses === t2.analyses, t1._analyses);

    } else if (field === 'head') {

      let unmatched = {
        old: new Set(),
        new: new Set(),
      };
      let matched = {
        old: new Set(),
        new: new Set(),
      };
      t1.mapHeads((h1, d1) => {
        t2.mapHeads((h2, d2) => {

        });
      });

      console.log('head', t1._heads.toString('serial', 'dep'), t2._heads.toString('serial', 'dep'));

    } else if (field === 'deps') {

      console.log('deps', t1._deps.toString('serial', 'dep'), t2._deps.toString('serial', 'dep'));

    } else if (t1[field] !== t2[field]) {
      if (field === 'analyses') {

        console.log(t1.analyses, t2.analyses)

      }
      //console.log(field, t1.indices.absolute, t2.indices.absolute)
      distance += 1;
    }
  }
  */

  var distance = 0;

  fields = fields.filter(field => t1[field] !== undefined);
  const combinations = utils.combine(fields, fields.length - maxDistance);

  [].forEach(combination => {

  });

  return distance;

  console.log(fields, utils.combine(fields, fields.length - maxDistance));

  const h1 = t1.hashFields(fields, 'indices'),
    h2 = t2.hashFields(fields, 'indices');

  if (h1 === h2)
    return true;

  console.log();
  console.log('h1', h1);
  console.log('h2', h2);
  console.log();
  return false;

  debug(false, `distance: ${distance}`)
  return distance <= maxDistance;
}

function compareIndices(_arg, t1, t2, maxDistance) {
  debug(false, `comparing fields at maxDistance: ${maxDistance}`);

  let distance = 0;
  ['conllu', 'cg3', 'cytoscape', 'absolute'].forEach(indexName => {

    debug(false, `comparing "${indexName}" (${t1.indices[indexName]}, ${t2.indices[indexName]})`);
    if (t1.indices[indexName] !== t2.indices[indexName])
      distance += 1;

  });

  debug(false, `distance: ${distance}`)
  return distance <= maxDistance;
}

function updateToken(fields, t1, t2) {
  debug(false, `updating`);

  fields.forEach(field => {
    debug(false, `trying to update "${field}"`);

    switch (field) {
      case ('subTokens'):
        if (t1.subTokens.length || t2.subTokens.length) {
          throw new Error('not implemented');
        } else {
          // pass
        }
        break;

      default:
        debug(false, `updating (${t1[field]} => ${t2[field]})`);
        t1[field] = t2[field];
    }
  });
}




























function getDistance(fields, t1, t2) {

  fields = fields.filter(field => t1[field] !== undefined);
  for (let dist=0; dist<fields.length; dist++) {

    let match = false;
    utils.combine(fields, fields.length - dist).forEach(comb => {

      const hash1 = t1.hashFields(comb),
        hash2 = t2.hashFields(comb);

      if (hash1 === hash2)
        match = true;
    });

    if (match)
      return dist;
  }
  return Infinity;
}

function getMatches(s, t, ...fields) {

  fields = _.flatten(fields);

  let s_unmatched = new Set();
  let t_unmatched = new Set();

  // build distances between nodes
  let rawDistances = {};
  s.forEach(t1 => {

    const i1 = t1.indices.absolute;
    rawDistances[i1] = {};
    s_unmatched.add(`${i1}`);

    t.forEach(t2 => {

      const i2 = t2.indices.absolute;
      rawDistances[i1][i2] = getDistance(fields, t1, t2);
      t_unmatched.add(`${i2}`);

    });
  });

  //console.log(rawDistances);

  let neighbors = {};
  _.each(rawDistances, (targets, source) => {

    neighbors[source] = [];

    let min = Infinity;
    _.each(targets, distance => {
      min = Math.min(distance, min);
    });
    if (min < Infinity)
      _.each(targets, (distance, target) => {
        if (distance === min)
          neighbors[source].push(target);
      });

  });

  //console.log(neighbors);

  const lookup = (prefix, index) => key[`${prefix}_${index}`];

  let matches = new Set();

  _.each(neighbors, (neighbors, index) => {
    if (neighbors.length === 1) {

      matches.add([`${index}`, `${neighbors[0]}`]);
      s_unmatched.delete(`${index}`);
      t_unmatched.delete(`${neighbors[0]}`);

    }
  });

  return {
    matches,
    s_unmatched,
    t_unmatched,
  };
}

function updateMatches(s_key, t_key, matches, fields) {

  matches.forEach(match => {

    const s_token = s_key[match[0]];
    const t_token = t_key[match[1]];
    //console.log('updating', match[0], match[1]);

    fields.forEach(field => {

      switch (field) {
        case ('analyses'):

          //console.log('begin analyses evaluations');
          if (s_token._analyses === undefined || t_token.analyses === undefined)
            break;

          let s_analyses = s_token._analyses.slice();
          let t_analyses = t_token._analyses.slice();

          for (let i = 0; i<s_analyses.length; i++)
            matchAndUpdate(
              s_key,
              s_analyses[i]._subTokens,
              t_key,
              t_analyses[i]._subTokens,
              fields);
          //console.log('end anlyses evaluations');

          break;

        case ('subTokens'):

          //console.log('begin subToken evaluations');
          if (s_token._analyses === undefined || t_token.analyses === undefined)
            break;

          let s = s_token.subTokens.slice();
          let t = t_token.subTokens.slice();
          matchAndUpdate(s_key, s, t_key, t, fields);
          //console.log('end subToken evaluations');

          break;

        default:
          //if (s_token[field] !== t_token[field])
            //console.log('change!!!', field, s_token[field], t_token[field]);
          s_token[field] = t_token[field];
      }
    });
  });
}

function matchAndUpdate(s_key, s, t_key, t, fields) {

  //console.log('matching on fields');
  let m = getMatches(s, t, fields);
  //console.log(m);
  updateMatches(s_key, t_key, m.matches, fields);

  if (m.s_unmatched.size || m.t_unmatched.size) {

    let s = [], t = [];

    m.s_unmatched.forEach(i => s.push(s_key[i]));
    m.t_unmatched.forEach(i => t.push(t_key[i]));

    //console.log('matching on fields and indices')
    const m2 = getMatches(s, t, fields, 'indices');
    //console.log(m2);
    updateMatches(s_key, t_key, m2.matches, fields);

    if (m2.s_unmatched.size || m2.t_unmatched.size) {

      throw new Error('unable to find match')

    }
  }
}

module.exports = (original, update, options) => {

  debug(false, 'original input:', original.input);
  debug(false, 'update input:', update.input);

  // the input format of the new guy
  let format = detect(update.input, _.extend({
    requireOneFormat: true,
  }, options));
  debug(false, 'detected update as format:', format);
  format = formats[format];

  /*
  let unmatched = {
    old: new Set(),
    new: new Set(),
  };
  let matched = {
    old: new Set(),
    new: new Set(),
  };
  */

  if (format.hasComments) {
    debug(false, '\n\ncomparing comments\n');
    let i = 0, j = 0;
    while (data.comments.new.unmatched.size) {

      throw new Error('not implemented');

      /*
      const s1Comment = this.comments[i];
      const s2Comment = sent.comments[i];

      if (commentsEqual(s1Comment, s2Comment)) {
        throw new Error('not implemented')
      } else {
        throw new Error('not implemented')
      }
      */
    }
  } else {
    debug(false, 'using original comments');
    // don't change anything
  }









  // build a hash table and a list of tokens for each sentence
  let s_key = {}, s = [], t_key = {}, t = [];

  original.iterate(token => {

    s_key[token.indices.absolute] = token;
    s.push(token);

  });
  update.iterate(token => {

    t_key[token.indices.absolute] = token;
    t.push(token)

  });

  // try to find matches between the items
  matchAndUpdate(s_key, s, t_key, t, format.fields);

  return;















  const iterate = (predicate, dist) => {
    debug(true, 'iterating at distance', dist);

    original.iterate(t1 => {
      update.iterate(t2 => {

        if (!matched.old.has(t1) && !matched.new.has(t2))
          if (predicate(format.fields, t1, t2, dist)) {

            debug(false, 'same', t1.form, t2.form);
            matched.old.add(t1);
            matched.new.add(t2);
            unmatched.old.delete(t1);
            unmatched.new.delete(t2);
            updateToken(format.fields, t1, t2);

          } else {

            debug(false, 'different', t1.form, t2.form);
            unmatched.old.add(t1);
            unmatched.new.add(t2);

          }

      });
    });
  };

  debug(false, )
  debug(true, `comparing tokens on fields to find exact matches`);
  iterate(compareFields, 0);

  if (!unmatched.old.size && !unmatched.new.size)
    return;

  debug(false, )
  debug(true, `comparing tokens on fields to find close matches`);
  for (let i=1; i<format.fields.length; i++) {

    iterate(compareFields, i);
    if (!unmatched.old.size && !unmatched.new.size)
      return;

  }

  unmatched.old.forEach(e => debug(true, e.indices));
  unmatched.new.forEach(e => debug(true, e.indices));

  debug(false, )
  debug(true, `comparing tokens on indices to find close matches`);
  for (let i=0; i<4; i++) {

    iterate(compareIndices, i);
    if (!unmatched.old.size && !unmatched.new.size)
      return;

  }

  debug(true, unmatched);
  throw new Error('can\'t find a match');
};

  /*

  let distance = 0;
  while (data.tokens.new.unmatched.size) {
    debug()
    debug(`\tevaluating at maxDistance: ${distance}`);
    debug()

    for (let i=0; i<data.old.tokens.length; i++) {
      for (let j=0; j<data.new.tokens.length; j++) {

        if (data.tokens.old.unmatched.has(i) && data.tokens.new.unmatched.has(j))
          if (compareFields(data, i, j, distance)) {
            debug('same');

            data.tokens.old.unmatched.delete(i);
            data.tokens.old.matched.add(i);
            data.tokens.new.unmatched.delete(j);
            data.tokens.new.matched.add(j);

            updateToken(data, i, j);

          } else {
            debug('different');
          }

      }
    }

    distance++;
  }

  return data;
};


/*


// some helper functions

function commentsEqual(c1, c2) {
  throw new Error('not implemented');
}

function tokensIdentical(t1, t2) {

  let matches = 0,
    mismatches = 0;

  newFormat.fields.forEach(field => {

    debug(`comparing "${field}" (1: "${t1[field]}", 2: "${t2[field]}")`);
    if (t1[field] === t2[field]) {
      matches += 1;
    } else {
      mismatches += 1;
    }
  });

  debug(matches, mismatches);

  if (matches > 0 && mismatches === 0) {
    debug('tokens equal')
    return true;
  }
}

function updateToken(t1, t2) {
  newFormat.fields.forEach(field => {
    debug(`updating "${field}" : "${t1[field]}" => "${t2[field]}"`)
    t1[field] = t2[field];
  });
}


// the new guy

const numComments = Math.max(this.comments.length, sent.comments.length);
if (newFormat.hasComments) {
  debug('comparing comments');
  for (let i=0; i<numTokens; i++) {
    const s1Comment = this.comments[i];
    const s2Comment = sent.comments[i];

    if (commentsEqual(s1Comment, s2Comment)) {
      throw new Error('not implemented')
    } else {
      throw new Error('not implemented')
    }
  }
} else {
  debug('using original comments');
  // don't change anything
}

debug('comparing tokens');
const numTokens = Math.max(this.tokens.length, sent.tokens.length);
let i1 = 0,
  oldMatches = new Set();
  i2 = 0,
  newMatches = new Set();

while (i1 < numTokens && i2 < numTokens) {

  const t1 = this.tokens[i1];
  const t2 = sent.tokens[i2];

  if (tokensIdentical(t1, t2)) {

    debug(`updating (${i1}, ${i2})`);
    oldMatches.add(i1);
    newMatches.add(i2);
    updateToken(t1, t2);

  } else {



  }

  i1++;
  i2++;
}


*/
