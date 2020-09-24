import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./signinmodal.styles.scss";
import { signIn, authenticate } from '../../auth/helper';
import FormInput from '../../components/form-input/FormInput';
import CustomButton from '../../components/custom-button/CustomButton';
import { ShowToastMessage } from '../utils/utils';


const SignInModal = ({toggleModal}) => {

    const [values, setValues] = useState({
        name: "",
        email: "nikhil@n.com",
        password: "12345",
        error:"",
        success: false,
        loading: false
    })

    const {email, password, success, error, loading} = values;

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
                    toggleModal()
                    setValues({
                        ...values,
                        success: true,
                        error: false
                    })
                })
            }else{
                setValues({
                    ...values,
                    error: true,
                    loading: false
                })
            }
        })
        .catch(error => console.log(error))
    }

    const signInForm = () => {
        return(
            <div>
                <h2 className='title'>I do not have a account</h2>
                <span>You need to sign up to add products in cart.</span>
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
                        <div className="modal-footer">
                            <CustomButton onClick={handleSubmit}>SIGN IN</CustomButton>
                            <CustomButton onClick={toggleModal}>CLOSE</CustomButton>
                        </div>
                    </form>
                </div>
        )
    }


    return (
        <div>
            <ShowToastMessage 
                value={loading}
                customIdValue="loadingId"
                toastMessage="loading..."
                color="#000000"
            />
            <ShowToastMessage 
                value={success}
                customIdValue="successId"
                toastMessage="Signed in successfully.."
                color="#000000"
            />
            <ShowToastMessage 
                value={error}
                customIdValue="errorId"
                toastMessage="Check all fields."
                color="red"
            />
            {signInForm()}
            {/* <p className="text-center">{JSON.stringify(values)}</p> */}
        </div>
    );
};

export default SignInModal;