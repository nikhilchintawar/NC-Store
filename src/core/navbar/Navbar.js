import React, { Fragment } from 'react';
import {Link, withRouter} from "react-router-dom";

import "./navbar.styles.scss";
import { signOut, isAuthenticated } from '../../auth/helper';


const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return{
            backgroundColor: "#ffffff",
            color: "#000000"
        }
    }else{
        return {color: "#ffffff"}
    }
}

const Menu = ({history, path}) => {
    return (
        <div className="navbar">
            <Link className="logo-container" to="/">
                <p className="logo">NC</p>
            </Link>
            <div className="options">
                    <Link 
                        className="option" 
                        to="/shop" 
                        style={currentTab(history, "/shop")}
                    >
                        Shop
                    </Link>
                {
                    isAuthenticated() && (
                    <>
                    <Link 
                        className="option" 
                        to="/user/dashboard" 
                        style={currentTab(history, "/user/dashboard")}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        className="option" 
                        to="/cart" 
                        style={currentTab(history, "/cart")}
                    >
                        Cart
                    </Link>
                    </>
                    )
                }
                {
                    !isAuthenticated() && (
                        <Fragment>
                             <Link 
                                className="option" 
                                to="/signup" 
                                style={currentTab(history, "/signup")}
                            >
                                Sign Up
                        </Link>
                        <Link 
                            className="option" 
                            to="/signin" 
                            style={currentTab(history, "/signin")}
                        >
                            Sign In
                        </Link>
                       </Fragment>
                    )
                }
                {
                    isAuthenticated() && (
                            <span
                                className="option nav-link text-warning"
                                onClick={() => {
                                    signOut(() => {
                                        history.push("/signin")
                                    })
                                }}
                            >
                                Sign Out
                            </span>
                            
                    )
                }

            </div>
        </div>
    );
};

export default withRouter(Menu);