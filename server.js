const http = require('http');
const url = require('url');
const handler = require('./src/handler')
const template = require('./src/templates/template')

const server = http.createServer(async function (req, res) {
    const q = url.parse(req.url, true);

    switch (q.pathname) {
        case "/":
            return await route(req.method, q.pathname, handler.index, req, res)
        case "/add":
            return await route(req.method, q.pathname, handler.add, req, res)
        case "/view":
            return await route(req.method, q.pathname, handler.details, req, res)
        default:
            res.writeHead(404, {'Content-Type': 'text/html'})
            let view = template.render('error')
            res.write(view({
                msg: "NOT FOUND"
            }))

            return res.end()
    }
})

async function route(method, path, handlerCallback, req, res) {
    let response = await handler.processCallback(handlerCallback, req)

    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(response)

    return res.end()
}


server.listen(8080)
