import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from 'react-router-dom'
import axios from 'axios' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import EditModal from "./EditModal";
import swal from 'sweetalert';
import MasterLayout from "../marster-layout/MasterLayout";
import { getToken } from "../helpers/SessionHelper";
import { deleteStudent, getAllStudentData} from "../services/studentService";
import { useSelector } from "react-redux";
import store from "../redux/store/store"; 

const AxiosHeader = {headers: { "token": getToken()}} 


const ListStudent = () => {
 
    const [editId, setEditId] = useState("")

    const students = useSelector((state) => state.student.allStudent)
 


    const setEditStudent = (id) => {
        setEditId(id)
    }

     

    useEffect(() => {  
        getAllStudentData()
    },[])
   

    return(
        <>
           <MasterLayout>
            <div className="student_list" style={{ marginTop: "100px" }}>
                    <div className="container">
                        <div className="student_list_inner">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Student Name</th>
                                        <th>Student Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map((student, index) => {
                                            return( 
                                                <tr key={index}> 
                                                    <td>{index+1}</td>
                                                    <td>{student.studentName}</td>
                                                    <td>{student.studentEmail}</td>
                                                    <td>
                                                        <button onClick={() => { deleteStudent(student.id) }} className="btn btn-danger me-3" >Delete</button>
                                                        {/* <button onClick={() => { setEditStudent(student._id) }} className="btn btn-info" >Edit</button> */}
                                                        <Link to={`/edit/${student.id}`} className="btn btn-info">Edit</Link>
                                                    </td>
                                                </tr>  
                                            )
                                        })
                                    } 
                                </tbody>
                            </table>
                        </div>
                        {/* edit modal */}
    
                        <EditModal editId={editId} ></EditModal> 
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
           </MasterLayout>
        </>
    )
}

export default ListStudent