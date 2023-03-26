// 路径分离
const path=require('path')
// 获取启动时的目录
const appDir=process.cwd()
const resolveApp=(relativePath)=>path.resolve(appDir,relativePath)
export default resolveApp