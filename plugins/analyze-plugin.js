class AnalyzePlugin {
    constructor(props) {
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('AnalyzePlugin', (compilation, callback) => {
            //遍历所有输出文件，得到大小
            const assets = compilation.assets
            //生成md文件
            let content= `| 文件名 | 大小 |
            | --- | --- |
            `
            Object.entries(assets).forEach(([name, asset]) => {
                content += `| ${name} | ${Math.ceil(asset.size()/1024)}kb |
                `
            })
            assets['analyze.md'] = {
                source: () => content,
                size: () => content.length
            }
            callback()
        })
    }

}

module.exports = AnalyzePlugin