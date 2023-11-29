import React, { useState } from "react";
import ReactCodeInput from "react-code-input";
import './VerifyOTP.css'
import { ToastContainer, toast } from "react-toastify";
import { otpVerificationRequest } from "../../services/authServices";
import { getLocalEmail } from "../../helpers/SessionHelper";
import { useNavigate } from "react-router-dom";


const VerifyOTP = () => {

    const [otp, setOtp] = useState("") 
    const navigator = useNavigate()

    let email = getLocalEmail()
  
    const verifyOTPHandler = (e) => {
        e.preventDefault();
        if(otp.length === 6){
            otpVerificationRequest(otp, email)
            .then(res => { 
                console.log(res)
                if(res === true){
                    toast.success(' OTP Verify Success', {
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
                    navigator('/create-password')
                   }, 7000);
                } 
                else {
                    let errorMsg = res.response.data.message
                    toast.error(`${errorMsg}`, {
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
            .catch(err => {
                let errorMsg = err.response.data.message
                toast.error(`${errorMsg}`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
        }
        else {
            toast.error('Enter 6 digit code', {
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
                                    <form onSubmit={verifyOTPHandler} >  
                                        <div className="verify_otp_txt">
                                            <h2>OTP VERIFICATION</h2>
                                            <p>A 6 Digit Verification code has been send to your email address</p>
                                        </div>
                                        <div className="form-group mb-3 otp_input">
                                            <ReactCodeInput onChange={(value) => { setOtp(value) }} fields={6} />
                                        </div> 
                                        <input type="submit" value="Verify OTP" className="form-control bg-info" /> 
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

export default VerifyOTP