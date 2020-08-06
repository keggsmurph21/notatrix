"use strict";

export class NotatrixError extends Error {};

export class ToolError extends NotatrixError {};

export class SplitterError extends ToolError {
  public name = "SplitterError";
  constructor(public message: string, public text: string,
              public options: unknown) {
    super(message);
  }
}

export class DetectorError extends ToolError {
  public name = "DetectorError";
  constructor(public message: string, public text: string,
              public options: unknown) {
    super(message);
  }
}

export class ParserError extends ToolError {
  public name = "ParserError";
  constructor(public message: string, public text: string,
              public options: unknown) {
    super(message);
  }
}

export class GeneratorError extends ToolError {
  public name = "GeneratorError";
  constructor(public message: string, public nx: unknown,
              public options: unknown) {
    super(message);
  }
}

export class ConverterError extends ToolError {
  public name = "ConverterError";
  constructor(public message: string) { super(message); }
}

export class NxError extends NotatrixError {
  public name = "NxError";
  constructor(...args: any) { super(...args); }
}

export class DBError extends NotatrixError {};
