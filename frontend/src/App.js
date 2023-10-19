import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
    function sendData() {
        const obj = {
            title,
            description
        }
        fetch('http://localhost:3000/todos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then((r) => {
            console.log("success");
        }).catch((e) => {
            console.log(e);
        })
    }

  return (
    <div>
      <input
        placeholder='title'
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <input
        placeholder='desc'
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      />
      <br />
      <button onClick={sendData}>Send Data</button>
    </div>
  );
}

export default App;