import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    
    
    let history=useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
       const {name,email,password}=credentials;
        const response = await fetch("localhost:5000/api/auth/createuser", {
          // 
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
             
            },
            body: JSON.stringify({name,email,password})
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
    <div className='container'>

<form onSubmit={handlesubmit}>
    
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control"value={credentials.email} onChange={onchange} id="name" name="name" aria-describedby="emailHelp"/>
      
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control"value={credentials.email} onChange={onchange} id="email" name="email" aria-describedby="emailHelp"/>
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control"value={credentials.password} onChange={onchange} id="password" name="password"/>
    </div>
    <div class="mb-3">
      <label for="cpassword" class="form-label">Confirmed Password</label>
      <input type="cpassword" class="form-control"value={credentials.password} onChange={onchange} id="cpassword" name="cpassword"/>
    </div>
    
    <button type="submit" class="btn btn-primary" >Submit</button>
  </form>
    </div>
  )
}

export default Signup