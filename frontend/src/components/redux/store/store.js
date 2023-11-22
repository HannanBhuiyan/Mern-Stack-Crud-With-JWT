import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../state-slice/studentSlice";
import profileReducer from "../state-slice/profileSlice";

export default configureStore({
    reducer:{
        student: studentReducer,
        profile: profileReducer
    }
}) 


 