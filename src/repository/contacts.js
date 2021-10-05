const mysql = require('mysql')
const repo = require('./repository')
const numbersRepo = require("./numbers");

const db = repo.init()

/**
 * Add new record to DB
 * @param name
 * @param numbers
 */
async function create(name, numbers) {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO contacts (contact_name) VALUES (?)';
        let query = mysql.format(sql,[name]);

        db.query(query, function (err, result) {
            if (err) reject(err);

            return numbersRepo.create(result.insertId, numbers).then((res) => {
                resolve({
                    data: res,
                    contactID: result.insertId,
                    error: false
                })
            }).catch((err) => {
                reject(err)
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

        db.query(query, function(err, result) {
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
        db.query(query, function(err, result) {
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