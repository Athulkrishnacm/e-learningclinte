import React, { useState, useEffect } from "react";
import CourseCard from "../CourseCard/CourseCard";
import { getCourseList } from "../../../Services/userApi";
import Pagination from "../Pagination/Pagination";
import CardSkeleton from "../CourseCard/CardSkeleton";
import { useLocation } from "react-router-dom";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [totalCourse, setTotalCourse] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const courseLimitPerPage = 3;

  useEffect(() => {
    getCourseList(
      activePage,
      courseLimitPerPage,
      searchQuery,
      selectedCategory
    ).then((res) => {
      setCourses(res.data.courseData);
      setCategoryData(res.data.categoryData);
      setTotalCourse(res.data.total);
      setIsLoading(false);
    });
  }, [activePage, searchQuery, selectedCategory]);
  
  return (
    <div>
      <div className="my-5 mx-10 bg-[#f5f5f5 rounded-md flex text-black font-bold justify-between shadow-sm shadow-gray-500 border-t-2 border-gray-300">
        <div className="mx-10">
          <button
            className={`px-5 py-2 rounded-xl ${
              selectedCategory === null
                ? "bg-[#232946] text-white"
                : " bg-[#ffffff]"
            } ml-20 my-5 mr-5 shadow-md shadow-gray-700 border-t-2`}
            onClick={() => {
              setIsLoading(true);
              setSelectedCategory(null);
            }}>
            All Course
          </button>
          {categoryData.map((category, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setIsLoading(true);
                  setSelectedCategory(category._id);
                }}
                className={`px-5 py-2 rounded-xl ${
                  selectedCategory === category._id
                    ? "bg-[#232946] text-white"
                    : "bg-[#ffffff]"
                } m-5 shadow-md shadow-gray-500 border-t-2`}>
                {category.name}
              </button>
            );
          })}
        </div>
        <div>
          <form className="flex items-center m-3">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                onKeyUp={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      {isLoading ? (
        <div className="gap-6 mx-4 sm:mx-20 mb-0 sm:mb-10  grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : courses.length > 0 ? (
        <>
          <div className="gap-6 mx-8 sm:mx-20 mb-0 sm:mb-10  grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} myCourse={false} />
            ))}
          </div>
          <Pagination
            activePage={activePage}
            limit={courseLimitPerPage}
            setActivePage={setActivePage}
            totalCourse={totalCourse}
          />
        </>
      ) : (
        <div className="flex justify-center flex-col items-center mb-5">
          <img className="mx-auto" src="/assets/course/nocourse.svg" alt="" />
          <p>No course found on this category</p>
        </div>
      )}
    </div>
  );
}

export default CourseList;
