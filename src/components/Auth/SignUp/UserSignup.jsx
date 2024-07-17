import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { userSignup } from "../../../Services/userApi";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { verifySignup } from "../../../Services/userApi";
import { useDispatch } from "react-redux";
import { userAuthorized } from "../../../Redux/app/userSlice";
import { initialValues, validationSchema } from "../../../constants/constant";

function UserSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      toast.loading("Let's verify your email");
      const { data } = await userSignup(values.phone);
      toast.dismiss();
      if (data.otpSend) {
        navigate("/otp", { state: { ...values } });
      } else {
        toast.error("already have an account");
      }
    },
  });

  const googleAuthentication = async (res) => {
    const decoded = await jwt_decode(res.credential);
    const userData = {
      name: decoded.given_name,
      lastName: decoded.family_name,
      email: decoded.email,
      password: decoded.sub,
      image:decoded.picture
    };
    const { data } = await verifySignup(userData, null, true);
    if (data.token) {
      toast.success(data.message);
      dispatch(userAuthorized());
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      toast.error("there was an error signing up");
    }
  };
  const googleFailed = (error) => {
    console.log(error);
  };
  return (
      <div className="flex justify-center bg-[#e9eef2] max-h-screen">
        <div className="my-[3rem] mx-4 py-[3rem] bg-white rounded-lg w-[440px] shadow-lg ">
          <h2 className="text-darkBlue text-center text-3xl font-bold ">
            Sign up
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="px-[3rem]  flex flex-col mt-[2rem]">
            <label className="text-sm text-darkBlue" htmlFor="name">
              Full name
            </label>
            <input
              type="text"
              name="name"
              className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <p className="form-error text-red-600 text-xs mt-2">
                {formik.errors.name}
              </p>
            ) : null}
            <label className="text-sm text-darkBlue mt-4" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="form-error text-red-600 text-xs mt-2">
                {formik.errors.email}
              </p>
            ) : null}
            <label className="text-sm text-darkBlue mt-4" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <p className="form-error text-red-600 text-xs mt-2">
                {formik.errors.phone}
              </p>
            ) : null}
            <label className="text-sm text-darkBlue mt-4" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="form-error text-red-600 text-xs mt-2">
                {formik.errors.password}
              </p>
            ) : null}
            <div>
              <button
                type="submit"
                className="border border-darkBlue px-6 py-2 mt-5 text-darkBlue rounded font-bold hover:shadow-md">
                Sign up
              </button>
            </div>
          </form>
          <div className="ml-[3rem]">
            <p className="text-sm mt-4 mb-1 text-lightBlue">
              Already have an account?{" "}
              <Link to={"/signin"} className="cursor-pointer underline">
                Sign in
              </Link>
            </p>
            <p className="text-sm text-lightBlue">
              Are you a Teacher{" "}
              <Link to={"/tutor/signup"} className="cursor-pointer underline">
                {" "}
                Sign up
              </Link>
            </p>
          </div>
          <div className="flex justify-center mt-3">
            <GoogleLogin
              onSuccess={googleAuthentication}
              onError={googleFailed}
            />
          </div>
        </div>
      </div>
  );
}

export default UserSignup;
