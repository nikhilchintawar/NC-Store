import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Base from "../core/Base";
import {signUp} from "../auth/helper/index";

const SignUp = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const {name, email, password, success, error} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false})
        signUp({name, email, password})
            .then(data => {
                console.log("DATA", data);
                if(data.email === email){
                    setValues({
                        ...values,
                        name:"",
                        email:"",
                        password:"",
                        error: "",
                        success: true
                    })
                }else{
                    setValues({
                        ...values,
                        error: true,
                        success: false
                    })
                }
            })
            .catch(error => console.log(error))
    }

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                        className="alert alert-success"
                        style={{display: success ? "" : "none"}}
                        >
                        signed up successfully.<Link to="/signin">Login Here</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                        className="alert alert-danger"
                        style={{display: error ? "" : "none"}}
                        >
                        check all fields.
                    </div>
                </div>
            </div>
        )
    }

    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={handleChange("name")} 
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input 
                                type="text" 
                                value={email} 
                                onChange={handleChange("email")} 
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={handleChange("password")} 
                                className="form-control"
                            />
                        </div>
                        <button onClick={handleSubmit} className="btn btn-success btn-block">SUBMIT</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Sign Up page" description="A sign up for user">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
        </Base>
    );
};

export default SignUp;