import React, { useEffect, useState } from "react";
import CustomModal from "../customModal/CustomModal";
import { FaXmark } from "react-icons/fa6";
import axios, { all } from "axios";
import {toast } from 'react-toastify';
import { getToken } from "../helpers/SessionHelper";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store/store";
import { setModalToggle } from "../redux/state-slice/studentSlice";
// import { studentUpdate } from "../services/studentService";

const AxiosHeader = {
    headers: {
        "token": getToken()
    }
}


const EditModal = ({editId}) => {


    const { modalToggle, allStudent} = useSelector((state) => state.student)
 
    // let users = allStudent.find((curEle) => curEle.id === editId)
   
    // console.log(users)
    // console.log(users.studentName)
    // console.log(editId)
    // console.log(users.studentName)

    const [fromData, setFormData] = useState({
        // studentName: users.studentName,
        // studentEmail: users.studentEmail
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
 

    const studentUpdateSubmit = (e) => {
        e.preventDefault()
        console.log(fromData)
    }

 

    const hideModalHandler = () => {
        store.dispatch(setModalToggle(false))
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
                        <form onSubmit={studentUpdateSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    value={fromData.studentName}
                                    onChange={(e) => {handelChange(e.target.value)}}
                                    placeholder="Student Name" 
                                    className="form-control" 
                                />
                            </div>
                            <div className="form-group mt-3">
                                <input 
                                    type="text" 
                                    value={fromData.studentEmail}
                                    onChange={(e) => {handelChange(e.target.value) }}
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