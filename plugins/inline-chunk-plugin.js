const HtmlWebpackPlugin = require('html-webpack-plugin');

class InlineChunkPlugin {
    constructor(props) {
    }

    apply(compiler) {
        const fs = compiler.outputFileSystem;
        compiler.hooks.compilation.tap('InlineChunkPlugin', (compilation) => {
            const hooks = HtmlWebpackPlugin.getHooks(compilation)
            hooks.alterAssetTagGroups.tap('InlineChunkPlugin', (asset) => {
                const {headTags, bodyTags} = asset
                asset.headTags = this.getInlineChunk(headTags, compilation.assets)
                asset.bodyTags = this.getInlineChunk(bodyTags, compilation.assets)
            })
            hooks.afterEmit.tap('InlineChunkPlugin', () => {
                Object.keys(compilation.assets).forEach((filePath) => {
                    if (/runtime/g.test(filePath)) {
                        delete compilation.assets[filePath]
                    }
                })
            })
        })
    }


    getInlineChunk(tags, assets) {
        return tags.map((tag) => {
            if (tag.tagName !== 'script') return tag
            const filePath = tag.attributes.src
            if (!/runtime/g.test(filePath)) return tag
            return {
                tagName: 'script',
                innerHTML: assets[filePath].source(),
                closeTag: true
            }
        })
    }

}

module.exports = InlineChunkPlugin