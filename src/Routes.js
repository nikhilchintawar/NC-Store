import React from 'react';
import {Switch, Route} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from 'react-toastify';


import Shop from "./core/shop/Shop";
import SignUp from './user/signup/SignUp';
import PrivateRoute from './auth/helper/PrivateRoute';
import UserDashboard from './user/dashboard/UserDashboard';
import SignIn from './user/signin/SignIn';
import Cart from './core/cart/Cart';
import Navbar from './core/navbar/Navbar';
import Profile from './user/profile/Profile';
// import Directory from './core/directory/Directory';


const Routes = () => {
    return (
        <div>
            <Navbar />
            <ToastContainer />
            <Switch>
                {/* <Route exact path="/" component={Directory} /> */}
                <Route exact path="/" component={Shop} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <PrivateRoute exact path="/cart" component={Cart} />
                <PrivateRoute exact path="/dashboard/:userName" component={UserDashboard} />
                <PrivateRoute exact path="/user/profile" component={Profile} />
            </Switch>
        </div>
    );
};

export default Routes;