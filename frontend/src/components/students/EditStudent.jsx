import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast } from 'react-toastify';
import MasterLayout from "../marster-layout/MasterLayout";
import { getToken } from "../helpers/SessionHelper";
import { useSelector } from "react-redux";
import store from "../redux/store/store"; 
import { addNewStudent, studentUpdate } from "../services/studentService";

const AxiosHeader = { headers: { "token": getToken() } }

const EditStudent = () => {

    const {id} = useParams()
    const { allStudent } = useSelector((state) => state.student)

    let student = allStudent.find((curEle) => curEle.id === id)

    const navigator = useNavigate()
    const [fromData, setFormData] = useState({
        studentName: student.studentName,
        studentEmail: student.studentEmail
    })

    const handelChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => {
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault() 
        studentUpdate(fromData, id)
        .then((res) => {
            console.log(res)
            if(res === true) {
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
                navigator('/')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }


    return (
        <>
         <MasterLayout>

            <div className="create_student_section" style={{ marginTop: "100px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card p-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            value={fromData.studentName}
                                            name="studentName"
                                            onChange={handelChange}
                                            placeholder="Student Name" 
                                            className="form-control" 
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input 
                                            type="text" 
                                            value={fromData.studentEmail}
                                            name="studentEmail"
                                            onChange={handelChange}
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
                    </div>
                </div>
            </div>
            
         </MasterLayout>
        </>
    )
}

export default EditStudent

