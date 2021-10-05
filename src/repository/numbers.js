const repo = require('./repository')
const mysql = require("mysql");

const db = repo.init()

/**
 * get list of numbers associated with a contact_id
 * @param id
 * @returns {Promise<unknown>}
 */
async function list(id) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM numbers WHERE contact_id=?';
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

/**
 * Add new record to DB
 * @param contact_id
 * @param numbers
 */
async function create(contact_id, numbers) {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO numbers (contact_id, contact_number) VALUES ?';

        let numList = []
        if (Array.isArray(numbers)) {
            numbers.forEach((num) => {
                let t = [contact_id, num]
                numList.push(t)
            })
        } else {
            let t = [contact_id, numbers]
            numList.push(t)
        }

        let query = mysql.format(sql,[numList]);

        db.query(query, function (err, result) {
            if (err) reject(err);

            resolve({
                "data": "contact created",
                "error": false
            })
        });
    })
}

module.exports = {
    list,
    create
}