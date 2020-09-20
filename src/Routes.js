import React from 'react';
import {Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import SignUp from './user/SignUp';
import PrivateRoute from './auth/helper/PrivateRoute';
import UserDashboard from './user/UserDashboard';
import SignIn from './user/SignIn';
import Cart from './core/Cart';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/user/dahboard" component={UserDashboard} />
        </Switch>
    );
};

export default Routes;