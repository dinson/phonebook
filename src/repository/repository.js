require('dotenv').config()

const mysql = require("mysql");

const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
}

const dbName = process.env.MYSQL_DATABASE

const con = mysql.createConnection(dbConfig);

initDB(con).then((result) => {
    console.log(result)
    con.changeUser({database : dbName}, function(err) {
        if (err) throw err;
        createTablesIfNotExists(con).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
    });
}).catch((err) => {
    console.log(err)
})

async function initDB(con) {
    return new Promise(async (resolve, reject) => {

        con.query('CREATE DATABASE IF NOT EXISTS ' + dbName);

        resolve("DB initialised")
    })
}

async function createTablesIfNotExists(con) {
    // create contacts table
    con.query('CREATE TABLE IF NOT EXISTS contacts (\n' +
        '    id INT AUTO_INCREMENT PRIMARY KEY,\n' +
        '    contact_name VARCHAR(255) NOT NULL,\n' +
        '    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n' +
        ')');

    // create numbers table
    con.query('CREATE TABLE IF NOT EXISTS numbers (\n' +
        '    id INT AUTO_INCREMENT PRIMARY KEY,\n' +
        '    contact_id INT NOT NULL,\n' +
        '    contact_number BIGINT NOT NULL UNIQUE,\n' +
        '    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n' +
        ')');
}

module.exports = {
    con
}
