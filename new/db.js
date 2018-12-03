'use strict';

// mongoose config
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// connection config
const db_uri = process.env.DB_URI;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_path = `mongodb://${db_user}:${db_pass}@${db_uri}`;
const db_opts = {
  useNewUrlParser: true,
};

if (!db_uri || !db_user || !db_pass)
  throw new Error('database not configured');

module.exports = core => {

  mongoose.connect(db_path, db_opts, err => {

    if (err)
      throw err;

    core.emit('_db-connected', mongoose);

  });

  return mongoose;
}
