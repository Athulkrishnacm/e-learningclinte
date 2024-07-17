import axios from "axios"

const baseURL = import.meta.env.VITE_BaseURL;
const userBaseURL = baseURL;
const tutorBaseURL = `${baseURL}/tutor`
const adminBaseURL = `${baseURL}/admin`

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 20000,
    timeoutErrorMessage: "Request timeout... Please Try Again!!!"
  })
  return instance
}

const attachToken = (req, tokenName) => {
  let authToken = localStorage.getItem(tokenName)
  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`
  }
  return req
}

const userAxiosInstance = createAxiosInstance(userBaseURL)
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req,"token")
  return modifiedReq
})

const tutorAxiosInstance = createAxiosInstance(tutorBaseURL)
tutorAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "tutorToken")
  return modifiedReq
})

const adminAxiosInstance = createAxiosInstance(adminBaseURL)
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "adminToken")
  return modifiedReq
})

export {userAxiosInstance,tutorAxiosInstance, adminAxiosInstance }