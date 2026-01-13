const schema = require('./schema.json')

const loaderUtils=require('loader-utils')

module.exports = function (content) {
    const option = this.getOptions(schema)
    let interpolateName=loaderUtils.interpolateName(this,"[hash].[ext][query]",{content})
    interpolateName=`images/${interpolateName}`
    this.emitFile(interpolateName,content)
    // return content
    return `module.exports = "${interpolateName}"`
}
module.exports.raw = true