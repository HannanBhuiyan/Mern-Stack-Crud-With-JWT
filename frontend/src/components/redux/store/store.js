import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../state-slice/studentSlice";

export default configureStore({
    reducer:{
        student: studentReducer
    }
}) 


 