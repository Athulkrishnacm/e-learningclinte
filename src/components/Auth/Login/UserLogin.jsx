import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userAuthorized } from "../../../Redux/app/userSlice";
import { userLogin, verifySignup } from "../../../Services/userApi";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { loginValidationSchema,loginInitialValues } from "../../../constants/constant";

function UserLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema:loginValidationSchema,
    onSubmit: async (values) => {
      const { data } = await userLogin(values);
      if (data.token) {
        toast.success(data.message);
        dispatch(userAuthorized());
        localStorage.setItem("token", data.token);
        navigate("/");
      } else if (data.message) {
        toast.error(data.message);
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
    // <div className="bg-[#232946] max-w-screen-2xl mx-auto min-h-screen flex flex-col">
    //   <div className="text-white mt-10 max-w-sm mx-auto p-3 rounded-2xl">
    //     {/* <img src="" className="w-20 h-20 mx-auto mb-4" alt="logo" /> */}
    //     <p className="font-bold text-2xl uppercase">WELCOME TO Learn-Leap</p>
    //     <p className="uppercase text-center font-medium mt-3">
    //       sign in to continue
    //     </p>
    //   </div>
    //   <div className="container max-w-sm mx-auto flex flex-col items-center mt-10  px-2">
    //     <div className="bg-white px-6 py-8 mt-0 rounded-2xl shadow-md text-black w-full">
    //       <form onSubmit={formik.handleSubmit}>
    //         <input
    //           type="email"
    //           className="block border border-grey-light w-full p-3 rounded mb-4"
    //           name="email"
    //           placeholder="Email"
    //           onChange={formik.handleChange}
    //           value={formik.values.email}
    //           onBlur={formik.handleBlur}
    //         />
    //         {formik.errors.email && formik.touched.email ? (
    //           <p className="form-error text-red-600">{formik.errors.email}</p>
    //         ) : null}

    //         <input
    //           type="password"
    //           className="block border border-grey-light w-full p-3 rounded mb-4"
    //           name="password"
    //           placeholder="Password"
    //           onChange={formik.handleChange}
    //           value={formik.values.password}
    //           onBlur={formik.handleBlur}
    //         />
    //         {formik.errors.password && formik.touched.password ? (
    //           <p className="form-error text-red-600">
    //             {formik.errors.password}
    //           </p>
    //         ) : null}

    //         <button
    //           type="submit"
    //           className="w-full bg-blue-600 text-center py-3 rounded-xl  text-white hover:bg-[#232946] focus:outline-none my-1">
    //           SIGN IN
    //         </button>
    //       </form>
    //     </div>

    //     <div className="text-white mt-6">
    //       Don't have an account ?
    //       <Link
    //         className="no-underline border-b ml-2 border-white text-yellow"
    //         to="/signup">
    //         Signup
    //       </Link>
    //     </div>
    //     <div className="text-white mb-5">
    //       Sign in as a tutor ?
    //       <Link
    //         to="/tutor"
    //         className="no-underline border-b ml-2 border-white text-yellow">
    //         Sign in
    //       </Link>
    //     </div>
    //     <GoogleLogin onSuccess={googleAuthentication} onError={googleFailed} />
    //   </div>
    // </div>
    <div className="flex justify-center bg-[#e9eef2] min-h-screen">
    <div className="my-[3rem] mx-4 py-[3rem] bg-white rounded-lg w-[440px] h-[500px] shadow-lg ">
      <h2 className="text-darkBlue text-center text-3xl font-bold ">
        Sign In
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="px-[3rem]  flex flex-col mt-[2rem]">
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
        <label className="text-sm text-darkBlue mt-5" htmlFor="password">
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
            Sign in
          </button>
        </div>
      </form>
      <div className="ml-[3rem]">
        <p className="text-sm mt-4 mb-1 text-lightBlue">
          Don't have an account?{" "}
          <Link to={"/signup"} className="cursor-pointer underline">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-lightBlue">
          Are you a Teacher{" "}
          <Link to={"/tutor"} className="cursor-pointer underline">
            {" "}
            Sign in
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

export default UserLogin;
