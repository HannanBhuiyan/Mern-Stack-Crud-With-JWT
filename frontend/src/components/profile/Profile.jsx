import React, { useRef, useState } from "react";
import MasterLayout from "../marster-layout/MasterLayout";
import profile_img from '../../assets/profile.png'
import { getUserDetails } from "../helpers/SessionHelper";

const Profile = () => {


    const [showBtn, setShowbtn] = useState(false)
    let { firstName, lastName, email,  mobile,  photo } = getUserDetails()
    let previewImg, useImageRef = useRef()

    const [formObj, setFormObj] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: ""
    })


    const changleImageHandler = () => {
        let imgFile = useImageRef.files[0]
        previewImg.src = window.URL.createObjectURL(imgFile)
        setShowbtn(true)
    }

    const formHandleChange = (e) => {
        const { name, value } = e.target
        setFormObj((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }
 

    return(
        <>
            <MasterLayout>
                <div className="profile_section" style={{ marginTop: "100px" }}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card p-3">
                              <form>
                                <div className="profle_image">
                                        <img ref={(input) =>previewImg=input}  src={photo} width="100%" alt="" />
                                    </div>
                                    <div className="change_image mt-3 text-center">
                                        <input onChange={changleImageHandler} ref={(input) => useImageRef=input} type="file"  />
                                        {showBtn && <button type="submit" className="btn btn-warning text-white mt-3">Update Image</button>}
                                        
                                    </div>
                              </form>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card p-3 mb-5">
                                <h2 className="mb-3">User Information</h2>
                                <div className="form-group">
                                    <label className="mb-2">First Name</label>
                                    <input type="text" defaultValue={firstName} name="firstName" onChange={formHandleChange}   placeholder="First Name" className="form-control mb-3" />
                                </div>

                                <div className="form-group">
                                    <label className="mb-2">Last Name</label>
                                    <input type="text" name="lastName" defaultValue={lastName} onChange={formHandleChange} placeholder="Last Name" className="form-control mb-3" />
                                </div>

                                <div className="form-group">
                                    <label className="mb-2">Email</label>
                                    <input type="text" disabled readOnly={true} name="email" defaultValue={email} placeholder="Email"  className="form-control mb-3" />
                                </div>
                                <div className="form-group">
                                    <label className="mb-2">Mobile</label>
                                    <input type="text" defaultValue={mobile} onChange={formHandleChange} placeholder="Mobile"  className="form-control mb-3" />
                                </div> 
                                <button className="btn btn-warning text-white" type="submit"> Update Bio</button>
                            </div>
                            <div className="card p-3">
                                <h2 className="mb-3">Update Password</h2> 
                                <input type="text" disabled readOnly={true} defaultValue={email}  placeholder="Email"  className="form-control mb-4" />
                                <input type="text" placeholder="Old Password"  className="form-control mb-4" />
                                <input type="text" placeholder="New Password"  className="form-control mb-4" />
                                <button className="btn btn-warning text-white" type="submit">Password Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        </>
    )
}

export default Profile