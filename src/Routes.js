import React from 'react';
import {Switch, Route} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from 'react-toastify';


import Shop from "./core/shop/Shop";
import SignUp from './user/signup/SignUp';
import PrivateRoute from './auth/helper/PrivateRoute';
import UserDashboard from './user/UserDashboard';
import SignIn from './user/signin/SignIn';
import Cart from './core/Cart';
import Navbar from './core/navbar/Navbar';
import Directory from './core/directory/Directory';


const Routes = () => {
    return (
        <div>
            <Navbar />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Directory} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/cart" component={Cart} />
                <PrivateRoute exact path="/user/dahboard" component={UserDashboard} />
            </Switch>
        </div>
    );
};

export default Routes;