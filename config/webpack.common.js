  const {resolve}=require('path')
  const resolveApp=require('./path')
//   import {resolveApp} from './path'
module.exports=function(env){
    console.log('env',env);
    return {
        entry:'../src/main.js',
        output:{
            path:resolveApp('./build.js')
            // path:resolve(__dirname,'build.js')
        }
    }
}