import React from "react";
 
import { Link } from 'react-router-dom'

const Navbar = () => {
    return(
        <>
        <nav className="navbar navbar-expand-lg">
            <div className="container"> 
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li> 
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/create-student">Create</Link>
                        </li> 
                    </ul> 
                </div>
            </div>
        </nav> 
        </>
    )
}

export default Navbar