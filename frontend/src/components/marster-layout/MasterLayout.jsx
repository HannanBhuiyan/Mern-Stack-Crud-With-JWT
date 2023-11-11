import React from "react";
import Navbar from "../commonCompnents/Navbar";
import { ToastContainer } from "react-toastify";


const MasterLayout = ({ children }) => {


    return(
        <>
            <div className="main-layout">
                <div className="container">
                    <div className="main-layout-inner">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="sidebar">
                                    <Navbar /> 
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="main-layout_inner">
                                    { children }
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    )

}

export default MasterLayout