import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { getTutorsList, updateTutorStatus } from "../../../Services/adminApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TablePagination from "../TablePagination/TablePagination";

function TutorsList() {
  const [tutorData, setTutorData] = useState([]);
  const [action, setAction] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalTutor, setTotalTutor] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(0);
  const navigate = useNavigate();
  const skip = (activePage - 1)*limit ===0?1:(activePage-1) *limit+1
  const AccessManage = async (userId, approve = false) => {
    const { status, data } = await updateTutorStatus(userId, approve);
    status === 200
      ? toast.success(data.message)
      : toast.error("Something went wrong!");
    setAction(!action);
  };
  
  const viewTutor = (userId) => {
    navigate("/admin/tutor/view", { state: { userId } });
  };

  useEffect(() => {
    getTutorsList(activePage, searchQuery).then(({data}) => {
      setTutorData(data.tutors);
      setTotalTutor(data.total);
      setLimit(data.size)
    });
  }, [action, activePage, searchQuery]);

  return (
    <div className="h-screen w-full bg-[#141B2D]">
      <NavBar />
      <h1 className="text-3xl mx-5 uppercase  text-white font-bold tracking-widest">
        Tutors List
      </h1>
      <div className="px-5 my-7">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for tutors"
            onKeyUp={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-5 max-sm:m-0">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="pl-6 py-3">
                No
              </th>
              <th scope="col" className=" py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Total Course
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Acces Level
              </th>
              <th scope="col" className="px-6 py-3">
                view
              </th>
            </tr>
          </thead>
          <tbody>
            {tutorData?.map((user, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="pl-7 py-4"> {index +skip}</td>
                  <td
                    scope="row"
                    className="flex items-center  py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        user.image ? user.image : "/assets/admin/defaultdp.png"
                      }
                      alt="Jese image"
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {user.name}{" "}
                      </div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-14  py-4">{user.totalCourses}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full mr-2 ${
                          !user.isApproved || !user.status
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}></div>
                      {user.isApproved
                        ? user.status
                          ? "Active"
                          : "Blocked"
                        : "Pending"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {!user.isApproved ? (
                      <button
                        className="bg-[#099cb9] w-28  text-center py-2 rounded-xl  font-semibold font-mono  text-white"
                        onClick={() => AccessManage(user._id, true)}>
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => AccessManage(user._id)}
                        className={`${
                          user.status ? "bg-[#3DA58A]" : "bg-[#D93737]"
                        } w-28  text-center py-2 rounded-xl  font-semibold font-mono  text-white`}>
                        {user.status ? "Active" : "Blocked"}
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => viewTutor(user._id)}
                      className="bg-blue-500 w-28  text-center py-2 rounded-xl  font-semibold font-mono  text-white">
                      View
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
          totalData={totalTutor}
          limit={limit}
          skip={skip}
        />
      </div>
    </div>
  );
}

export default TutorsList;
