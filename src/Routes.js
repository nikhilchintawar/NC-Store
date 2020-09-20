import React from 'react';
import {Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import SignUp from './user/signup/SignUp';
import PrivateRoute from './auth/helper/PrivateRoute';
import UserDashboard from './user/UserDashboard';
import SignIn from './user/signin/SignIn';
import Cart from './core/Cart';
import Navbar from './core/navbar/Navbar';


const Routes = () => {
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/cart" component={Cart} />
                <PrivateRoute exact path="/user/dahboard" component={UserDashboard} />
            </Switch>
        </div>
    );
};

export default Routes;