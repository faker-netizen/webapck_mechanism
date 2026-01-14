class CleanPlugin {
    constructor(props) {
    }

    apply(compiler) {
        const outputPath = compiler.options.output.path
        const fs = compiler.outputFileSystem
        compiler.hooks.emit.tapAsync('CleanPlugin', (compilation, callback) => {
            this.rmFiles(fs, outputPath)
            callback()
        })
    }

    rmFiles(fs, path) {
        const files = fs.readdirSync(path)
        files.forEach(file => {
            //判断是否是文件夹
            if (fs.statSync(path + '/' + file).isDirectory()) {
                this.rmFiles(fs, path + '/' + file)
                fs.rmdirSync(path + '/' + file)
            } else {
                fs.unlinkSync(path + '/' + file)
            }
        })
        console.log(files)
    }
}

module.exports = CleanPlugin