// Nodejs Backend

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config({ path: './.env'})

// Middleware
const app = express()
app.use(express.json())
app.use(cors());        

// DB connection 
var db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database: process.env.DB_DB
  });

// --ROUTING
app.all('', (req,res,next) => {
    console.log("Accessing api...")
    db.connect( (err) => {
        if (err) {
            console.log("mysql NOT connected")
            throw err;
        } 
        console.log('mysql connected')
    })
    next()
})

app.get('/createdb', (req, res) => {
    // DB Create
    let sql = 'CREATE DATABASE ' + process.env.DB_DB + ";";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database created");
    })
})

app.get('/dropdb', (req, res) => {
    // DB Drop
    let sql = 'DROP DATABASE challenge3;';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database dropped");
    })
})

app.get('/createTable', (req,res) => {
    // DB Table Create
    let sql ='CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY (id));';

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Table Created");
    })
})

app.get('/insertuser',(req, res) => {
    // DB Add User
    username = "james"
    password = "123"

    let sql = "INSERT INTO users VALUE ( NULL, ?, ?)"
    db.query(sql, [username, password], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("user entered");
    })

} )

app.post('/secure', verifyToken, (req, res) => {
    // Validate REQ, respond with secret page

    res.json({
        message: "members page"
    })
})


// DB Attempt Login
app.post('/api/login', async (req, res) => {

    var user

    // check username in the database
    sql = "SELECT * FROM users where username = ?"
    db.query(sql, [ req.body.username ], (err, result) => {
        if (err) throw err;
        user = result
        console.log(result);
    })

    if (user == null)
        return res.status(400).send('User not found')

    try {
        if (await bcrypt.compare(req.body.password, user.password) ) {
            res.send("success")
        } else {
            res.send("Wrong password")
        }
    } catch {
        
    }

    
});

// Bearer token
function verifyToken(req, res, next) {
    // get auth header value
    // send token in the header.authtoken

    const bearerHeader= req.headers['authorization'];

    // check for token

    if (typeof bearerHeader !== 'undefined') {
        
    } else {
        res.sendStatus(403)
    }

}

app.listen(3000, () => console.log('Starting server on port 3000')) 


