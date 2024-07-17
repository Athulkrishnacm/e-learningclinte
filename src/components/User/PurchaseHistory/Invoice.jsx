import React, { useRef } from "react";
import dateFormat from "dateformat";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactToPrint from "react-to-print";
import { FaTimes } from "react-icons/fa";


export default function Header({ order,setModal }) {
  const componentRef = useRef();
  const downloadDiv = useRef();
  const purchaseDate = new Date(order.purchaseDate);
  const date = dateFormat(purchaseDate, "dd/mm/yyyy");

  function downloadPdf() {
    const input = downloadDiv.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  }
  const handleModalClose = (event) => {
    if (!componentRef.current.contains(event.target)) {
      setModal(false);
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 "
      onClick={handleModalClose}>
      <div className="bg-white p- rounded-2xl border-4  border-blue-200">
        <div className="flex justify-end m-5">
          <FaTimes
            className="text-gray-500 cursor-pointer"
            onClick={handleModalClose}
          />
        </div>
        <div ref={componentRef}>
          <header className="flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between">
            <div>
              {/* <h1 className="font-bold uppercase tracking-wide text-4xl mb-3">
            Logo
          </h1> */}
            </div>

            <div>
              <ul className="flex items-center justify-between flex-wrap">
                <li>
                  <ReactToPrint
                    trigger={() => (
                      <button className="bg-gray-500 text-white font-bold py-1 px-5 rounded shadow border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 transition-all duration-300">
                        Print
                      </button>
                    )}
                    content={() => downloadDiv.current}
                  />
                </li>
                <li className="mx-2">
                  <button
                    onClick={downloadPdf}
                    className="bg-blue-500 text-white font-bold py-1 px-5 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                    Download
                  </button>
                </li>
              </ul>
            </div>
          </header>

          <div  ref={downloadDiv} className="px-10">
            <section className="flex flex-col items-end justify-end">
              <h2 className="font-bold text-3xl uppercase mb-1 text-gray-500">
                Tax Invoice
              </h2>
              <p className="text-xs text-gray-700">
                Invoice no: IN2023-{order._id.slice(17, 24)}
              </p>
              <p className="text-xs text-gray-700">Invoice date: {date}</p>
            </section>

            <section className="flex justify-between my-5">
              <div>
                <h2 className="text-xl text-gray-600 font-bold mb-1">
                  Supplier details
                </h2>
                <p className="text-xs text-gray-700 font-bold">
                  Learnifyx India PVT LTD
                </p>
                <p className="text-xs text-gray-700 leading-5 font-bold">
                  Unitech Cyber Park, Sector 39,
                </p>
                <p className="text-xs text-gray-700 leading-5 font-bold">
                  Malappuram Kerala India 656402
                </p>
                <p className="text-xs text-gray-700 leading-5 font-bold">
                  GSTIN: 36AAFFU9763MZE
                </p>
                <p className="text-xs text-gray-700 leading-5 font-bold">
                  PAN no: AAFFU9763M
                </p>
              </div>
              <div>
                <h2 className="text-xl text-gray-600 font-bold mb-1">
                  Recipient details
                </h2>
                <div className="">
                  <p className="text-xs text-gray-700 font-bold flex justify-end mx-3">
                    {order.user.name}
                  </p>
                  <p className="text-xs text-gray-700 leading-5 font-bold flex justify-end mx-3">
                    {order.user.email}
                  </p>
                  <p className="text-xs text-gray-700 leading-5 font-bold flex justify-end mx-3">
                    Addres:{order.address.line1}
                  </p>
                  <p className="text-xs text-gray-700 leading-5 font-bold flex justify-end mx-3">
                    Pin:{order.address.pincode}
                  </p>
                </div>
              </div>
            </section>

            <table width="100%" className="mb-2">
              <thead>
                <tr className="bg-gray-200 p-1">
                  <td className="font-bold">Description</td>
                  <td className="font-bold px-3">Quantity</td>
                  <td className="font-bold px-3">Price</td>
                  <td className="font-bold px-3">IGST(18%)</td>
                  <td className="font-bold px-3">Amount</td>
                </tr>
              </thead>
              <tbody>
                <tr className="h-10">
                  <td className="break-words w-80">{order.course.name}</td>
                  <td className="text-center">1.0</td>
                  <td className="text-center">
                    {Math.floor(order.total - order.total * 0.18)}
                  </td>
                  <td className="text-center">
                    {Math.ceil(order.total * 0.18)}
                  </td>
                  <td className="text-center">{order.total}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="font-bold py-5" colSpan="4">
                    Total
                  </td>
                  <td className="font-bold">INR {order.total}</td>
                </tr>
                <tr>
                  <td colSpan="5">
                    <hr className="my-2 border-t-1 border-gray-300" />
                  </td>
                </tr>
              </tbody>
            </table>
            <section>
              <p className="text-xs my-3">
                This is a system generated invoice and does not require a
                signature or digital signature
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
