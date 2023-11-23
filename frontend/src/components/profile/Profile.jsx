import React, { useEffect, useRef, useState } from "react";
import MasterLayout from "../marster-layout/MasterLayout";
import profile_img from '../../assets/profile.png'
import { getToken, getUserDetails } from "../helpers/SessionHelper";
import axios from "axios";
import { passwordUpdateRequest, profileInfoUpdate, studentsDetails } from "../services/studentService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AxiosHeader = {headers: { "token": getToken()}}
const BASE_URL = 'http://localhost:4000/api/v1'



const Profile = () => {

    const navigator = useNavigate()
    const [showBtn, setShowbtn] = useState(false)
    const profileData = useSelector((state) => state.profile.value)
  
    let previewImg, useImageRef = useRef()
    let firstNameRef, lastNameRef, mobileRef, passwordRef, newPasswordRef = useRef() 

    const changleImageHandler = () => {
        let imgFile = useImageRef.files[0]
        previewImg.src = window.URL.createObjectURL(imgFile)
        setShowbtn(true)
    }

    const profileInfoUpdateRequest = (e) => {
        e.preventDefault()
        let firstName = firstNameRef.value
        let lastName = lastNameRef.value
        let mobile = mobileRef.value
        let formObj = {firstName, lastName, mobile}
        profileInfoUpdate(formObj)
        .then(res => {
            navigator('/')
            toast.success('Profile Update success', {
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
        .catch(err => {
            console.log(err)
        })
    }
 

    const changePasswordhandler = (e) => {
        e.preventDefault()
        let password = passwordRef.value
        let newPassword = newPasswordRef.value
        passwordUpdateRequest(password, newPassword)
        .then((result) => {
            if(result === true){
                localStorage.clear()
                window.location.href="/login"
                console.log("password update success")
            }
            else {
                console.log(result.response.data.message)
            }
        }) 
    }

    const submitImageHandler = (e) => {
        e.preventDefault()

        console.log(previewImg.src)

    }

    useEffect(() => {
        studentsDetails()
    },[])

    return(
        <>
            <MasterLayout>
                <div className="profile_section" style={{ marginTop: "100px"}}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card p-3">
                              <form onSubmit={submitImageHandler}>
                                <div className="profle_image">
                                        <img ref={(input) =>previewImg=input}  src={profileData.photo} width="100%" alt="" />
                                    </div>
                                    <div className="change_image mt-3 text-center">
                                        <input onChange={changleImageHandler} ref={(input) => useImageRef=input} type="file"  />
                                        {showBtn && <button type="submit" className="btn btn-warning text-white mt-3">Update Image</button>}
                                    </div>
                              </form>
                            </div>
                        </div>
                        <div className="col-md-8" style={{ paddingBottom: "100px" }}>
                            <div className="card p-3 mb-5">
                              <form onSubmit={profileInfoUpdateRequest} >
                                    <h2 className="mb-3">User Information</h2>
                                    <div className="form-group">
                                        <label className="mb-2">First Name</label>
                                        <input type="text" ref={(input) => firstNameRef=input } defaultValue={profileData.firstName} name="firstName" placeholder="First Name" className="form-control mb-3" />
                                    </div>

                                    <div className="form-group">
                                        <label className="mb-2">Last Name</label>
                                        <input type="text" ref={(input) => lastNameRef=input } name="lastName" defaultValue={profileData.lastName} placeholder="Last Name" className="form-control mb-3" />
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-2">Email</label>
                                        <input type="text" disabled readOnly={true} name="email" defaultValue={profileData.email} placeholder="Email"  className="form-control mb-3" />
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-2">Mobile</label>
                                        <input type="text" ref={(input) => mobileRef=input} defaultValue={profileData.mobile}  placeholder="Mobile"  className="form-control mb-3" />
                                    </div> 
                                    <button className="btn btn-warning text-white" type="submit"> Update Bio</button>
                              </form>
                            </div>
                            <div className="card p-3">
                                <h2 className="mb-3">Update Password</h2> 
                                <form onSubmit={changePasswordhandler} >
                                    <input type="text" disabled readOnly={true} defaultValue={profileData.email}  placeholder="Email"  className="form-control mb-4" />
                                    <input type="text" ref={(input)=>passwordRef=input} placeholder="Old Password"  className="form-control mb-4" />
                                    <input type="text" ref={(input)=>newPasswordRef=input } placeholder="New Password"  className="form-control mb-4" />
                                    <button className="btn btn-warning text-white" type="submit">Password Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        </>
    )
}

export default Profile