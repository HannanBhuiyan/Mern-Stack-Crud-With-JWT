import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        value: []
    },
    reducers: {
        getStudentDetails:(state, action) => {
            state.value = action.payload
        }
    }
})

export const { getStudentDetails } = profileSlice.actions
export default profileSlice.reducer