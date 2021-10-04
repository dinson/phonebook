const http = require('http');
const url = require('url');
const handler = require('./src/handler')
const fs = require('fs')
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
            return serveAssetOrError(q.pathname, res)
    }
})

/**
 * Serve data for requested route
 * @param method
 * @param path
 * @param handlerCallback
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function route(method, path, handlerCallback, req, res) {
    let response = await handler.processCallback(handlerCallback, req)

    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(response)

    return res.end()
}

/**
 * Serve JS/CSS assets or throw error
 * @param assetName
 * @param res
 * @returns {Promise<*>}
 */
async function serveAssetOrError(assetName, res) {
    const assetDir = './src/assets'

    if (assetName.startsWith("/js")) {
        res.writeHead(200, {'Content-Type': 'text/js'})
        let fileContents = fs.readFileSync(assetDir + assetName, {encoding: 'utf8'});
        res.write(fileContents)

        return res.end()

    } else if (assetName.startsWith("/css")) {
        res.writeHead(200, {'Content-Type': 'text/css'})
        let fileContents = fs.readFileSync(assetDir + assetName, {encoding: 'utf8'});
        res.write(fileContents)

        return res.end()
    }

    res.writeHead(404, {'Content-Type': 'text/html'})
    let view = template.render('error')
    res.write(view({
        msg: "NOT FOUND"
    }))

    return res.end()
}

// start server
server.listen(8080)
