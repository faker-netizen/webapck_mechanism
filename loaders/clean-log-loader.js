module.exports=function (content){
    //清楚log
    return content.replace(/console\.log\(.*\);?/g,'')
}