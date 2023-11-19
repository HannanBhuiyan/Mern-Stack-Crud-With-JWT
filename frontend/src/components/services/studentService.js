import axios from "axios"
import { getToken } from "../helpers/SessionHelper"
import { getAllStudents } from "../redux/state-slice/studentSlice"
import store from "../redux/store/store"
import { toast } from "react-toastify"
import swal from "sweetalert"

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

// Student add method
export const addNewStudent = (fromData) => {
    let url = BASE_URL+'/create-student/'
    return axios.post(url, fromData, AxiosHeader)
        .then(res => {
            if(res.status === 201) {
               return true
            } 
        })
        .catch(err => {
            console.log(err)
            return false
        })
}


// Student Update method 
export const studentUpdate = async (fromData, id) => {
    let url = BASE_URL+'/update-student/'+id 
    return await axios.post(url, fromData, AxiosHeader)
        .then((res) => {
            if(res.status === 200) { 
                getAllStudentData()
                return true
            }
        })
        .catch((error) => {
            console.log(error)
            return false
        })
}



// Delete student method
export const deleteStudent = async (id) => {
    let url = BASE_URL+'/delete-student/'+id
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
                let students = await  axios.delete(url, AxiosHeader) 
                if(students.status === 200) { 
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    getAllStudentData()
                }
            } else {
              swal("Your imaginary file is safe!");
            }
         });
    } catch (error) {
        console.log(error)
    }
}
