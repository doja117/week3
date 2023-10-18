const bodyParser = require('body-parser')
const express=require('express')
const fs=require('fs')
const app=express()
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // This allows any origin to access the resource. Be cautious with '*' in production.
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/',(req,resp)=>{
  resp.send("test")
})
app.post('/todo',(req,resp)=>{
  const obj=req.body;
  console.log(obj)
  fs.readFile('./db.json','utf-8',(err,data)=>{
    if(err){
        console.log(err);
    } else{
        if (data===undefined || data.length===0){
            fs.writeFile('./db.json',JSON.stringify(obj[0]),(err)=>{
                if(err){resp.send('error').status(404)}
                else{
                  resp.send("success")
                }
            })
        } else{
        let newdata=JSON.parse(data);
        newdata.push(obj[0]);
        fs.writeFile('./db.json',JSON.stringify(newdata),(err)=>{
            if(err){
                console.log(err);
            } else{
              resp.send("success")
            }
        })}
    }
})
})

app.get('/todo',(req,resp)=>{
  fs.readFile('./db.json','utf-8',(err,data)=>{
    if(err){
      resp.send("error").status(404);
    } else{
      resp.send(JSON.parse(data)).status(200)
    }
  })
})

app.get('/song',(req,resp)=>{
  console.log(__dirname+"/song.mp4");
  resp.sendFile(__dirname+"/song.mp4")
})

app.delete('/todo',(req,resp)=>{
  fs.readFile('./db.json','utf-8',(err,data)=>{
    if(err){
      resp.send("error").status(404);
    } else{
        let newData=JSON.parse(data);
        let obj=req.body[0];
        let idx=-1;
        for (let i=0;i<newData.length;i++){
          if(newData[i].name===obj.name){
            idx=i;
          }
        }
        if (idx===-1){
          resp.send("No docs found").status(404);
        } else{
          newData.splice(idx,1);
          fs.writeFile('./db.json',JSON.stringify(newData),(err)=>{
            if(err){
              resp.send("error").status(404);
            } else{
              resp.send("success").status(201);
            }
          })
        }
    }
  })
})


app.listen(3000);