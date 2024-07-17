import { userAxiosInstance } from "../axios/axios"

export const userLogin = (userData) => {
    return userAxiosInstance.post("/signin", userData)
}

export const userSignup = (phone) => {
    return userAxiosInstance.post("/user/exist", { phone })
}

export const verifySignup = (userData, code, googleAuth = false) => {
    return userAxiosInstance.post("/verify/signup", { userData, code, googleAuth })
}

export const userAuth = () => {
    return userAxiosInstance.get("/userAuth")
}

export const homeCourseLoad = (size) => {
    return userAxiosInstance.get("/home-course", { params: { size } })
}

export const getCourseList = (page, size, searchQuery, category) => {
    return userAxiosInstance.get("/course", {
        params: {
            page,
            size,
            searchQuery,
            category
        }
    })
}

export const getCourseView = (courseId) => {
    return userAxiosInstance.get(`/course-details/${courseId}`)
}

export const postCourseReview = (courseId, rating, review)=>{
    return userAxiosInstance.post('/review-course',{courseId, rating, review})
}

export const checkReviewPossible = (courseId) => {
    return userAxiosInstance.get(`/review-status/${courseId}`)
}

export const getUserDetails = () => {
    return userAxiosInstance.get('/profile',)
}

export const updateUserDetails = (userData) => {
    return userAxiosInstance.put('/update/profile', { ...userData })
}

export const getCourseWatch = (courseId) => {
    return userAxiosInstance.get(`/course/view/${courseId}`)
}

export const applyCouponCode = (couponCode) => {
    return userAxiosInstance.post('/apply-coupon', { couponCode })
}

export const paymentGateway = (courseId, address) => {
    return userAxiosInstance.post('/create-checkout-session', { courseId, ...address })
}

export const getEnrolledCourse = () => {
    return userAxiosInstance.get('/enrolled-course')
}

export const isCourseEnrolled = (courseId) => {
    return userAxiosInstance.get(`/is-course-enrolled/${courseId}`)
}

export const getPurchaseHistory = () => {
    return userAxiosInstance.get("/purchase-history")
}

export const updateProgressOfTheVideo = (courseId, videoId) => {
    return userAxiosInstance.patch('/update-progress', { courseId, videoId })
}

export const createGroup = (values) => {
    return userAxiosInstance.post('/create-group', values)
}

export const getAllGroups = () => {
    return userAxiosInstance.get('/all-groups')
}

export const joinGroup = (groupId) => {
    return userAxiosInstance.put('/join-group', { groupId })
}

export const getjoinedGroups = () => {
    return userAxiosInstance.get('/joined-groups')
}

export const sendMessage = (message) => {
    return userAxiosInstance.post('/messages',message)
}

export const getMessages=(groupId)=>{
    return userAxiosInstance.get(`/messages/${groupId}`)
}

export const sendImage = (message)=>{
    return userAxiosInstance.post(`/messages/send/file/image`, { ...message })
}