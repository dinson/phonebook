const pug = require('pug')
const service = require('./service')

/**
 * Show list of names
 * @returns {*}
 */
function index() {
    const template = pug.compileFile("./src/templates/index.pug")

    return template()
}

/**
 * Add new contact
 * @param method:string
 * @returns {string|*}
 */
function add(method) {
    if (method === "POST") {
        return "contact saved!"
    }
    const template = pug.compileFile("./src/templates/add.pug")

    return template()
}

/**
 * View details of contact
 * @param id:int
 * @returns {*}
 */
function view(id) {
    const template = pug.compileFile("./src/templates/view.pug")

    let contactDetails = service.getByID(id)

    return template({
        name: contactDetails.name,
        numbers: contactDetails.numbers
    })
}

module.exports = {
    index,
    add,
    view
}
