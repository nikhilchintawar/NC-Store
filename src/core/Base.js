import React from 'react';
import Directory from "./directory/Directory";

const Base = ({
    title="My Title",
    description="My desscription",
    className = "bg-dark text-white p-4",
    children
}) => {
    return (
        <div>
        <Directory />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>
                    {children}
                </div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>Catch me on instagram.</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                    <div className="container">
                        <span className="text-white">
                            An Amaing django React course
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Base;