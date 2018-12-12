module.exports = {

  //db_path: '/tmp/corpora',
  uri: process.env.DB_URI || 'localhost:27017',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,

};
