'use strict';

const DetectorError = require('../errors').DetectorError;

const _ = require('underscore');
const re = require('../utils/regex');
const funcs = require('../utils/funcs');
const fields = require('../utils/constants').fields;

module.exports = (text, options) => {

  function isParam(obj) {

    const omitted = _.omit(obj, fields);
    if (Object.keys(omitted).length)
      throw new DetectorError(`Illegal Params: contains illegal keys`, text, options);

    const picked = _.pick(obj, fields);
    if (!Object.keys(picked).length)
      throw new DetectorError(`Illegal Params: missing required keys`, text, options);

    return true;
  }

  options = _.defaults(options, {
    allowEmptyList: false,
    allowTrailingWhitespace: true,
    allowLeadingWhitespace: true
  });

  if (!funcs.isJSONSerializable(text))
    throw new DetectorError(`Illegal Params: not JSON object`, text, options);

  const obj = typeof text === 'string' ? JSON.parse(text) : text;

  if (Array.isArray(obj)) {

    if (!obj.length && !options.allowEmptyList)
      throw new DetectorError(`Illegal Params: contains no tokens`, text, options);

    obj.forEach(isParam);

  } else {

    isParam(obj);

  }

  return 'Params';
};
