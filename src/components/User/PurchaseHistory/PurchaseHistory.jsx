import React, { useEffect, useState } from "react";
import { getPurchaseHistory } from "../../../Services/userApi";
import { Card, Typography, Button } from "@material-tailwind/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import Invoice from "./Invoice";
import { RiShoppingCartLine } from 'react-icons/ri';

function PurchaseHistory() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modal, setModal] = useState(false);
  const TABLE_HEAD = ["", "Course", "Date", "Total price", ""];
  const handleModalOpen = (order) => {
    setSelectedOrder(order);
    setModal(true);
  };
  useEffect(() => {
    getPurchaseHistory().then(({ data }) => {
      setPurchasedCourses(data.orders);
    });
  }, []);
  return (
    <div className="px-20 py-10">
      <h1 className="text-3xl w-full  font-semibold font-sans">
        Purchase History
      </h1>
      {purchasedCourses.length ? (
        <div className="relative h-full w-full my-5">
          <Card className="overflow-scroll h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {purchasedCourses.map((order, index) => {
                  const isLast = index === purchasedCourses.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  const formattedDate = dateFormat(
                    new Date(order.purchaseDate),
                    "mmmm dd, yyyy"
                  );
                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal">
                          <AiOutlineShoppingCart size={20} />
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Link to={`/course/view/${order.course._id}`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-[#9430d7] cursor-pointer">
                            {order.course.name}
                          </Typography>
                        </Link>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal">
                          {formattedDate}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue"
                          className="mx-5 font-medium ">
                          {order.total}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue"
                          className="font-medium">
                          <span className="flex justify-center">
                            <Button
                              variant="outlined"
                              onClick={() => handleModalOpen(order)}>
                              Invoice
                            </Button>
                          </span>
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          {modal && <Invoice order={selectedOrder} setModal={setModal} />}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border border-gray-300 my-5" >
      <div className="flex items-center">
        <RiShoppingCartLine className="text-4xl" />
      </div>
      <p className="text-center mt-4 font-semibold">
        You don't have any course purchases.
      </p>
    </div>
      )}
    </div>
  );
}

export default PurchaseHistory;
