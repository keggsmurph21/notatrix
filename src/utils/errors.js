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

class Loss extends ToolError {
  constructor(fields, output) {
    super(`Conversion is lossy on: ${fields.join(', ')}`);

    this.name = 'ConversionError';
    this.fields = fields;
    this.output = output;
  }
}



class NxError extends NotatrixError {
  constructor(...args) {
    super(...args);
  }
}

class CorpusError extends NxError {
  constructor(message, nx) {
    super(message);

    this.name = 'CorpusError';
    this.nx = nx;
  }
}

class SentenceError extends NxError {
  constructor(message, nx) {
    super(message);

    this.name = 'SentenceError';
    this.nx = nx;
  }
}

class BaseTokenError extends NxError {
  constructor(...args) {
    super(...args);
    this.name = 'BaseTokenError';
  }
}

class TokenError extends BaseTokenError {
  constructor(message, nx) {
    super(message);

    this.name = 'TokenError';
    this.nx = nx;
  }
}

class AnalysisError extends NxError {
  constructor(message, nx) {
    super(message);

    this.name = 'AnalysisError';
    this.nx = nx;
  }
}

class SubTokenError extends BaseTokenError {
  constructor(message, nx) {
    super(message);

    this.name = 'SubTokenError';
    this.nx = nx;
  }
}

class DependencyError extends NxError {
  constructor(message) {
    super(message);

    this.name = 'DependencyError';
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
  Loss,

  NxError,
  CorpusError,
  SentenceError,
  BaseTokenError,
  TokenError,
  AnalysisError,
  SubTokenError,
  DependencyError,

};
