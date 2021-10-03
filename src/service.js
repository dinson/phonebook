/**
 * Get details of contact by id
 * @returns {string[]}
 */
getByID = (id) => {
    return {
        name: "Harvey Spector",
        numbers: [
            "+91 9539747545",
            "+91 8606659365",
            "+65 7892109223"
        ]
    }
}

/**
 * Add new contact record to database
 * @param data
 * @returns {boolean}
 */
create = (data) => {
    return true
}

module.exports = {
    getByID,
    create
}
