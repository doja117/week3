import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';





function App() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [sent,setSent]=useState(0);

  const [div,setDiv]=useState();

function DataDisplay() {
    useEffect(() => {
    fetch('http://localhost:3001/todos', {
      method: "GET"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  useEffect(() => {
    setDiv((function (){
      return (
        <div>
          <h1>Data Display</h1>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                {item.title} {item.description}
              </li>
            ))}
          </ul>
        </div>
      );
    })())
   
  }, [data,sent]);

  if (error) {
    return <div>Error in data fetching: {error.message}</div>;
  }

  return div

  
}


      function sendData(){
             //console.log(obj);
            fetch("http://localhost:3001/todos",{
            headers: {
                 'Content-Type': 'application/json'
                },
            method:"POST",
            body:JSON.stringify({
                title,
                description:desc  
            })
        }).then((r)=>{
          r.json().then((d)=>{console.log(d)})
          
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
      <button onClick={()=>{
        sendData()
        setSent(sent+1)
      }}>Send Data</button>
        <DataDisplay />
    </div>
  );
}

export default App;