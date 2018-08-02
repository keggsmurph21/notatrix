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


class ToolError extends NotatrixError {
  constructor(...args) {
    super(...args);
  }
}

class SplitterError extends ToolError {
  constructor(message, text, options) {
    super(message);

    this.name = 'SplitterError';
    this.text = text;
    this.options = options;
  }
}

class DetectorError extends ToolError {
  constructor(message, text, options) {
    super(message);

    this.name = 'DetectorError';
    this.text = text;
    this.options = options;
  }
}

class ParserError extends ToolError {
  constructor(message, text, options) {
    super(message);

    this.name = 'ParserError';
    this.text = text;
    this.options = options;
  }
}

class GeneratorError extends ToolError {
  constructor(message, nx, options) {
    super(message);

    this.name = 'GeneratorError';
    this.nx = nx;
    this.options = options;
  }
}

class ConverterError extends ToolError {
  constructor(message) {
    super(message);

    this.name = 'ConverterError';
  }
}



class NxError extends NotatrixError {
  constructor(...args) {
    super(...args);
  }
}



module.exports = {

  NotatrixError,
  InvalidCG3Error,
  InvalidCoNLLUError,

  ToolError,
  SplitterError,
  DetectorError,
  ParserError,
  GeneratorError,
  ConverterError,

  NxError,

};
