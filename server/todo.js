const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
function postToDB(obj) {
    
}
// Use bodyParser.json() as a middleware function
app.use(bodyParser.json());

app.get('/', (req, resp) => {
    resp.send("Working");
});

app.post('/todo', (req, resp) => {
    const obj = req.body;
    console.log(obj);
    fs.readFile('./db.json', 'utf-8', (err, data) => {
        if (err) {
            resp.status(400);
        } else {
            if (data === undefined || data.length == 0) {
                fs.writeFile('./db.json', JSON.stringify(data), (err) => {
                    if (err) {
                        resp.status(400);
                    }
                });
            } else {
                const todos = JSON.parse(data);
                todos.push(obj);
                fs.writeFile('./db.json', JSON.stringify(todos), (err) => {
                    if (err) {
                        resp.status(400)
                    } else{
                        resp.status(200).send("success")
                    }
                });
            }
        }
        
    });
});

app.listen(3000, () => {
    console.log("Started Listening");
});