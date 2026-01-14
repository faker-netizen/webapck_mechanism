class TestPlugin {
    //config中会new TestPlugin
    //webpack会创建complier对象
    //遍历所有插件中的apply方法
    //执行剩下的编译流程（hooks）
    constructor() {
        console.log('TestPlugin constructor')
    }

    apply(compiler) {
        console.log('TestPlugin apply')
        compiler.hooks.environment.tap('TestPlugin', () => {
            console.log('TestPlugin environments')
        })
        // 异步串行
        compiler.hooks.emit.tap('TestPlugin', (compilation) => {
            console.log('TestPlugin emit')
        })
        compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
            console.log('TestPlugin emit 2')
            setTimeout(() => {
                console.log('TestPlugin emit 3')
                callback()
            }, 1000)
        })
        compiler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
            return new Promise((resolve) => {
                console.log('TestPlugin emit 4')
                setTimeout(() => {
                    console.log('TestPlugin emit 5')
                    resolve()
                }, 1000)
            })
        })
        //异步并行
        compiler.hooks.make.tapAsync('TestPlugin', (compilation,callback) => {
            compilation.hooks.seal.tap('TestPlugin', (compilation) => {
                console.log('TestPlugin seal')
            })
            setTimeout(() => {
                console.log('TestPlugin emit 666')
                callback()
            }, 3000)
        })
        compiler.hooks.make.tapAsync('TestPlugin', (compilation,callback) => {
            setTimeout(() => {
                console.log('TestPlugin emit 888')
                callback()
            }, 2000)
        })
        compiler.hooks.make.tapAsync('TestPlugin', (compilation,callback) => {
            setTimeout(() => {
                console.log('TestPlugin emit 777')
                callback()
            }, 1000)
        })
    }

}

module.exports = TestPlugin