const sqlite3 = require('sqlite3');

class DB extends sqlite3.Database {
  constructor(filename, callback) {

    super(filename);
    this.length = 0;

    this.run(`
      CREATE TABLE IF NOT EXISTS sentences (
        id INT PRIMARY KEY,
        comments TEXT,
        tokens TEXT
      );

      CREATE TABLE IF NOT EXISTS comments (
        id INT PRIMARY KEY
      );

      CREATE TABLE IF NOT EXISTS tokens (
        id INT PRIMARY KEY
      );
      `, callback);
  }

  getSentence() {

  }

  setSentence() {

  }

  insertSentence() {

  }

  removeSentence() {

  }
}

module.exports = DB;
