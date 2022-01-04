require('dotenv').config();
const express = require('express');
const mysql = require('mysql');

const db = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBDATABASE,
});

const query = function (sql, values) {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.log('sql connection error: ', err);
        reject(err);
      } else {
        connection.query(sql, values, (error, rows) => {
          if (error) {
            console.log('sql querying error: ', error);
            reject(error);
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
