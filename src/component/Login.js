import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials,setCredentials]=useState({email:"",password:""});
    
    
    let history=useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
             
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
           });
           const json=await response.json();
           console.log(json);
           if (json) {
            localStorage.setItem("token", json.authtoken);
            history.push('/');
            
        }
           else{
            alert("Invalid credentials")
           }
    }
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }
  return (
    <div>
        <form onSubmit={handlesubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control"value={credentials.email} onChange={onchange} id="email" name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control"value={credentials.password} onChange={onchange} id="password" name="password"/>
  </div>
  
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>

    </div>
  )
}

export default Login