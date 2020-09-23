import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './signup.styles.scss';
import { signUp } from '../../auth/helper';
import FormInput from '../../components/form-input/FormInput';
import CustomButton from '../../components/custom-button/CustomButton';
import { ShowToastMessage } from '../utils/utils';


const SignUp = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword:"",
        error: "",
        success: false
    })

    const {name, email, password, success, error, confirmPassword} = values;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues(prevState => ({
            ...prevState,
            error:false,
            [name]:value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Please check your password, Password doesn't match.");
            return;
        }

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

    // const errorMessage = () => {
    //     const customId = 'errorId';
    //     return(   
    //             <div>
    //                 {
    //                  error && toast("check all fields.", {
    //                             position:"top-right",
    //                             className:"errorMessage",
    //                             toatId:customId,
    //                             autoClose: 5000,
    //                             hideProgressBar: true,
    //                             closeOnClick: true,
    //                             pauseOnHover: false,
    //                             draggable: true,
    //                             progress: undefined,
    //                         })
    //                 }
    //             </div>
    //     )
    // }

    const signUpForm = () => {
        return(
            <div className="signup">
                <div className="col-md-6 offset-sm-3 text-left">
                <p className="title">*If you already have an account <Link to='/signin'>Sign In</Link> here.</p>
                    <form>
                        <FormInput
                            type='text'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            label='Display Name'
                            required
                        />
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
                        <FormInput
                            type='password'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleChange}
                            label='Confirm Password'
                            required
                        />
                        <CustomButton onClick={handleSubmit}>SUBMIT</CustomButton>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div>
            {successMessage()}
            <ShowToastMessage 
                value={error}
                customIdValue="errorId"
                toastMessage="Check all fields."
                color="red"
            />
            {signUpForm()}
            {/* <p className="text-black text-center">
                {JSON.stringify(values)}
            </p> */}
        </div>
    );
};

export default SignUp;