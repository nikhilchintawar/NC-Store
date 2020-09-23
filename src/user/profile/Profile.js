import React, { useState } from 'react';

import "./profile.styles.scss";
import FormInput from '../../components/form-input/FormInput';
import CustomButton from '../../components/custom-button/CustomButton';
import { isAuthenticated } from '../../auth/helper';
import { updateUser } from '../helper/userApiCalls';


const Profile = () => {

    const {user} = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword:"",
        phone:"",
        gender:"",
        error: "",
        success: false
    })

    const {name, email, password, success, error,phone , gender, confirmPassword} = values;

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

        updateUser(user)
            .then(data => {
                if(data){
                    setValues({
                        ...values,
                        error: '',
                        success: true
                    })
                }else{
                    setValues({...values, error: true, success: false})
                }
            })
            .catch(error => console.log(error))
    }


    return (
        <div className="profile">
            <form>
                <FormInput
                    type='text'
                    name='name'
                    value={name}
                    onChange={handleChange}
                    label={user.name}
                />
                <FormInput
                    type='text'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label={user.email}
                />
                <FormInput
                    type='number'
                    name='phone'
                    value={phone}
                    onChange={handleChange}
                    label={user.phone}
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
                <CustomButton onClick={handleSubmit}>UPDATE</CustomButton>
            </form>
        </div>
    );
};

export default Profile;