import React, { Fragment } from 'react';
import {Link, withRouter} from "react-router-dom";
import { signOut, isAuthenticated } from '../auth/helper';


const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return{
            color: "#2ecc72"
        }
    }else{
        return {color: "#ffffff"}
    }
}

const Menu = ({history, path}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={currentTab(history, "/")}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cart" style={currentTab(history, "/cart")}>Cart</Link>
                </li>
                {
                    isAuthenticated() && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/dashboard" style={currentTab(history, "/user/dashboard")}>Dashboard</Link>
                        </li>
                    )
                }
                {
                    !isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup" style={currentTab(history, "/signup")}>Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin" style={currentTab(history, "/signin")}>Sign In</Link>
                            </li>
                        </Fragment>
                    )
                }
                {
                    isAuthenticated() && (
                        <li className="nav-item">
                            <span
                            onClick={() => {
                                signOut(() => {
                                    history.push("/signin")
                                })
                            }}
                            className="nav-link text-warning">
                                Sign Out
                            </span>
                        </li>
                    )
                }

            </ul>
        </div>
    );
};

export default withRouter(Menu);