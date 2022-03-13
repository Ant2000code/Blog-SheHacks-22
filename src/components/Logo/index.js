import React from 'react';
import './style.css';
import { useState } from 'react';
import axios from 'axios';
const Logo = (props) => {
  const [name, setname] = useState("");
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: "Token "+localStorage.getItem('token')
  }
axios.get('http://localhost:8000/details/')
.then((response)=>{
    const user= response.data[0];
    
    setname(user.username);
})
.catch(error=>console.log(error));

  return(
    <div className="logo">
        <a href="#">{name}</a>
    </div>
   )

 }

export default Logo