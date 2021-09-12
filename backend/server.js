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


// DB class for making sql query promises
class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }

    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, (err, rows ) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise( (resolve, reject ) => {
            this.connection.end( err => {
                if(err) return reject(err);
                resolve();
            });
        });
    }
}

var db = new Database({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database: process.env.DB_DB
  });


// --ROUTING

app.all('', (req,res,next) => {

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

app.get('/createTable', (req,res) => {
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

app.post('/api/adduser',(req, res) => {
    // DB Add User, updates password if username exists (for testing)

    const saltRounds = 10;
    var resultRows;  
    var sql;
    
    // hash password
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        
        // check if user exists already
        db.query("SELECT * FROM user where username = ?", [req.body.username])
            .then( rows => { resultRows = rows })
            .then( rows => {
                if (resultRows == 0) {
                    sql = "INSERT INTO users VALUE (?, ?)"
                    db.query(sql, [req.body.username, hash])       
                }
                else {
                    sql = "UPDATE users SET password = ? WHERE username = ?" 
                    db.query(sql, [hash, req.body.username ])
                }
            })



    });
});

app.post('/api/secure', verifyToken, (req, res) => {
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

    // compare password
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


