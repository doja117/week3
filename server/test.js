const axios=require('axios')
const obj = {
    title: "doja",
    description:22
}
fetch('http://localhost:3001/todos',{
    method:"GET"
}).then((r)=>{
    r.json().then((d)=>{
        console.log(d);
    })
})



