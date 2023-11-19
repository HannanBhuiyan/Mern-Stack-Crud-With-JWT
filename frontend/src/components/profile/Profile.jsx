import React from "react";
import MasterLayout from "../marster-layout/MasterLayout";
import profile_img from '../../assets/profile.png'

const Profile = () => {
    return(
        <>
            <MasterLayout>
                <div className="profile_section" style={{ marginTop: "100px" }}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card p-3">
                                <div className="profle_image">
                                    <img src={profile_img} width="100%" alt="" />
                                </div>
                                <div className="change_image mt-3 text-center">
                                    <input type="file"  />
                                    <button className="btn btn-warning text-white mt-3">Update Image</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card p-3 mb-5">
                                <h2 className="mb-3">User Information</h2>
                                <input type="text" placeholder="First Name"  className="form-control mb-4" />
                                <input type="text"  placeholder="Last Name" className="form-control mb-3" />
                                <input type="text" placeholder="Email"  className="form-control mb-4" />
                                <input type="text" placeholder="Mobile"  className="form-control mb-4" />
                                <button className="btn btn-warning text-white" type="submit"> Update Bio</button>
                            </div>
                            <div className="card p-3">
                                <h2 className="mb-3">Update Password</h2> 
                                <input type="text" placeholder="Email"  className="form-control mb-4" />
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