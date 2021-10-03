const http = require('http');
const url = require('url');
const handler = require('./src/handler')

http.createServer(function (req, res) {
    const q = url.parse(req.url, true);

    let response = processRequest(req.method, q.pathname, q.query)

    res.writeHead(response.statusCode, {'Content-Type': 'text/html'})
    res.write(response.data)

    return res.end()

}).listen(8080)

/**
 * Process incoming request
 * @param method:string
 * @param path:string
 * @param query:object
 * @returns {{data: *, statusCode: number}}
 */
function processRequest(method, path, query) {
    let statusCode = 200
    let data = ''

    switch (path) {
        case "/":   // default route
            data = handler.index()
            break;
        case "/add":
            data = handler.add(method)
            break;
        case "/view":
            data = handler.view(query.id)
            break;
        default:
            statusCode = 404
            data = "Invalid route"
            break;
    }

    return {
        "statusCode": statusCode,
        "data": data
    }
}
