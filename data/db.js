const mySql = require("mysql2");

const connection = mySql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySql");
});

module.exports = connection;
