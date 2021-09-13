// Nodejs Backend

const Database = require ('./databaseModel')

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config({ path: './.env'})

// Middleware
const app = express()
app.use(express.json())
app.use(cors());        


var db = new Database({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DB
  });


// --ROUTING

app.all('/', (req,res,next) => {

    console.log("Accessing api...")

    next()
})

app.get('/api/createdb', (req, res) => {
    // DB Create
    let sql = 'CREATE DATABASE ' + process.env.DB_DB + ";";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database created");
    })
})

app.get('/api/dropdb', (req, res) => {
    // DB Drop
    let sql = 'DROP DATABASE challenge3;';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database dropped");
    })
})

app.get('/api/createTable', (req,res) => {
    // DB Table Create
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

app.get('/api/getusers', (req, res) => {
    db.query('select * from users;')
    .then( rows => { res.status(202).json(rows) } )
    .catch( err => { throw err;} )    
})

app.post('/api/adduser',(req, res) => {
    // DB Add User, updates password if username exists (for testing)

});

app.post('/api/register', (req, res) => {
    const saltRounds = 5;
    var resultRows;  
    var sql;
    
    // hash password
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        
        // check if user exists already
        db.query("SELECT * FROM users where username = ?", [req.body.username])
        .then( rows => {
            
            if (rows == 0) {
                sql = "INSERT INTO users VALUE (?, ?)"
                db.query(sql, [req.body.username, hash])       

            } 
            else { // username already exists
                res.sendStatus(409)
            }
        })
        
    });
    res.status(202).json({message: "add successful"})

})

app.get('/api/secure', verifyToken, (req, res) => {
    // Validates token and returns secure resource

    res.json({
        message: "members page"
    })
})

// Bearer token
function verifyToken(req, res, next) {
    // get auth header value
    // send token in the header.authtoken

    const bearerHeader= req.headers['authorization'];
    const token = bearerHeader && bearerHeader.split(' ')[1]

    if (typeof bearerHeader !== 'undefined') {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

            if (err) return res.sendStatus(403); // bad token
            req.user = user
            next()
        })
    } 
    else 
        res.sendStatus(401) // no token
    
}

app.listen(3000, () => console.log('Starting server on port 3000')) 