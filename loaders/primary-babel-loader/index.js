const babel = require('@babel/core')
const schema = require('./schema.json')
module.exports = function (content) {
    const callback = this.async()
    const options = this.getOptions(schema)
    babel.transform(content, options, (err, res) => {
        if (err) callback(err)
        else callback(null, res.code)
    })
    return content
}