'use strict';

const mongoose = require('mongoose');
const utils = require('../../utils');

const CorpusSchema = mongoose.Schema({

  meta: Object,
  name: String,

  filename: String,

  options: {

    requireOne: Boolean,
    trimChunks: Boolean,
    suppressDetectorErrors: Boolean,
    returnAllMatches: Boolean,
    requireOneMatch: Boolean,
    allowEmptyString: Boolean,
    allowTrailingWhitespace: Boolean,
    allowLeadingWhitespace: Boolean,
    allowNoDependencies: Boolean,
    allowNewlines: Boolean,
    requireTenParams: Boolean,
    allowZeroTokens: Boolean,
    allowZeroFields: Boolean,
    allowEmptyList: Boolean,
    allowBookendWhitespace: Boolean,
    addHeadOnModifyFailure: Boolean,
    depsShowDeprel: Boolean,
    showRootDeprel: Boolean,
    enhanced: Boolean,
    useTokenDeprel: Boolean,
    autoAddPunct: Boolean,
    suppressParserErrors: Boolean,
    returnAllPossibilities: Boolean,
    useTabIndent: Boolean,
    equalizeWhitespace: Boolean,
    coerceMultipleSpacesAfterSemicolonToTab: Boolean,
    allowMissingIndices: Boolean,
    allowWhiteLines: Boolean,

    indentString: String,
    interpretAs: String,

    bracketsAllowanceTreshold: Number,
    spacesPerTab: Number,

  },

  labeler: {

    labels: Array,
    filter: Array,

  },

  sentences: [
    {

      meta: Object,
      input: String,
      isParsed: Boolean,
      comments: [

        String

      ],
      tokens: [
        {

          index: Number,
          isEmpty: Boolean,

          form: String,
          lemma: String,
          upostag: String,
          xpostag: String,

          feats: [ String ],
          misc: [ String ],

          heads: [
            {

              index: Number,
              deprel: String,

            }
          ],

          analyses: [
            {
              subTokens: [
                {

                  index: Number,
                  isEmpty: Boolean,

                  form: String,
                  lemma: String,
                  upostag: String,
                  xpostag: String,

                  feats: [ String ],
                  misc: [ String ],

                  heads: [
                    {

                      index: Number,
                      deprel: String,

                    }
                  ],

                }
              ]
            }
          ]

        }
      ],
    }
  ]

});

module.exports = mongoose.model('Corpus', CorpusSchema, 'corpora');
