'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const SchemaConstructor = require('./models/sentence');

// config stuff
const db_uri = process.env.DB_URI;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
if (!db_uri || !db_user || !db_pass)
  throw new Error('database not configured');

const db_path = `mongodb://${db_user}:${db_pass}@${db_uri}`;
const db_opts = {
  useNewUrlParser: true,
};
const reservedCollectionNames = new Set([
  'system.indexes',
  'objectlabs-system.admin.collections',
  'objectlabs-system',
  'corpora.meta',
]);


module.exports = core => {
  mongoose.connect(db_path, db_opts, err => {

    if (err)
      throw err;

    // add things to the mongoose object
    mongoose.schemas = {};
    mongoose.getSchema = name => {

      if (!name || reservedCollectionNames.has(name))
        throw new Error(`invalid schema name "${name}"`);

      let schema = mongoose.schemas[name];
      if (!schema) {
        schema = SchemaConstructor(name);
        mongoose.schemas[name] = schema;
      }

      return schema;
    };

    // build up a hash of the schemas
    mongoose.connection.db.listCollections().toArray((err, colls) => {

      if (err)
        throw err;

      colls
        .map(coll => coll.name)
        .filter(name => !reservedCollectionNames.has(name))
        .forEach(name => {

          mongoose.schemas[name] = SchemaConstructor(name);

        });

      core.emit('_db-connected', mongoose);
    });
  });

  return mongoose;
};
