import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  applyCouponCode,
  getCourseView,
  paymentGateway,
} from "../../../Services/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingButton from "../LoadingButton/LoadingButton";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function OrderSummary() {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState([]);
  const [btnloading, setBtnLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const validate = Yup.object({
    address: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Please fill Your Address"),
    pincode: Yup.number()
      .min(6, "Must be 6 Digits")
      .required("Please enter your Pincode"),
  });

  const formik = useFormik({
    initialValues: {
      address: "",
      pincode: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      setBtnLoading(true);
      values={
        ...values,
        couponCode
      }
      paymentGateway(courseId, values).then(({ data }) => {
        if (data.url) {
          window.location.href = data.url;
        }
      });
    },
  });

  useEffect(() => {
    getCourseView(courseId)
      .then((response) => {
        setCourseDetails(response.data.courseDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    formik.setValues((prev) => {
      const formFields = { ...prev };
      formFields[event.target.name] = event.target.value;
      return formFields;
    });
  };

  const applyCoupon = () => {
    if(discount<=0){
      applyCouponCode(couponCode).then(({ data }) => {
        if (data.discount) {

          toast.success(data.message);
          setDiscount(Math.ceil(courseDetails.price / data.discount));

        } else {
          toast.error(data.message);
        }
      })
    }else{
      setDiscount(0)
      toast.error("Coupon successfully removed")
      setCouponCode('')
    }
  };

  return (
    <section>
      <div className="lg:px-20 mt-5 mx-auto mb-14">
        <h3 className="text-3xl font-semibold font-outfit ml-3 max-sm:text-center  mt-8  mb-4 uppercase ">
          Order Summary
        </h3>
        <div className="flex flex-col lg:flex-row mt-8 ">
          <div className="w-full lg:w-8/12 shadow-md shadow-gray-300 border border-gray-400 rounded-lg">
            <div className="flex justify-center sm:mx-8 ">
              <div className="flex w-full flex-col items-center bg-white  rounded-lg shadow md:flex-row hover:bg-gray-100 ">
                <img
                  className="object-cover m-8 lg:m-4  ml-4 rounded h-40 md:96 md:h-auto w-100 md:w-48"
                  src={courseDetails.imageURL}
                />
                <div className="flex flex-col w-full ml-6 sm:ml-0 justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                    {courseDetails.name}
                  </h5>
                  <p className="mb-3 font-semibold text-gray-700 ">
                    {courseDetails.about}
                  </p>
                  <p className="mb-3 font-semibold text-gray-700 ">
                    {courseDetails.course?.length} Chapters
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 mx-6">
              <h5 className="mb-3 mt-3 text-2xl font-bold tracking-tight text-gray-900 ">
                Add Addresses
              </h5>
              <p className="mb-3 text-sm text-gray-700 ">
                Please enter addresses to proceed to payment
              </p>

              <div className="mt-5">
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 ">
                      Address Line
                    </label>
                    <input
                      onChange={() => {
                        handleChange(event);
                      }}
                      value={formik.values.address}
                      type="text"
                      name="address"
                      id="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Address"
                      required
                    />

                    {formik.touched.address && formik.errors.address ? (
                      <div className="text-red-500 mt-1">
                        {formik.errors.address}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="pincode"
                      className="block mb-2 text-sm font-medium text-gray-900 ">
                      Pin Code
                    </label>
                    <input
                      onChange={() => {
                        handleChange(event);
                      }}
                      value={formik.values.pincode}
                      type="text"
                      name="pincode"
                      id="pincode"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Pin code"
                      required
                    />
                    {formik.touched.pincode && formik.errors.pincode ? (
                      <div className="text-red-500 mt-1">
                        {formik.errors.pincode}
                      </div>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 ">
            <div className="flex lg:block justify-center mt-10 lg:mt-0 m-3 ">
              <div className=" p-6 w-full bg-white border border-gray-400 rounded-lg shadow-lg shadow-gray-400">
                <a>
                  <h5 className="mb-3 mt-3 text-2xl font-bold tracking-tight text-gray-900 ">
                    Order details
                  </h5>
                </a>
                <div className="flex justify-between mt-5 ">
                  <p className="mb-3 font-semibold text-gray-700 ">Price</p>
                  <p className="mb-3 font-semibold text-gray-700 ">
                    ₹ {courseDetails.price}
                  </p>
                </div>

                <div className="flex justify-between mt-3">
                  <p className="mb-3 font-semibold text-gray-700 ">Discount</p>
                  <p className="mb-3 font-semibold text-gray-700 ">{discount}</p>
                </div>

                <hr className="h-px my-4 bg-gray-200 border-0 "></hr>

                <div className="flex justify-between mt-7">
                  <p className="mb-3 font-semibold text-gray-700 ">
                    TOTAL (INR)
                  </p>
                  <p className="mb-3 font-semibold text-gray-700 ">
                    ₹ {courseDetails.price-discount}
                  </p>
                </div>
                <div className="payment-box ">
                  <div className="mt-2  flex justify-between">
                    <h5 className="mb-3 mt-3 text-xl font-bold tracking-tight text-gray-900 ">
                      Pay Now
                    </h5>
                    <LoadingButton
                      onClick={formik.handleSubmit}
                      loading={btnloading}>
                      Pay Securely
                    </LoadingButton>
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <p className="mb-3 text-xs text-gray-700 ">
                    NEED HELP ? <Link className="underline">Click</Link>
                  </p>
                </div>

                <hr className="h-px my-4 bg-gray-200 border-0 "></hr>
                <h5 className="mb-3 mt-2 text-md font-bold tracking-tight text-gray-900 ">
                  Promotions
                </h5>
                <div className="flex items-center w-full h-13 pl-3  bg-gray-100 border border-gray-300 rounded-full">
                  <input
                   disabled={discount > 0}
                    type="text"
                    name="couponCode"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className={`w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none ${
                      discount > 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="text-sm flex items-center px-3 py-3 text-white bg-gray-800 rounded-3xl outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none">
                    <span className="font-medium w-28">{discount<=0 ?"Apply coupon":"Remove coupon"} </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSummary;
