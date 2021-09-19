# Setup

## Backend

### start mysql: 
    sudo service mysql start 

### import sql file
    cd backend
    mysql -u root -p < setupDB.sql

### install node modules:
    npm install

### Run server and authServer
    npm run start 
    npm run startAuth

## Frontend

### install node modules and start:
    npm install
    ng serve

## http://localhost:4200
