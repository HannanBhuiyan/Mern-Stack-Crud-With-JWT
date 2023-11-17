import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allStudent: []
}

export const studentSlice = createSlice({
    name: "student",
    initialState: initialState,
    reducers: {
        getAllStudents: (state, action) => {
            state.allStudent = action.payload
        }
    }
})

export const { getAllStudents } = studentSlice.actions
export default studentSlice.reducer

