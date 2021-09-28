const mysql = require('mysql2') // 'mysql' doesnt use the latest mysql_native_password method of auth


class Database {
    // DB class for making sql query promises
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

module.exports = Database;