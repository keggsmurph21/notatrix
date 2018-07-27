'use strict';

const _ = require('underscore');
const re = require('../utils/regex');
const funcs = require('../utils/funcs');
const fields = require('../utils/constants').fields;

function isParam(obj) {

  const omitted = _.omit(obj, fields);
  if (Object.keys(omitted).length)
    return false;

  const picked = _.pick(obj, fields);
  if (!Object.keys(picked).length)
    return false;

  return true;
}

module.exports = (text, options) => {

  options = _.defaults(options, {
    allowEmptyList: false,
    allowTrailingWhitespace: true,
    allowLeadingWhitespace: true
  });

  if (!funcs.isPlainObjOrStringified(text))
    return undefined;

  const obj = typeof text === 'string' ? JSON.parse(text) : text;

  let isParams = true;

  if (Array.isArray(obj)) {

    if (!obj.length && !options.allowEmptyList)
      isParams = false;

    obj.forEach(param => {
      if (!isParam(param))
        isParams = false;
    });

  } else {

    isParams = isParam(obj);

  }

  return isParams ? 'Params' : undefined;
};
