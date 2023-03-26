// 执行命令,生产模式没有serve,打包输出即可
// npx webpack serve --config ./config/webpack.dev.js
const path=require('path')//nodejs核心模块，专门用来处理路径问题
// const resolve = (dir) => path.join(__dirname, dir);
// eslint配置
// npm install eslint-webpack-plugin --save-dev
// npm install eslint --save-dev
const ESLintPlugin = require('eslint-webpack-plugin');
// html资源处理,将打包后的文件自动引入html页面
const HtmlWebpackPlugin=require('html-webpack-plugin')

// dev-serve 自动重新打包
// 下载 npm i webpack-dev-server -D
module.exports={
  // 入口
  // 绝对路径
  // context:path.resolve(__dirname,'../src'),
  // entry写上相对路径时，并不是相对于文件所在的文件，而是相对于context配置的路径
  // entry:'./main.js',//相对路径
  entry:{
     main:'./src/main.js',
     index:'./src/index.js',
  },
  // 出口
  output:{
    // 文件的输出路径
    path:path.resolve("dist"),//绝对路径
    // path:undefined,
    // 路径相对path的
    filename:'[name]/js/main.js',
    // 清空上一次的打包记录
    clean:true,
    // hash:6,哈希保留6位
    assetModuleFilename:"img/[name].[hash:6].[ext]"
  },
  // 加载器
  module:{
    rules: [ 
      // 从下往上运行
        {
          test: /\.css$/,
          use: [ 'style-loader', 
                 'css-loader',
                //  {
                //   loader:'css-loader',
                //   options:{
                //     // importloaders的取值与后面还有几个loader有关系，
                //     // 后面目前只有postcss-loader一个插件,所以importloaders的值为1
                //     importloaders:1
                //   }
                //  },
                //单独设置一个postcss.config.js文件(文件名固定，不能起其他名字，否则读取不到)进行option的配置
                'postcss-loader'
                ]//css打包到js中去了
        },
    // 使用asset
    // 配置图片不需要下载额外的loader
        {
          test: /\.(png|jpe?g|svg)$/,
          type:"asset",//对应url-loader
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
        // url-loader,
        // 配置asset
        // 小的转base64,大的不转
        // 缺点：需要更多的http请求
        {
          test: /\.(png|jpe?g|svg|gif)$/,
          type:"asset/resource",//对应url-loader
          generator:{
            filename:"static/images/[hash][ext][query]"
          }
        },
        // {
        //   test: /\.(png|jpe?g|svg|gif)$/,
        //    use:[
        //     {
        //       loader:"file-loader",
        //       // way1
        //       // options:{
        //       //   name:'[name].[hash:6].[ext]',
        //       //   outputPath:"img"
        //       // }
        //       // way2(推荐使用且常见)
        //       options:{
        //         name:'img/[name].[hash:6].[ext]'
        //       }
        //     }
        //    ]
        // },
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
         
          test: /\.js$/,
         exclude:'/node_modules/',//排除module文件
         use:{
          loader:'babel-loader',
          options:{
           presets:['@babel/preset-env']
          }
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
    context:path.resolve(__dirname,"../src")
  }),
   new HtmlWebpackPlugin({
    // 模板,打包生成的html页面与public/index.html页面结构一致
    template:path.resolve(__dirname,"../public/index.html"),
    title:"codewhy webpack"
   })
],
// 启动devServe命令：npx webpack serve
devServer: {
  host: "localhost",
  port: 8000, // 端口号
  open: true, //配置自动启动浏览器
},
  // 模式：开发环境
  mode:'production',
//   lintOnSave:false
}