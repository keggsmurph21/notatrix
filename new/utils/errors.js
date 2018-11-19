'use strict';

class NotatrixError extends Error {};

class DBError extends NotatrixError {};

module.exports = {

  NotatrixError,
  DBError,

};
