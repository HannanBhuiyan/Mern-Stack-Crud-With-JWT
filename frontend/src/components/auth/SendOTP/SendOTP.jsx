import React, { useState } from "react";
import { sendOTPRequest } from "../../services/authServices";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setLocalEmail } from '../../helpers/SessionHelper'


const SendOTP = () => {

    const [email, setEmail] = useState("")
    const [loader, setLoader] = useState(true)
    const navigator = useNavigate()

    const sendOTPHandler = (e) => {
        e.preventDefault()
        setLoader(false)
        sendOTPRequest(email)
        .then(res => {
            if(res === true){
                setLoader(true)
                setLocalEmail(email)
                toast.success(' OTP Send Success', {
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
                navigator('/verifyOTP')
               }, 7000);
            }
            else {
                console.log("otp error")
            }
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
                                { loader === false ?  <h3>Sending OTP....</h3> : "" }
                                
                                    <form onSubmit={sendOTPHandler} >  
                                        <div className="form-group mb-3">
                                            <label className="mb-2" >Email</label>
                                            <input type="text" name="email"  onChange={(e) => {setEmail(e.target.value)}} className="form-control" placeholder="Email" />
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

export default SendOTP