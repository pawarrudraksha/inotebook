import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";


const Signup = (props) => {
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    const host="http://localhost:5000"
    let navigate=useNavigate()
    
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const {name,email,password,cpassword}=credentials
        if(password===cpassword){
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({name,email,password}) 
            });
            const json=await response.json()
            console.log(json);
            if(json.success){
                localStorage.setItem('token' , json.authToken);
                navigate("/");
                props.showAlert("Account created ","success")
            }
            else{
                props.showAlert("Invalid credentials","danger")
            }
        }
        else{
            props.showAlert("Password do not match","danger")
        }
    }
    const onChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }  

    return (
        <div className="container mt-3" >
        Create an Account to use iNotebook !
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="name" className="form-label">
                Name
            </label>
            <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                onChange={onChange}
                name="name"
            />
            <div className="mb-3">
            <label htmlFor="email" className="form-label">
                Email address
            </label>
            <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={onChange}
                name="email"
            />
            </div>
            <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="password" className="form-label">
                Password
            </label>
            <input
                type="password"
                className="form-control"
                id="password"
                onChange={onChange}
                name="password"
                minLength={5}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
                Confirm Password
            </label>
            <input
                type="password"
                className="form-control"
                id="cpassword"
                onChange={onChange}
                name="cpassword"
                minLength={5}
                required
            />
            </div>
            <button type="submit" className="btn btn-primary">
            Submit
            </button>
        </form>
        </div>
    );
    };

export default Signup;
