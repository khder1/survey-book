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