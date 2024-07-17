import {createSlice} from '@reduxjs/toolkit';

const initialState={}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourseDetails: (state, action) => {
            state.value=action.payload
        },
        clearCourseDetails: (state, action) => {
            state.value=null
        },
    }
})


export const { setCourseDetails,clearCourseDetails } = courseSlice.actions;

export default courseSlice.reducer;