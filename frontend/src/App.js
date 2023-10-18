import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const sendData = () => {
    console.log({ title, desc });
    axios
      .post("http://localhost:3000/todo", {
        title,
        desc
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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