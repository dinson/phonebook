const contactsRepo = require('./repository/contacts')
const numbersRepo = require('./repository/numbers')

/**
 * Get details of contact by id
 * @returns {string[]}
 */
getByID = (id) => {
    const promise1 = contactsRepo.get(id)
    const promise2 = numbersRepo.list(id)

    return Promise.all([promise1, promise2]).then((values) => {
        console.log(values)
        return {
            data: {
                contact: values[0].data[0],
                numbers: values[1].data
            },
            error: false
        }
    })
}

/**
 * Add new contact record to database
 * @param data
 */
async function create(data) {
    let name = data.contactName
    let numbers = data.contactNumber

    return contactsRepo.create(name, numbers).then((res) => {
        return {
            "data": "contact created",
            "error": false
        }

    }).catch((err) => {
        return {
            "data": err,
            "error": "contact not saved!"
        }
    })
}

async function list() {
    return contactsRepo.list().then((res) => {
        return {
            "data": res.data,
            "error": res.error
        }
    })
}

module.exports = {
    getByID,
    create,
    list
}
