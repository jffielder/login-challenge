// Nodejs Backend
const Database = require('./databaseModel')

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


var db = new Database( {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DB
} )


app.get('/api/createTable', (req,res) => {
    // Create mysql table to store refreshtokens
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

// -- Authentication System

app.delete('/api/logout', (req, res) => {
    const sql = "DELETE FROM refreshTokens WHERE refreshToken = ?"
    db.query(sql, req.body.token )
    .then( rows => {

    })
})

app.post('/api/token', (req, res) => {
    // gives token if refreshtoken is valid
    const refreshToken = req.body.token;

    if (refreshToken == null) return res.sendStatus(401)

    const sql = "SELECT * FROM tokens where refreshToken = ?";

    // check db for refreshtoken
    db.query( sql, refreshToken )
    .then( rows => {
        if ( !rows) {
            return res.sendStatus(403)
        } else {
            jwt.verify(refreshToken, process.env.TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403)
                const accessToken = generateAccessToken({ name: user.name })
                res.json({ accessToken })
            })
        }
    })

})

app.post('/api/login', async (req, res) => {
    // DB Attempt Login

    console.log("Attempting to login: " + req.body.username);

    const username = req.body.username 
    const user = { username: username}

    sql = "SELECT * FROM users where username = ?"
    
    // search users table for user
    db.query(sql, [ req.body.username ])
    .then( rows => {
        if ( !rows )    // User not found
            res.status(401).send("Login failed. Username not found")
        else {          // compare password
            try {
                if (bcrypt.compareSync(req.body.password, rows[0].password) ) {

                    // gen tokens
                    const accessToken = genAccessToken(user);
                    const refreshToken = jwt.sign(user, process.env.TOKEN_SECRET)
                    
                    // save refresh to db
                    db.query( "INSERT INTO refreshTokens(refreshToken) VALUES (?)", refreshToken )
                    .catch( err => {throw err});
                    
                    // send tokens to client
                    res.json({ 
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    });

                } else {
                    res.status(401).send("Wrong password");
                }
            } catch (err) {
                throw err;
            }

        }
    }) 
});

// Bearer token
function genAccessToken(user) {
    // return access token for user
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '20s' });
}

app.listen(3001, () => console.log('Starting server on port 3001')) 


