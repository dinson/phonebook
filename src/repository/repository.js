require('dotenv').config()

const mysql = require("mysql");

const dbConfig = {
    host: "mysql_db",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

const con = mysql.createConnection(dbConfig);

function init() {
    return con
}

module.exports = {
    init
}
