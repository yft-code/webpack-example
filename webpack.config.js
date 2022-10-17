const path=require('path')//nodejs核心模块，专门用来处理路径问题
// const resolve = (dir) => path.join(__dirname, dir);

// eslint配置
// npm install eslint-webpack-plugin --save-dev
// npm install eslint --save-dev
const ESLintPlugin = require('eslint-webpack-plugin');

// html资源处理,将打包后的文件自动引入html页面
const HtmlWebpackPlugin=require('html-webpack-plugin')

// dev-serve 自动重新打包
module.exports={
  // 入口
  entry:'./src/main.js',//相对路径
  // 出口
  output:{
    // 文件的输出路径
    // path:resolve("dist"),//绝对路径
    // 
    path:path.resolve(__dirname,'dist'),
    filename:'static/js/main.js',
    // 清空上一次的打包记录
    clean:true
  },
  // 加载器
  module:{
    rules: [ 
        {
          test: /\.css$/,
          use: [ 'style-loader', 
                 'css-loader',
                //  'less-loader'//将less编译成css文件
                ]//css打包到js中去了
        },
        // 配置图片不需要下载额外的loader
        {
          test: /\.(png|jpe?g|svg)$/,
          type:"asset",
          parser:{
            dataUrlCondition:{
              // 小于10KB的图片转base64,优点：减少请求资源,
              maxSize:10*1024,
            }
          },
      // 修改输出文件目录，css打包到css，js打包到js  filename:'static/js/main.js'
          generator:{
            filename:"static/images/[hash][ext][query]"
          }
        },
        // 处理字体图片等其他资源
        {
          // map3,mp4,avi等资源配置
          test: /\.(ttf|woff2?)$/,
          type:"asset/resource",
        
      // 修改输出文件目录，css打包到css，js打包到js  filename:'static/js/main.js'
          generator:{
            filename:"static/media/[hash:10][ext][query]"
          }
        },
        // 配置babel
        {
          // map3,mp4,avi等资源配置
          test: /\.js$/,
         exclude:'/node_modules/',//排除module文件
         use:{
          loader:'babel-loader',
          // options:{
          //  presets:['@babel/preset-env']
          // }
       },
      // 修改输出文件目录，css打包到css，js打包到js  filename:'static/js/main.js'
          generator:{
            filename:"static/media/[hash:10][ext][query]"
          }
        }, 
      ]
  },
  // 插件
  plugins:[
    new ESLintPlugin({
    // 只检查src目录下的代码
    context:path.resolve(__dirname,"src")
  }),
   new HtmlWebpackPlugin({
    // 模板,打包生成的html页面与public/index.html页面结构一致
    template:path.resolve(__dirname,"public/index.html")
   })
],
// 启动devServe命令：npx webpack serve
devServer: {
  host: "localhost",
  port: 9000, // 端口号
  open: true, //配置自动启动浏览器
},
  // 模式：开发环境
  mode:'development',
//   lintOnSave:false
}