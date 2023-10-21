import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';



function DataDisplay() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [div,setDiv]=useState();

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
          
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <b><h3>Title  :{" "+item.title}</h3></b>
                 <b><h7>Description:  {item.description}</h7></b>
              </li>
            ))}
          </ul>
        </div>
      );
    })())
   
  }, [data]);

  if (error) {
    return <div>Error in data fetching: {error.message}</div>;
  }

  return div

  
}




function App() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [div,setDiv]=useState();

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
      }}>Send Data</button>
        <DataDisplay />
    </div>
  );
}

export default App;