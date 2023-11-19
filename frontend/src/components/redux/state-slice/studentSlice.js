import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allStudent: [], 
    modalToggle: false,
}

export const studentSlice = createSlice({
    name: "student",
    initialState: initialState,
    reducers: {
        getAllStudents: (state, action) => {
            state.allStudent = action.payload.map((student) => {
                    return { id: student._id, studentName: student.studentName, studentEmail: student.studentEmail }
                })
        },
        setModalToggle:(state, action) => {
            state.modalToggle = action.payload
        },
    }
})

export const { getAllStudents, setModalToggle, nameChangeHandler, emailChangeHandler  } = studentSlice.actions
export default studentSlice.reducer

