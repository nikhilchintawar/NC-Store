import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import "./signin.styles.scss";
import { signIn, authenticate, isAuthenticated } from '../../auth/helper';
import FormInput from '../../components/form-input/FormInput';
import CustomButton from '../../components/custom-button/CustomButton';


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

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues(prevState => ({
            ...prevState,
            error:false,
            [name]:value}))
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
                <h2 className='title'>I do not have a account</h2>
                <span><Link to='/signup'>Sign up</Link> here.</span>
                    <form>
                        <FormInput
                            type='text'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            label='Email'
                            required
                        />
                        <FormInput
                            type='password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                            label='Password'
                            required
                        />
                        <CustomButton onClick={handleSubmit}>SIGN IN</CustomButton>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <div>
            {loadingMessage()}
            {successMessage()}
            {errorMessage()}
            {signInForm()}
            {/* <p className="text-center">{JSON.stringify(values)}</p> */}
            {performRedirect()}
        </div>
    );
};

export default SignIn;