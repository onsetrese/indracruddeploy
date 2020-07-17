const util = require('util');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'bbfcc1a6456a4e',
    password: 'b9a18c30',
    database: 'indracrudtest',
    debug: true
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;