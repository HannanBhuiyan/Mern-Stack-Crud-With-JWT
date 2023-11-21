import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
const BASE_URL = 'http://localhost:4000/api/v1/registration/' 

const Registration = () => {

    const navigator = useNavigate()

    const [fnameError, setfNameError] = useState("")
    const [lnameError, setlNameError] = useState("")
    const [mobileError, setMobileError] = useState("")
    const [emailError, setlEmailError] = useState("")
    const [passwordError, setlPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        comfirm_password: "",
    })

    const onchangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const registerSubmitHandler = async (e) => {
        e.preventDefault()
        await axios.post(BASE_URL, formData)
        .then((res) => { 
            if(res.status === 200) {
                navigator('/login')
                toast.success('Registration Success', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        })
        .catch((err) => {
            setfNameError(err.response.data.error.firstName)
            setlNameError(err.response.data.error.lastName) 
            setMobileError(err.response.data.error.mobile) 
            setlEmailError(err.response.data.error.email) 
            setlPasswordError(err.response.data.error.password) 
            setConfirmPasswordError(err.response.data.error.comfirm_password) 
        })
    }

    const errorStyle = { 
        color: "red", 
        fontSize: "16px", 
        fontWeight: "600", 
        marginTop: "6px" 
    }


    return (
        <>
            <div className="auth_section" style={{ marginTop: "100px" }}>
                <div className="container">
                    <div className="auth_inner">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                               <div className="card p-3">
                                    <form onSubmit={registerSubmitHandler} >
                                        <div className="form-group mb-3">
                                            <label className="mb-2" >First Name</label>
                                            <input type="text" name="firstName" onChange={onchangeHandler} className="form-control" placeholder="First Name" />
                                            <p style={errorStyle} >{fnameError && fnameError }</p>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="mb-2" >Last Name</label>
                                            <input type="text" name="lastName" onChange={onchangeHandler} className="form-control" placeholder="Last Name" />
                                            <p style={errorStyle}>{lnameError && lnameError }</p>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="mb-2" >Mobile</label>
                                            <input type="number" name="mobile"  onChange={onchangeHandler} className="form-control" placeholder="Mobile" />
                                            <p style={errorStyle}>{mobileError && mobileError }</p>
                                        </div> 
                                        <div className="form-group mb-3">
                                            <label className="mb-2" >Email</label>
                                            <input type="text" name="email"  onChange={onchangeHandler} className="form-control" placeholder="Email" />
                                            <p style={errorStyle}>{emailError && emailError }</p>
                                        </div> 
                                        <div className="form-group mb-3">
                                            <label className="mb-2" >Password</label>
                                            <input type="password" name="password" onChange={onchangeHandler} className="form-control" placeholder="Password" />
                                            <p style={errorStyle}>{passwordError && passwordError }</p>
                                        </div> 
                                        <div className="form-group mb-3">
                                            <label className="mb-2" >Confirm Password</label>
                                            <input type="password" name="comfirm_password" onChange={onchangeHandler} className="form-control" placeholder="Confirm Password" />
                                            <p style={errorStyle}>{confirmPasswordError && confirmPasswordError}</p>
                                        </div>  
                                        <input type="submit" value="Register" className="form-control bg-info" />
                                    </form>
                                    <div className="text-center mt-3">
                                        <Link to="/login" >Login</Link>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </>
    )
}

export default Registration;