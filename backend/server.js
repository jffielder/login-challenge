// Nodejs Backend

const Database = require ('./databaseModel')

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config({ path: './.env'})

const app = express()
app.use(express.json())
app.use(cors());        

// import routes for db handling via API
const dbRoutes = require('./routes/databaseRoutes');
app.use("/api/db/", dbRoutes);

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

app.get('/api/getusers', (req, res) => {
    // returns all users in db

    db.query('select * from users;')
    .then( rows => { res.status(202).json(rows) } )
    .catch( err => { throw err;} )    
})

app.post('/api/register', (req, res) => {
    // Adds user to users table db
    const saltRounds = 5;
    var sql = "SELECT * FROM users where username = ?"
    
    // Hash password before storing
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        
        // check if user exists already
        db.query( sql, [req.body.username])
        .then( rows => {

            if (rows == 0) { // new user
                sql = "INSERT INTO users VALUE (?, ?)"
                db.query(sql, [req.body.username, hash])       
                res.status(202).json({message: "add successful"}) 
            } 
            else { // username already exists
                res.sendStatus(409)
            }
        })
    });
})

app.get('/api/secure', verifyToken, (req, res) => {
    // Verify accessToken and returns all usernames from db

    let sql = "SELECT username FROM users"

    db.query(sql)
    .then(
        rows => res.send(rows)
    )
    .catch(
        err => { throw err}
    )
})

function verifyToken(req, res, next) {
    // uses JWT verify to check if the accessToken is valid

    const token = req.headers['authorization'];
    // const token = bearerHeader && bearerHeader.split(' ')[1]

    if (typeof token !== 'undefined') {
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