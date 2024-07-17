import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { postAdminLogin } from "../../../Services/adminApi";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { adminAuthorized } from "../../../Redux/app/adminSlice";
import { loginInitialValues } from "../../../constants/constant";

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: loginInitialValues,
    onSubmit: async (values) => {
      const { data } = await postAdminLogin(values);
      if (data.token) {
        toast.success(data.message);
        localStorage.setItem("adminToken", data.token);
        dispatch(adminAuthorized());
        navigate("/admin/dashboard");
      } else if (data.message) {
        toast.error(data.message);
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#141b2d] flex justify-center items-center h-screen">
      <div className="bg-[#1f2a40] h-auto w-96 rounded-xl shadow-2xl">
        <div>{/* <img src="logo" className="w-40" alt="logo" /> */}</div>
        <h3 className="text-3xl text-white font-bold mt-12 ml-10">
          Hello Admin👋
        </h3>
        <p className="text-white font-normal font-sans ml-10  text-base">
          Signin to access your account
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="px-10 mt-5">
            <label
              htmlFor="input-group-1"
              className="block mb-2  text-sm font-medium text-gray-900 dark:text-white">
              Your Email
            </label>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                name="email"
                type="text"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="px-10 ">
            <label
              htmlFor="input-group-2"
              className="block mb-2  text-sm font-medium text-gray-900 dark:text-white">
              Your Password
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                name="password"
                type="password"
                id="input-group-2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="mx-10 my-10">
            <button
              className="uppercase text-white font-medium  py-2 px-10 rounded bg-gray-700 hover:bg-slate-950 w-full"
              type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
