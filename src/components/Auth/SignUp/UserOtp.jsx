import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { verifySignup } from "../../../Services/userApi";

function UserOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;
  const otpSchema = Yup.object({
    otp: Yup.number().required(
      "Please enter the otp"
    ),
  });
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      const { data } = await verifySignup(userData, values.otp);
      if (data.verified) {
        toast.success("otp verified");
        navigate("/signin");
      } else {
        toast.error("invalid Otp");
      }
    },
  });

  return (
    <div className="bg-[#232946] max-w-screen-2xl mx-auto min-h-screen flex flex-col">
      <div className="text-white mt-10 max-w-sm mx-auto p-3 rounded-2xl">
        <img src="" className="w-20 h-20 mx-auto mb-4" alt="logo" />
        <p className="font-bold text-3xl">WELCOME TO Learnify</p>
        <p className="uppercase text-center font-medium">
          enter otp to complete registration
        </p>
      </div>
      <div className="container max-w-sm mx-auto flex flex-col items-center mt-10 px-2">
        <div className="bg-white px-6 py-8 mt-0 rounded-2xl shadow-md text-black w-full">
          <p className="text-center font-sans font-thin text-xs mb-3">
            CHECK THE INBOX OF GIVEN MOBILE NUMBER FOR OTP
          </p>
          <form action="" onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="otp"
              placeholder="OTP VIA PHONE NUMBER"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.otp && formik.touched.otp ? (
              <p className="form-error text-red-600 ">
                {formik.errors.otpPhone}
              </p>
            ) : null}
            <button
              type="submit"
              className="w-full bg-blue-600 text-center py-3 rounded-xl  text-white hover:bg-[#232946] focus:outline-none my-1">
              VERIFY AND SIGNUP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserOtp;
