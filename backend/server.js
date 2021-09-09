// Nodejs Backend

const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config({ path: './.env'})

app.use(express.json()) // use json

const users = [] // store in DB

// DB connection 
var db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
  });

  db.connect( (err) => {
      if (err) {
          throw err;
      } 
      console.log('mysql connected')
  })
  


  // DB Create
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database created");
    })
}) 

// Create Table
// Users ( ID, Username, Password )

app.get('/createTable', (req,res) => {
    let sql ='CREATE TABLE users(id int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255) PRIMARY KEY id)';

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Table Created");
    })
})

app.get('/api', (req, res) => {
    res.json({
        message: "Hello"
    })
})



app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {

    try {
        // const salt = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        const user = {username: req.body.username, password: hashedPass }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.post('/api/members', verifyToken, (req, res) => {
    // use db

    res.json({
        message: "members page"
    })
})


// main route
app.post('/api/login', (req, res) => {

    // mock user
    // send username and pass in the post body
    // go through auth with database
    // get user back

    // const user = {
    //     id: 1,
    //     username: 'john',
    //     password: 'abcd'

    // }

    // setup database call

    // hash password for call

    const user = {
        username: req.body.username,
        password: req.body.password

    }

    jwt.sign({user: user}, 'secretkey', (err, token) => {
        res.json({
            token: token
        });
    });
});


app.post('/users/login', async (req, res) => {

    //send login info to database

    // check if users exists
    const user = users.find(user => user.username === req.body.username )
    if (user == null) {
        return res.status(400).send('User not found')
    }

    // check correct password
    try {
        if (await bcrypt.compare(req.body.password, user.password) ) {
            res.send("sucess")
        } else {
            res.send("Wrong password")
        }
    } catch {
        
    }


})

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


