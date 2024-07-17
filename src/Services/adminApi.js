import { adminAxiosInstance } from "../axios/axios";
import { tutorAxiosInstance } from "../axios/axios";

export const postAdminLogin = (values) => {
    return adminAxiosInstance.post("/", values)
}

export const adminAuth = () => {
    return adminAxiosInstance.get("/auth")
}

export const dashboardData = () => {
    return adminAxiosInstance.get("/dashboard")
}

export const getUserList = (page,searchQuery) => {
    return adminAxiosInstance.get("/users",{ params: { page, searchQuery } })
}

export const updateUserStatus = (userId) => {
    return adminAxiosInstance.patch(`/user/status?userId=${userId}`)
}

export const updateTutorStatus = (tutorId, approve) => {
    return adminAxiosInstance.patch(`/tutor/status?tutorId=${tutorId}&approve=${approve}`)
}

export const getTutorsList = (page, searchQuery) => {
    return adminAxiosInstance.get("/tutors",{ params: { page, searchQuery } })
}

export const getTutorDetails = (tutorId, tutorView, status) => {
    return adminAxiosInstance.post('/tutor/view', { tutorId, status, tutorView })
}

export const addCategory = (categoryName) => {
    return adminAxiosInstance.post("/category", { categoryName })
}

export const getCourseData = () => {
    return adminAxiosInstance.get("/courses")
}

export const getCourseDetails = (courseId, status = false,tutor) => {
    if(tutor){
        return tutorAxiosInstance.post(`/course/view`, { courseId, status })
    }else{
        return adminAxiosInstance.post(`/course/view`, { courseId, status })
    }
}

export const manageCourse = (courseId) => {
    return adminAxiosInstance.post("/course/manage", { courseId })
}

export const getcouponData = (page) => {
    return adminAxiosInstance.get("/coupons",{ params: { page } })
}

export const getOrderList = (page) => {
    return adminAxiosInstance.get("/transctions",{ params: { page } })
}

export const createCoupon = (couponData) => {
    return adminAxiosInstance.post("/coupons",couponData)
}

export const deleteCoupon = (couponId)=>{
    return adminAxiosInstance.delete(`/coupon/delete/${couponId}`)
}