// create DB via api

const express = require("express");
const Database = require ('../databaseModel')

const router = express.Router();

var db = new Database({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DB
  });

router.get('createdb', (req, res) => {
    // creates database for all tables
    let sql = 'CREATE DATABASE ' + process.env.DB_DB + ";";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database created");
    })
})

router.get('dropdb', (req, res) => {
    // Drops db
    let sql = 'DROP DATABASE challenge3;';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database dropped");
    })
})

router.get('createTableUsers', (req,res) => {
    // DB creates user table for storing username and password
    let sql ='CREATE TABLE users (' 
        + 'username VARCHAR(255) NOT NULL,'
        + 'password VARCHAR(255) NOT NULL,'
        + 'PRIMARY KEY (username));';

    db.query(sql)
        .then( result => {
            console.log(result);
            res.send("Table Created");
        })
        .catch( err => {
            console.log(err);
            throw err;
        })
})

router.get('createTableTokens', (req,res) => {
    // DB Create table to store refreshtokens
    let sql ='CREATE TABLE tokens (' 
        + 'id INT AUTO_INCREMENT NOT NULL,'
        + 'refreshToken VARCHAR(255) NOT NULL,'
        + 'PRIMARY KEY (id));';

    db.query(sql)
    .then( result => {
        console.log(result);
        res.send("Table Created");
    })
    .catch( err => {
        console.log(err);
        throw err;
    })
})


module.exports = router;