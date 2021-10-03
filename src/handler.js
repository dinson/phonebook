const service = require('./service');
const template = require('./templates/template');
const querystring = require("querystring");
const url = require("url");

async function processCallback(func, req) {
    return func(req)
}

/**
 * Show list of names
 * @returns {*}
 */
async function index() {
    let view = template.render('index')

    return service.list().then((data) => {
        return view({
            contacts: data.data
        })
    })
}

/**
 * Add new contact
 * @returns {string|*}
 * @param req
 */
async function add(req) {
    if (req.method === "POST") {
        return parsePostBody(req).then(async (data) => {
            let resp = await service.create(data)
            if (resp.error) {
                let view = template.render('error')
                return view({
                    msg: resp.error
                })
            }
            let view = template.render('success')
            return view({
                msg: "contact created successfully"
            })
        })
    }
    let view = template.render('add')

    return view()
}

/**
 * View details of contact
 * @returns {*}
 * @param req
 */
async function details(req) {
    let q = url.parse(req.url, true).query;

    let view = template.render('view')

    return service.getByID(q.id).then((contactDetails) => {
        return view({
            name: contactDetails.data.contact.contact_name,
            numbers: contactDetails.data.numbers
        })
    })
}

/**
 * Get post values from request
 * @param req
 * @returns {Promise<unknown>}
 */
parsePostBody = async (req) => {
    return new Promise((resolve, reject) => {
        let queryData = '';
        req.on('data', function(data) {
            queryData += data;
        });

        req.on('end', function() {
            let postBody = querystring.parse(queryData);
            resolve(postBody)
        });
    })
}

module.exports = {
    processCallback,
    index,
    add,
    details
}
