const obj = {
    title: "doja",
    description:22
}

fetch('http://localhost:3000/todos', {
    method:"GET"
}).then((r) => {
    console.log(r);
    }).catch((e) => {
        console.log("error")
    })
