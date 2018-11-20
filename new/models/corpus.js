'use strict';

const mongoose = require('mongoose');

var SentenceSchema = mongoose.Schema({

  meta: {

  },

  comments: [

  ],

  tokens: [

  ],

  root: Number,

});

module.exports = mongoose.model('Sentence', SentenceSchema, 'sentences');
