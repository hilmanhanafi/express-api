// import mysql
let mysql = require('mysql');

// create connection
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// check connection
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err);
    }
});

// export connection
module.exports = connection;