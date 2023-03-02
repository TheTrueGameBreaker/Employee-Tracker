const mysql = require('mysql2')

const db = mysql.createConnection(
    {
    'host': "localhost",
    'user': "root",
    'password': "Wii900wii900",
    'database': "et_db",
    },
    console.log('Connected to the ${process.env.DB_NAME} database.')
);

module.exports = db