'use strict';

const mongoose = require('mongoose');
const CorpusMeta = require('./corpus-meta');

var SentenceSchema = mongoose.Schema({

  meta: {

  },

  comments: [

  ],

  tokens: [

  ],

  root: Number,

});

module.exports = name => {

  console.log('getting corpus schema', name);

  CorpusMeta.countDocuments({ name: name }, (err, count) => {

    if (err)
      throw err;

    if (count)
      return;

    const meta = new CorpusMeta({ name: name, key: 'testing' });
    meta.save(err => {

      if (err)
        throw err;

      console.log('saved new  corpus meta');

    });
  });

  return mongoose.model('Sentence', SentenceSchema, name);
};
