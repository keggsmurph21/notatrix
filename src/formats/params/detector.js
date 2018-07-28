'use strict';

const _ = require('underscore');

const utils = require('../../utils');
const DetectorError = utils.DetectorError;

module.exports = (text, options) => {

  function isParam(obj) {

    const omitted = Object.keys(_.omit(obj, utils.fields));
    if (omitted.length)
      throw new DetectorError(`Illegal Params: contains illegal keys (${omitted.join(', ')})`, text, options);

    const picked = Object.keys(_.pick(obj, utils.fields));
    if (!picked.length)
      throw new DetectorError(`Illegal Params: missing required keys`, text, options);

    return true;
  }

  options = _.defaults(options, {
    allowEmptyList: false,
    allowTrailingWhitespace: true,
    allowLeadingWhitespace: true
  });

  if (!utils.isJSONSerializable(text))
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
