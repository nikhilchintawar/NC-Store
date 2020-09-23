import React, { Fragment, } from 'react';
import {Link, withRouter} from "react-router-dom";

import "./navbar.styles.scss";
import { signOut, isAuthenticated } from '../../auth/helper';
import CartIcon from '../../components/cart-icon/CartIcon';


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

const Navbar = ({history}) => {
    
    const {user} = isAuthenticated()

    return (
        <div className="navbar">
            <Link className="logo-container" to="/">
                <p className="logo">NC</p>
            </Link>
            <div className="options">
                    <Link 
                        className="option" 
                        to="/" 
                        style={currentTab(history, "/")}
                    >
                        Shop
                    </Link>
                {
                    isAuthenticated() && (
                    <>
                    <Link 
                        className="option" 
                        to={`/dashboard/${user.name}`}
                        style={currentTab(history, `/dashboard/${user.name}`)}
                    >
                        Dashboard
                    </Link>
                        
                    <CartIcon />
                    
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

export default withRouter(Navbar);