require("dotenv").config();
const express = require("express");
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBDATABASE,
});

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    db.getConnection(function (err, connection) {
      if (err) {
        console.log("sql connection error: ", err);
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            console.log("sql querying error: ", err);
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

module.exports = { query };
