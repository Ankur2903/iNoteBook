import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "",cpassword: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("https://i-note-book-backend-silk.vercel.app/api/auth/createuser", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            // redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange =(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className="container mt-3" style={{marginLeft: "300px"}}>
        <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"  style={{width:"700px"}}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" style={{width:"700px"}}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required  style={{width:"700px"}}/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required  style={{width:"700px"}}/>
        </div>
        <button type="submit" className="btn btn-primary"  style={{color: "white",backgroundColor: "purple", borderRadius: "4px", width: "700px"}}>Submit</button>
        </form>
    </div>
  )
}

export default Signup
