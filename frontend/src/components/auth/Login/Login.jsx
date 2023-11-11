import React, { useState } from "react";
import { ToastContainer } from "react-toastify";


const Login = () => {

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

    const loginSubmitHandler = (e) => {
        e.preventDefault()
        console.log(formData)
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