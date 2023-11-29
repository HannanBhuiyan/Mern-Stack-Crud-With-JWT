import React, { useState } from "react";
import { getLocalEmail } from "../../helpers/SessionHelper";
import { ToastContainer, toast } from "react-toastify";
import { createNewPasswordRequest } from "../../services/authServices";
import { useNavigate } from "react-router-dom";


const CreatePassword = () => {

    let email = getLocalEmail()
    const navigator = useNavigate()
    const [password, setPassword] = useState("")
    const [conPassword, setConPassword] = useState("")

    const createNewPassword = (e) => {
        e.preventDefault()
        if(password === conPassword){
            createNewPasswordRequest(password)
            .then(res => {
                if(res === true){
                    toast.success('Password Recovery Success', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                    navigator('/login')
                   }, 7000);
                } 
                else {
                    console.log(res.response.data.message)
                }
            })
            .catch(error => {
                console.log(error.response.data.message)
            })
        }
        else {
            toast.error('Password & Confirm Password does not match', {
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
    }


    return(
        <>
            <div className="auth_section" style={{ marginTop: "100px" }}>
                <div className="container">
                    <div className="auth_inner">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                               <div className="card p-3">
                                    <form onSubmit={createNewPassword} >  
                                        <div className="form-group mb-3">
                                            <label className="mb-2" >Email</label>
                                            <input type="text" value={email} name="email" disabled className="form-control" placeholder="Email" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="mb-2" >Password</label>
                                            <input type="text" name="password"  onChange={(e) => { setPassword(e.target.value) }} className="form-control" placeholder="Password" />
                                        </div> 
                                        <div className="form-group mb-3">
                                            <label className="mb-2" >Confirm Password</label>
                                            <input type="text" name="confirm_password"  onChange={(e) => { setConPassword(e.target.value) }} className="form-control" placeholder="Confirm Password" />
                                        </div>  
                                        <input type="submit" value="Send OTP" className="form-control bg-info" /> 
                                    </form>
                               </div>
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
        </>
    )
}

export default CreatePassword