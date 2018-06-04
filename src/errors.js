'use strict';

class NotatrixError extends Error {
  constructor(...args) {
    super(...args);
  }
}

class InvalidCG3Error extends NotatrixError {
  constructor(...args) {
    super(...args);
  }
}

class InvalidCoNLLUError extends NotatrixError {
  constructor(...args) {
    super(...args);
  }
}

class TransformationError extends NotatrixError {
  constructor(...args) {
    super(...args);
  }
}


module.exports = {

  NotatrixError: NotatrixError,
  InvalidCG3Error: InvalidCG3Error,
  InvalidCoNLLUError: InvalidCoNLLUError,
  TransformationError: TransformationError

};
