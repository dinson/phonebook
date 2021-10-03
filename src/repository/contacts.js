const mysql = require('mysql')
const con = require('./repository')
const numbersRepo = require("./numbers");

/**
 * Add new record to DB
 * @param name
 * @param numbers
 */
async function create(name, numbers) {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO contacts (contact_name) VALUES (?)';
        let query = mysql.format(sql,[name]);

        con.con.query(query, function (err, result) {
            if (err) reject(err);

            return numbersRepo.create(result.insertId, numbers).then((res) => {
                resolve({
                    data: res,
                    error: false
                })
            })
        });
    })
}

/**
 * get all contacts
 * @returns {Promise<unknown>}
 */
async function list() {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM contacts';

        con.con.query(query, function(err, result) {
            if (err) reject(err)

            resolve({
                "data": result,
                "error": false
            })
        })
    })
}

/**
 * Get contact model
 * @param id
 * @returns {Promise<unknown>}
 */
async function get(id) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM contacts WHERE id=?';
        let query = mysql.format(sql, [id])
        con.con.query(query, function(err, result) {
            if (err) reject(err)

            resolve({
                "data": result,
                "error": false
            })
        })
    })
}



module.exports = {
    create,
    list,
    get
}