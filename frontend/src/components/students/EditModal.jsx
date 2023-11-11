import React, { useEffect, useState } from "react";
import CustomModal from "../customModal/CustomModal";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";

import {toast } from 'react-toastify';

const EditModal = ({ editId, getAllStudent , modalToggle, studentName,setStudentName,studentEmail,setStudentEmail,setModalToggle }) => {

    const updateHandler = async (e) => {
        e.preventDefault()
        let id = editId
        let url = "http://localhost:4000/api/v1/update-student/"+id
        const postData = {studentName, studentEmail }
        await axios.post(url, postData)
            .then((res) => {
                if(res.status === 200) {
                    setModalToggle(false)  
                    toast.success('Update success', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    getAllStudent()
                }
            })
            .catch((error) => {
                console.log(error)
        })
    }

    const hideModalHandler = () => {
        setModalToggle(false)
    }

    return(
        <>
            <CustomModal modalToggle={modalToggle} >
                <div className="modal_box_inner">
                    <div className="modal_title">
                        <h4>Edit Modal</h4>
                        <span onClick={hideModalHandler} > <FaXmark /> </span>
                    </div>
                    <div className="modal_body">
                        <form onSubmit={updateHandler}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    value={studentName}
                                    onChange={(e) => { setStudentName(e.target.value) }}
                                    placeholder="Student Name" 
                                    className="form-control" 
                                />
                            </div>
                            <div className="form-group mt-3">
                                <input 
                                    type="text" 
                                    value={studentEmail}
                                    onChange={(e) => { setStudentEmail(e.target.value) }}
                                    placeholder="Student Email" 
                                    className="form-control" 
                                />
                            </div>
                            <div className="text-cetner mt-3">
                                <button className="btn btn-success" type="submit">Update Student</button>
                            </div>
                        </form>
                    </div>
                </div>
            </CustomModal>
        </>
    )
}

export default EditModal