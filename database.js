var mysql = require('mysql');
var connection = mysql.createConnection('mysql://sql11484011:pass@gQfi8qTvEn/db?debug=true&charset=utf8_general_ci');
var conn = mysql.createConnection({
  host: 'sql11.freemysqlhosting.net	',
  port: '3306',
  user: 'sql11484011',
  password: 'gQfi8qTvEn',
  charset: 'utf8_general_ci',
  database: 'sql11484011'
});

conn.connect((err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Connected to the MySQL server.');
});
module.exports = conn;

/*
var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  charset: 'utf8_general_ci',
  database: 'survey' // // Replace with your database Name
}); 
 
conn.connect((err) => {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;

*/