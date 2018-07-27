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

    this.name = 'SplitterError';
    this.text = text;
    this.options = options;
  }
}

class DetectorError extends NotatrixError {
  constructor(message, text, options) {
    super(message);

    this.name = 'DetectorError';
    this.text = text;
    this.options = options;
  }
}

class ParserError extends NotatrixError {
  constructor(message, text, options) {
    super(message);

    this.name = 'ParserError';
    this.text = text;
    this.options = options;
  }
}

class GeneratorError extends NotatrixError {
  constructor(message, nx, options) {
    super(message);

    this.name = 'GeneratorError';
    this.nx = nx;
    this.options = options;
  }
}

module.exports = {

  NotatrixError,
  InvalidCG3Error,
  InvalidCoNLLUError,
  SplitterError,
  DetectorError,
  ParserError,
  GeneratorError,

};
