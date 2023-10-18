const fs=require('fs')
function postToDB(obj) {
    fs.readFile('./db.json', 'utf-8', (err, data) => {
        if (err) {
            return `${err}`;
        } else {
            if (data === undefined || data.length == 0) {
                fs.writeFile('./db.json', JSON.stringify(data), (err) => {
                    if (err) {
                        return `${err}`;
                    }
                });
            } else {
                const todos = JSON.parse(data);
                todos.push(obj);
                fs.writeFile('./db.json', JSON.stringify(todos), (err) => {
                    if (err) {
                        return `${err}`;
                    }
                });
            }
        }
        return "success";
    });
}

module.exports={postToDB};