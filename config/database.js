const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 20,
  host: "localhost",
  user: "root",
  password: "password",
  database: "stunning-waffle"
});

pool.getConnection(function(err, connection) {
  if (err) throw err;
  connection.release();
});

const promiseQuery = (query, params) => {
  let conn;
  return new Promise((resolve, reject) => {
    pool.getConnection((err, c) => {
      conn = c;
      if(err){
        reject(err);
        conn.release();
      } else {
        conn.query(query, params, (err, rows) => {
          err ? reject(err) : resolve(rows);
          conn.release();
        });
      }
    })
  });
};

module.exports = {
  pool: pool,
  promiseQuery: promiseQuery
};