import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import {
  createCoupon,
  deleteCoupon,
  getcouponData,
} from "../../../Services/adminApi";
import { ImCross } from "react-icons/im";
import { toast } from "react-hot-toast";
import TablePagination from "../TablePagination/TablePagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as Yup from "yup";

function Coupon() {
  const [couponData, setCouponData] = useState([]);
  const [addCoupon, setAddCoupon] = useState(false);
  const [action, setAction] = useState(false);
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(0);
  const skip =
    (activePage - 1) * limit === 0 ? 1 : (activePage - 1) * limit + 1;

  const handleDateChange = (date) => {
    formik.setFieldValue("selectedDate", date);
  };

  const validationSchema = Yup.object().shape({
    couponCode: Yup.string().required("Coupon code is required"),
    discount: Yup.number()
      .positive("Discount must be a positive number")
      .required("Discount is required"),
    selectedDate: Yup.date().required("Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      couponCode: "",
      discount: "",
      selectedDate: null,
    },
    validationSchema,
    onSubmit: (values) => {
      setAction(!action);
      createCoupon(values).then(({ data }) => {
        toast.success(data.message);
        setAddCoupon(false);
      });
    },
  });

  const handleDelete = (couponId) => {
    setAction(!action);
    deleteCoupon(couponId).then(({ data }) => {
      toast.success(data.message);
    }).catch(({response})=>{
      toast.error(response.data.message);
    })
  };

  useEffect(() => {
    getcouponData(activePage).then(({ data }) => {
      setCouponData(data.coupons);
      setTotalCoupons(data.total);
      setLimit(data.size);
    });
  }, [action, activePage]);

  return (
    <>
      <div className="h-auto w-full bg-[#141B2D] text-white">
        <NavBar />
        <h1 className="text-3xl mx-5 uppercase  text-white font-bold tracking-widest">
          Coupons
        </h1>

        <div className="bg-[#1F2A40] m-10 rounded-lg h-screen pt-10">
          <button
            onClick={() => {
              setAddCoupon(!addCoupon);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mx-5">
            Add New Coupon
          </button>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-5 max-sm:m-0">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="pl-6 py-3">
                    No
                  </th>
                  <th scope="col" className=" py-3">
                    Coupon code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Valid till
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {couponData?.map((coupon, index) => {
                  return (
                    <tr
                      key={index}
                      className=" border-b bg-gray-800 border-gray-700  hover:bg-gray-600">
                      <td className="pl-7 py-4"> {index + 1}</td>
                      <td
                        scope="row"
                        className="flex items-center  py-4  whitespace-nowrap text-white">
                        {coupon.couponCode}
                      </td>
                      <td className="px-6 py-4 text-white">
                        {coupon.discount}%
                      </td>

                      <td className="px-6 py-4 text-white">
                        {coupon.validTill?.slice(0, 10)}{" "}
                      </td>
                      <td className=" py-4">
                        <button
                          onClick={() => handleDelete(coupon._id)}
                          className="bg-red-500 w-28  text-center py-2 rounded-xl  font-semibold font-mono  text-white">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <TablePagination
              activePage={activePage}
              setActivePage={setActivePage}
              totalData={totalCoupons}
              limit={limit}
              skip={skip}
            />
          </div>
        </div>
        {addCoupon && (
          <div className="fixed inset-0  rounded-xl bg-black bg-opacity-25  backdrop-blur-sm flex justify-center items-center">
            <div className="relative flex flex-col items-center rounded-xl w-96 bg-gray-50">
              <button
                className="place-self-end m-3 text-red-600"
                onClick={() => {
                  setAddCoupon(!addCoupon);
                }}>
                <ImCross />
              </button>
              <div className="bg-black opacity-60 inset-0 z-0" />
              <div className="sm:max-w-lg w-full px-10 bg-white rounded-xl z-10">
                <div className="text-center">
                  <h2 className=" text-3xl font-bold text-gray-900">
                    Add New Coupon
                  </h2>
                </div>
                <form className="mt-8 space-y-3" onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                      Coupon Code
                    </label>
                    <input
                      name="couponCode"
                      className="text-base p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      type="text"
                      placeholder="Enter Code"
                      onChange={formik.handleChange}
                      value={formik.values.couponCode}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.couponCode && formik.touched.couponCode ? (
                      <p className="form-error text-red-600">
                        {formik.errors.couponCode}
                      </p>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                      Discount
                    </label>
                    <input
                      name="discount"
                      className="text-base p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      type="text"
                      placeholder="Enter Percentage "
                      onChange={formik.handleChange}
                      value={formik.values.discount}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.discount && formik.touched.discount ? (
                      <p className="form-error text-red-600">
                        {formik.errors.discount}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex space-y-2 ">
                    <div className=" inset-y-0 left-0 flex items-center p-2 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <DatePicker
                      onBlur={formik.handleBlur}
                      selected={formik.values.selectedDate}
                      onChange={handleDateChange}
                      className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64  p-2.5"
                      placeholderText="Select date"
                      minDate={new Date()}
                    />
                  </div>
                  {formik.errors.selectedDate && formik.touched.selectedDate ? (
                    <p className="form-error text-red-600">
                      {formik.errors.selectedDate}
                    </p>
                  ) : null}
                  <div>
                    <button
                      type="submit"
                      className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-3  rounded-full tracking-wide
                                  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Coupon;
