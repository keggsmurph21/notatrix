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



class SplitterError extends NotatrixError {
  constructor(message, text, options) {
    super(message);

    this.text = text;
    this.options = options;
  }
}

class DetectorError extends NotatrixError {
  constructor(message, text, options) {
    super(message);

    this.text = text;
    this.options = options;
  }
}


module.exports = {

  NotatrixError,
  InvalidCG3Error,
  InvalidCoNLLUError,
  SplitterError,
  DetectorError,

};
