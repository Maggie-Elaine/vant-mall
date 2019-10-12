const path=require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports={
    entry:'./src/main.js',
    output:{
        path:path.resolve('./dist'),
        filename:'bundle.js'
    },
    resolve:{
        //配置全局npm路径
        // modules:['C:\\Users\\ben\\AppData\\Roaming\\npm\\node_modules','node_modules'],
        alias:{'vue$':'vue/dist/vue.js'}
    },
    mode:'development',//production development
    devServer:{
        port:8080,
        contentBase:'src',
        // host: '192.168.1.1' //配置浏览地址
    },
    plugins:[
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {test:/\.vue$/,use:['vue-loader']},
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader',{loader: 'style-resources-loader',options: {patterns: path.resolve(__dirname, './src/css/common.less')}}]},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test: /\.(ttf|eot|svg|woff|woff2)$/,use:['url-loader']},
            {test: /\.(jpg|png|gif|bmp|jpeg|webp)$/,use:['url-loader?limit=10240&name=[hash:8]-[name].[ext]']},

        ]
    },
    

}