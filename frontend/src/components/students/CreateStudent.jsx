import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import MasterLayout from "../marster-layout/MasterLayout"; 
import { addNewStudent } from "../services/studentService";
 

const CreateStudent = () => {

    const navigator = useNavigate()
    const [fromData, setFormData] = useState({
        studentName: "",
        studentEmail: ""
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
        addNewStudent(fromData)
        .then((res) => {
            navigator('/')
            toast.success('Student Create success', {
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
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
         <MasterLayout>
            <div className="create_student_section" style={{ marginTop: "100px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="card p-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            value={setFormData.studentName}
                                            name="studentName"
                                            onChange={handelChange}
                                            placeholder="Student Name" 
                                            className="form-control" 
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input 
                                            type="text" 
                                            value={setFormData.studentEmail}
                                            name="studentEmail"
                                            onChange={handelChange}
                                            placeholder="Student Email" 
                                            className="form-control" 
                                        />
                                    </div>
                                    <div className="text-cetner mt-3">
                                        <button className="btn btn-success" type="submit">Add Student</button>
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

export default CreateStudent

