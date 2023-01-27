const { Pool } = require("pg");
const { dbConfig } = require("./config");

const { user, password, host, port, database } = dbConfig;

const db = new Pool({
  user,
  password,
  host,
  port,
  database
});

module.exports = db;
