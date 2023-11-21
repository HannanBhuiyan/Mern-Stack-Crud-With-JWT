import axios from "axios";
import React, { useRef, useState } from "react";
import { ToastContainer } from "react-toastify"; 
import { setToken, setUserDetails } from "../../helpers/SessionHelper";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = 'http://localhost:4000/api/v1/login' 

const Login = () => {

    const navigator = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
 

    const onchangeHandler = (e) => {
        const { name, value } = e.target
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const loginSubmitHandler = async (e) => {
        e.preventDefault() 

        await axios.post(BASE_URL, formData)
        .then((res) => {
            if(res.status === 200) {
                setToken(res.data['token'])
                setUserDetails(res.data['user'])
               window.location.href = "/"
            }
             
        })
        .catch((error) => {
            console.log(error)
        })
 
    } 


    return(
        <>
              <div className="auth_section" style={{ marginTop: "100px" }}>
                <div className="container">
                    <div className="auth_inner">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                               <div className="card p-3">
                                    <form onSubmit={loginSubmitHandler} >  
                                        <div className="form-group mb-3">
                                            <label className="mb-2" >Email</label>
                                            <input type="text" name="email"  onChange={onchangeHandler} className="form-control" placeholder="Email" />
                                        </div> 
                                        <div className="form-group mb-3">
                                            <label className="mb-2" >Password</label>
                                            <input type="password" name="password" onChange={onchangeHandler} className="form-control" placeholder="Password" />
                                        </div>   

                                        <input type="submit" value="Login" className="form-control bg-info" />

                                        <div className="text-center mt-3">
                                            <Link to="/registration" >Registration</Link>
                                        </div>
                                    </form>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            </div>
        </>
    )
}

export default Login