const axios=require('axios')

const obj={
    title:"wqpeoiq",
    desc:"qwekpoqe"
}

axios.post('http://localhost:3000/todo',JSON.stringify(obj)).then((r)=>{console.log(r)})