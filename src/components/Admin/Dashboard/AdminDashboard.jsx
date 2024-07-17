import React, { useEffect, useState } from "react";
import img from "/assets/admin/dashboard.svg";
import Card from "./Card";
import NavBar from "../NavBar/NavBar";
import { FaUserGraduate } from "react-icons/fa";
import {  MdOndemandVideo,MdPayment } from "react-icons/md";
import {  RiCoupon2Line } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { dashboardData } from "../../../Services/adminApi";

function AdminDashboard() {
  const [count,setCount] = useState([])
  const [currentDate, setCurrentDate] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dashboardData().then((res)=>{
      setCount(res.data)
      setOrders(res.data.orders)
    })
    const date = new Date();
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    setCurrentDate(`${month} ${day}`);
  }, []); 

  
  return (
    <>
      <div className="h-auto w-full bg-[#141B2D] text-white">
        <NavBar />
        <div className="flex  mx-10 max-sm:w-auto my-2 gap-5 ">
          <div className="w-9/12 h-auto  bg-[#1F2A40] rounded-md flex justify-between gap-5 ">
            <div className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-xl">
              <h1 className=" p-5 pb-0">Hello Admin 👋</h1>
              <h1 className=" pl-5 mt-2 text-[#70D8BD]">
                Welcome to Dashboard
              </h1>
              <h1 className="  pl-5 my-3">
                Congratulations, You have some good newses,
              </h1>
            </div>
            <div className="h-full">
            <img className="h-36 max-md:hidden" src={img} alt="dashboard-pic" />
            </div>
          </div>
          <div className="w-3/12 bg-[#1F2A40]  max-sm:hidden rounded-md flex justify-center items-center">
            <h1 className="text-xs sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl">{currentDate}</h1>
          </div>
        </div>
        <div className="grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-10 ">
          <Card title="Total Users" icon={HiUsers} count={count.userCount} />
          <Card title="Total Tutors" icon={FaUserGraduate} count={count.tutorCount} />
          <Card title="Total Courses" icon={MdOndemandVideo} count={count.courseCount} />
          <Card title="Total Orders" icon={MdPayment} count={count.orderCount} />
          <Card title="Total Coupons" icon={RiCoupon2Line} count={count.couponCount} />
        </div>

<h1 className="mx-10">Recent Transctions</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 my-3 max-sm:m-0">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="">
                <th scope="col" className="pl-6 py-3">
                  No
                </th>
                <th scope="col" className="px-10">
                  Name
                </th>
                <th scope="col" className="px-6">
                  Purchased Course
                </th>
                <th scope="col" className="px-5">
                  Tutor
                </th>
                <th scope="col" className="px-14">
                Amount
                </th>
                <th scope="col" className="px-14">
                  Purchase Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="pl-7 py-4"> {index + 1}</td>
                    <td
                      scope="row"
                      className="flex items-center  py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={
                          order.user.image
                            ? order.user.image
                            : "/assets/admin/defaultdp.png"
                        }
                        alt="Jese image"
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {order.user.name}
                        </div>
                        <div className="font-normal text-gray-500">
                          {order.user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{order.course?.name}</td>

                    <td className="px-6 py-4">{order.teacher.name} </td>
                    <td className="px-16 py-4">{order.total}</td>
                    <td className="px-16 py-4">{order.purchaseDate.slice(0, 10)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
