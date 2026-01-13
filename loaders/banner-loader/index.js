//schema
const schema = require('./schema.json')
module.exports=function (content){
    const option=this.getOptions(schema)
    const pre=`
    /*
    * author  ${option.author}
    */
    `
    return pre+content
}