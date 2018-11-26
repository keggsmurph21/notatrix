'use strict';

const mongoose = require('mongoose');

var MetaSchema = mongoose.Schema({

  name: String,
  key: String,

});

module.exports = mongoose.model('CorpusMeta', MetaSchema, 'corpora.meta');
