import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { getOrderList } from "../../../Services/adminApi";
import TablePagination from "../TablePagination/TablePagination";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(0);
  const skip = (activePage - 1)*limit ===0?1:(activePage-1) *limit+1
  useEffect(() => {
    getOrderList(activePage).then(({ data }) => {
      setOrders(data.orders);
      setTotalOrders(data.total)
      setLimit(data.size)
    });
  },[activePage]);

  return (
    <>
      <div className="h-auto w-full bg-[#141B2D] text-white">
        <NavBar />
        <h1 className="text-3xl mx-5 uppercase  text-white font-bold tracking-widest">
          Order History
        </h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-14 mx-5 max-sm:m-0">
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
              {orders.map((order, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="pl-7 py-4"> {skip+index}</td>
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
                    <td className="px-6 py-4">{order.course.name}</td>

                    <td className="px-6 py-4">{order.teacher.name} </td>
                    <td className="px-16 py-4">{order.total}</td>
                    <td className="px-16 py-4">{order.purchaseDate.slice(0, 10)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <TablePagination
          activePage={activePage}
          setActivePage={setActivePage}
          totalData={totalOrders}
          limit={limit}
          skip={skip}
        />
        </div>
      </div>
    </>
  );
}

export default OrderList;
