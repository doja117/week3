const fs=require('fs')


const obj=[{
    name:"doja",
    age:22
}]

fs.readFile('./db.json','utf-8',(err,data)=>{
    if(err){
        console.log(err);
    } else{
        if (data===undefined || data.length===0){
            fs.writeFile('./db.json',JSON.stringify(obj),(err)=>{
                if(err){console.log(err);}
            })
        } else{
        let newdata=JSON.parse(data);
        newdata.push(obj);
        fs.writeFile('./db.json',JSON.stringify(newdata),(err)=>{
            if(err){
                console.log(err);
            }
        })}
    }
})