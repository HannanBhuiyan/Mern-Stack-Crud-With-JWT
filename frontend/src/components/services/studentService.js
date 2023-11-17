import axios from "axios"
import { getToken } from "../helpers/SessionHelper"
import { useDispatch } from "react-redux"
import { getAllStudents } from "../redux/state-slice/studentSlice"
import store from "../redux/store/store"

const BASE_URL = 'http://localhost:4000/api/v1'

const AxiosHeader = { headers: {"token": getToken()}}

// Get all student method
export const getAllStudentData = async () => {
    await axios.get(BASE_URL, AxiosHeader)
    .then((res) => {
        store.dispatch(getAllStudents(res.data))
    })
    .catch((error) => {
        console.log(error)
    })
}

// Delete student method
export const deleteStudent = (id) => {
    
}
