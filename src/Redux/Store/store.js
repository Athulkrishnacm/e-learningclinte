import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../app/userSlice'
import tutorSlice from '../app/tutorSlice'
import adminSlice from "../app/adminSlice";
import courseSlice from "../app/courseSlice";

export default configureStore({
    reducer:{
        user: userSlice,
        tutor:tutorSlice,
        admin:adminSlice,
        course: courseSlice,
    }
})