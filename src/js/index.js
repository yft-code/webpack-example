const message="hello world"
const foo=(info)=>{
    console.log(info);
}
foo(message)
axios.get('/api/moment').then().cache()