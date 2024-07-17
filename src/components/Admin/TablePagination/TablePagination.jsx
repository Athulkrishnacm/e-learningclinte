import React from "react";

function TablePagination({ activePage, setActivePage, totalData,limit,skip }) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalData / limit); i++) {
    pages.push(i);
  }

  return (
    <nav
      className="flex items-center justify-between p-6 "  
      aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{skip}-{activePage*limit >totalData? totalData:activePage*limit}</span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalData}
        </span>
      </span>
      <ul className="inline-flex items-center -space-x-px">
        <li
          onClick={() => {
            if (activePage !== 1) {
              setActivePage(activePage - 1);
            }
          }}>
            <p className={`${activePage === 1 ? "cursor-not-allowed  bg-opacity-100" : "cursor-pointer hover:bg-gray-700"}   block px-3 py-2 leading-tight  border rounded-l-lg bg-gray-800 border-gray-700 text-gray-400  hover:text-white`}>
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
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

        {pages.map((pageNo) => {
          return (
            <li key={pageNo} onClick={() => setActivePage(pageNo)}>
              <p
                className={`${
                  activePage === pageNo
                    ? "z-10 text-white border-gray-700 bg-gray-700 "
                    : "bg-gray-800 text-gray-400"
                } cursor-pointer px-3 py-2 leading-tight  border   border-gray-700  hover:bg-gray-700 hover:text-white`}>
                {pageNo}
              </p>
            </li>
          );
        })}

        {/* <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                ...
              </a>
            </li> */}

        <li onClick={() => {
            if (activePage !== Math.ceil(totalData/limit)) {
              setActivePage(activePage + 1);
            }
          }}>
          <p className={`${activePage === Math.ceil(totalData/limit) ? "cursor-not-allowed  bg-opacity-100" : "cursor-pointer hover:bg-gray-700"}   block px-3 py-2 leading-tight  border rounded-r-lg bg-gray-800 border-gray-700 text-gray-400  hover:text-white`}>
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
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
  );
}

export default TablePagination;
