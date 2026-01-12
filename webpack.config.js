const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
    entry:'./src/main.js',
    output:{
        filename:'js/[name].js',
        path:path.resolve(__dirname,'dist'),
        clean:true
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins:[new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'public/index.html')
    })],
    mode:'development',
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        compress:true,
        port:9000
    }
}