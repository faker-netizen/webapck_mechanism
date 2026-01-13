module.exports = function (content) {
    // console.log(content)
    const script=`
    const styleEl = document.createElement('style');
    styleEl.innerHTML = ${JSON.stringify(content)};
    document.head.appendChild(styleEl);
    `
    // return script
}
module.exports.pitch = function (remainingRequest) {
    const rePath=remainingRequest.split('!').map((abPath)=>{
        return this.utils.contextify(this.context, abPath)
    }).join('!')
    const script=`
    import style from '!!${rePath}';
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
    `
    return script
}