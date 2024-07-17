import { tutorAxiosInstance } from "../axios/axios";

const tutorSignin = (values) => {
    return tutorAxiosInstance.post("/signin", values)
}

const signupApi = ({ tutorData, imageUrl }) => {
    return tutorAxiosInstance.post("/signup", { tutorData, imageUrl })
}

const tutorAuth = () => {
    return tutorAxiosInstance.get("/tutorauth")
}

const uploadCourse = (courseData, imageURL, pilotVideoURL) => {
    return tutorAxiosInstance.post("/upload/course", { courseData, imageURL, pilotVideoURL })
}

const dashboardCourses = () => {
    return tutorAxiosInstance.get("/all-course/")
}

const deleteCourse = (courseId) => {
    return tutorAxiosInstance.delete(`/delete/${courseId}`)
}

const getTutorProfile = () => {
    return tutorAxiosInstance.get('/profile')
}

const updateTutorProfile = (values) => {
    return tutorAxiosInstance.put('/profile', values)
}

export {
    tutorSignin,
    signupApi,
    tutorAuth,
    uploadCourse,
    dashboardCourses,
    deleteCourse,
    getTutorProfile,
    updateTutorProfile
}