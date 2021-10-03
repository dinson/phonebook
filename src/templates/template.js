const pug = require("pug");

const templatePath = './src/templates/'

/**
 * Render view templates for handler functions
 * @param templateName:string
 */
render = (templateName) => {
    return pug.compileFile(templatePath + templateName + '.pug')
}

module.exports = {
    render
}
