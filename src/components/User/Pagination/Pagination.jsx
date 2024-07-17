import React from "react";

function Pagination({activePage,limit,setActivePage,totalCourse}) {
  const totalPages = (total, limit) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(total / limit); i++) {
      pages.push(i);
    }
    return pages;
  };
  return (
    <div className="flex items-center justify-center m-5">
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <li
          onClick={() => {
            if (activePage !== 1) {
              setActivePage(activePage - 1);
            }
          }} >
          <p
            className={`${
              activePage === 1 ? "cursor-not-allowed bg-[#e7e6e6] hover:bg-[#e1e1e1]" : ""
            }cursor-pointer block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700} `}>
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        </li>
        {totalPages(totalCourse, limit).map((pageNo) => {
          return (
            <li key={pageNo} onClick={() => setActivePage(pageNo)}>
              <p
                className={`${
                  activePage === pageNo
                    ? "text-white border-gray-700 bg-gray-700 "
                    : ""
                }cursor-pointer px-3 py-2 leading-tight text-gray-500 border  border-gray-300 `}>
                {pageNo}
              </p>
            </li>
          );
        })}

        <li  onClick={() => {
            if (activePage !== Math.ceil(totalCourse/limit)) {
              setActivePage(activePage + 1);
            }
          }}>
          <p className={`${activePage === Math.ceil(totalCourse/limit) ? "cursor-not-allowed bg-[#e7e6e6] hover:bg-[#e1e1e1]" : "cursor-pointer"}  block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 `}>
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        </li>
      </ul>
    </nav>
  </div>
  );
}

export default Pagination;
