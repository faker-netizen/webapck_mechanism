class BannerWebpackPlugin {
    data
    constructor(data={}) {
        this.data=data
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('BannerWebpackPlugin', (compilation, callback) => {
            const preFix = `/* author ${this.data.author} */`
            Object.keys(compilation.assets).forEach((assetPath) => {
                //匹配js文件
                if (/\.js$/.test(assetPath)) {
                    const content = preFix+compilation.assets[assetPath].source()
                    compilation.assets[assetPath] = {
                        source: () => {
                            return content
                        }
                        ,
                        size: () => {
                            return content.length
                        }
                    }
                }
            })
            callback()
        })

    }

}

module.exports = BannerWebpackPlugin