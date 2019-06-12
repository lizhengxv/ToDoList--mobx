const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    template:path.join(__dirname, './src/index.html'),//源文件
    filename:'index.html' //根据源文件在内存中生成的文件
})

 // webpack 默认只能打包处理 .js文件  .css .vue .png等需要用第三方loader
module.exports = {
    mode:'development' , // development || production
    plugins:[
        htmlPlugin
    ],
   
    module:{
        rules:[
            { 
                test: /\.js|jsx$/, 
                use:{
                   loader:  'babel-loader',
                   options:{
                       presets:['env'],
                    //    plugins:['transform-decorators-legacy']
                       plugins:['transform-decorators-legacy','transform-class-properties']
                   }
                }, 
                exclude:/node_modules/
             },
            // ?modules 表示为css文件启用模块化
            { 
                test:/\.css$/,
                use:['style-loader', 'css-loader'] 
            },
            { 
                test:/\.scss$/, 
                use:[ 'style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]', 'sass-loader' ] },
            {
                test:/\.ttf|woff|woff2|eot|svg$/, 
                use:'url-loader'},
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name]-[hash:5].min.[ext]",
                            limit: 50000, // size <= 20KB
                            publicPath: "static/",
                            outputPath: "static/"
                        }
                    }
                ]
            }
        ]
    },
    resolve:{
        // // 一下类型文件，可忽略后缀名
        extensions:['.js','.jsx', '.json'],
        // // 别名
        alias:{
            '@':path.join(__dirname, './src')
        }
    }
}