import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Base from "../core/Base";
import { signIn, authenticate, isAuthenticated } from '../auth/helper';


const SignIn = () => {

    const [values, setValues] = useState({
        name: "",
        email: "nikhil@n.com",
        password: "12345",
        error:"",
        success: false,
        loading: false,
        didRedirect: false
    })

    const {name, email, password, success, error, loading, didRedirect} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true})
        
        signIn({email, password}).then(data => {
            console.log(data)
            if(data.token){
                // let sessionToken = data.token
                authenticate(data, () => {
                    console.log("token added");
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                })
            }else{
                setValues({
                    ...values,
                    loading: false
                })
            }
        })
        .catch(error => console.log(error))
    }

    const performRedirect = () => {
        if(isAuthenticated()){
            return(
                <Redirect to="/" />
            )
        }
    }

    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert-alert-info">
                    <h2>LOADING...</h2>
                </div>
            )
        )
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

    const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
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
        <Base title="welcome to sign in page." description="T-shirt store.">
            {loadingMessage()}
            {successMessage()}
            {errorMessage()}
            {signInForm()}
            <p className="text-center">{JSON.stringify(values)}</p>
            {performRedirect()}
        </Base>
    );
};

export default SignIn;