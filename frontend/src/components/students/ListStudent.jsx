import React, { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom'
import axios from 'axios' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import EditModal from "./EditModal";
import swal from 'sweetalert';
import MasterLayout from "../marster-layout/MasterLayout";
import { getToken } from "../helpers/SessionHelper";
import { getAllStudentData } from "../services/studentService";
import { useSelector } from "react-redux";

const AxiosHeader = {headers: { "token": getToken()}} 


const ListStudent = () => {
 
    const [studentName, setStudentName] = useState("")
    const [studentEmail, setStudentEmail] = useState("")
    const [editId, setEditId] = useState("")
    const [modalToggle, setModalToggle] = useState(false)

    const students = useSelector((state) => state.student.allStudent)


    // delete student
    const handleDeleteStudent = (id) => {

        try {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then(async (willDelete) => {
                if (willDelete) {
                    let students = await  axios.delete('http://localhost:4000/api/v1/delete-student/'+id, AxiosHeader) 
                    if(students.status === 200) { 
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                        getAllStudent()
                    }
                } else {
                  swal("Your imaginary file is safe!");
                }
             });
        } catch (error) {
            console.log(error)
        }
 
    } 


    // get edit data
    const getEditData = async (id) => {
        setModalToggle(true)
       try {
        const students = await axios.get('http://localhost:4000/api/v1/single-student/'+id, AxiosHeader)
            const { data } = students
            setStudentName(data.data.studentName)
            setStudentEmail(data.data.studentEmail)
            setEditId(id)
       } catch (error) {
            console.log(error)
       }
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
                                        students?.map((student, index) => {
                                            return( 
                                                <tr key={index}> 
                                                    <td>{index+1}</td>
                                                    <td>{student.studentName}</td>
                                                    <td>{student.studentEmail}</td>
                                                    <td>
                                                        <button onClick={() => { handleDeleteStudent(student._id) }} className="btn btn-danger me-3" >Delete</button>
                                                        <button onClick={() => { getEditData(student._id) }} className="btn btn-info" >Edit</button>
                                                    </td>
                                                </tr>  
                                            )
                                        })
                                    } 
                                </tbody>
                            </table>
                        </div>
                        {/* edit modal */}
    
                        <EditModal
                            studentName = {studentName} 
                            setStudentName={setStudentName}
                            studentEmail={studentEmail}
                            setStudentEmail={setStudentEmail}
                            modalToggle={modalToggle}
                            setModalToggle={setModalToggle}
                            setEditId={setEditId}
                            editId={editId}
                        ></EditModal> 
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