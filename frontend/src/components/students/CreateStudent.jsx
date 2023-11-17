import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import MasterLayout from "../marster-layout/MasterLayout";
import { getToken } from "../helpers/SessionHelper";

const AxiosHeader = { headers: { "token": getToken() } }

const CreateStudent = () => {

    const [studentName, setStudentName] = useState("")
    const [studentEmail, setStudentEmail] = useState("")
    const navigator = useNavigate()
 

    const handleSubmit = (e) => {

        e.preventDefault()
        
        let newStudent = {
            studentName,
            studentEmail
        }

        axios.post('http://localhost:4000/api/v1/create-student/', newStudent, AxiosHeader)
            .then(res => {
                if(res.status === 201) {
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
                } 
            })
            .catch(err => {
                console.log(err)
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

