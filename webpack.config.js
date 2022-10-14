const path=require('path')//nodejs核心模块，专门用来处理路径问题
// const resolve = (dir) => path.join(__dirname, dir);
module.exports={
  // 入口
  entry:'./src/main.js',//相对路径
  // 出口
  output:{
    // 文件的输出路径
    // path:resolve("dist"),//绝对路径
    path:path.resolve(__dirname,'dist'),
    filename:'main.js'
  },
  // 加载器
  module:{
    rules:[],
  },
  // 插件
  plugins:[],
  // 模式
  mode:'development',
//   lintOnSave:false
}