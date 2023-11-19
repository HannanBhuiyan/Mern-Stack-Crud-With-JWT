import React from "react";
 
import { Link, NavLink } from 'react-router-dom' 

const Navbar = () => {

    const removeLocalstorage = () => { 
        localStorage.clear()
        window.location.href = "/login"
    }

    return(
        <>
        <nav className="navbar_section"> 
            <div className="menu">
                <ul>
                    <li>
                        <NavLink className={({isActive}) =>  (isActive ? 'active_menu' : '' )} to="/">Home</NavLink>
                    </li> 
                    <li>
                        <NavLink className={({isActive}) =>  (isActive ? 'active_menu' : '' )} to="/create-student">Create</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) =>  (isActive ? 'active_menu' : '' )} to="/profile">Profile</NavLink>
                    </li> 
                     
                    <li className="text-center">
                        <button onClick={removeLocalstorage} className="btn btn-success" >Logout</button>
                    </li> 
                </ul> 
            </div> 
        </nav> 
        </>
    )
}

export default Navbar