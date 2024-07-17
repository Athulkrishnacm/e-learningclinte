import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import CourseCard from "./CourseCard";
import { addCategory, getCourseData } from "../../../Services/adminApi";
import { ImCross } from "react-icons/im";
import { toast } from "react-hot-toast";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [categoryButton, setAddCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(category !=''){
      const { data } = await addCategory(category);
      if (data.message) {
        toast.success(data.message);
        setAddCategory(false);
        setCategory("");
      }
    }else{
      toast.error("category name can't be empty");
    }
    
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  }
  let filteredCourses;
  if (selectedCategories.length === 0) {
    filteredCourses = courses;
  } else {
    filteredCourses = courses.filter((course) =>
      selectedCategories.includes(course.category)
    );
  }
  useEffect(() => {
    getCourseData().then((res) => {
      setCourses(res.data.course);
    });
    addCategory().then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  return (
    <>
      <div className="relative w-full bg-[#141B2D] text-white">
        <NavBar />
        <h1 className="text-3xl mx-5 uppercase  text-white font-bold tracking-widest">
          Courses
        </h1>
        <div className="flex items-center justify-end  mx-10 my-5">
          <button
            onClick={() => {
              setAddCategory(!categoryButton);
              setShowCategory(false);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mx-5">
            Add New Category
          </button>
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="button"
            onClick={() => setShowCategory(!showCategory)}>
            Filter by category
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>{" "}
        </div>
        {showCategory && (
          <div className="flex justify-end absolute inset-x-0.5">
            <div
              id="dropdown"
              className="z-10 mx-8   w-44 p-3 bg-white rounded-lg shadow dark:bg-gray-700 ">
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Category
              </h6>
              <ul
                className="space-y-2 text-sm "
                aria-labelledby="dropdownDefault">
                   <li className="flex items-center">
                      <input
                        id="all"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="all"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100 ">
                        All
                      </label>
                    </li>
                {categories.map((categorie, index) => {
                  return (
                    <li value={index} className="flex items-center" key={index}>
                      <input
                        id="fitbit"
                        type="checkbox"
                        
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value={categorie._id}
                        onChange={handleCategoryChange}
                      />
                      <label
                        htmlFor={categorie._id}
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {categorie.name}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 m-8 ">
          {filteredCourses.map((course, index) => {
            return (
              <CourseCard
                key={index}
                image={course.imageURL}
                title={course.name}
                date={course.createdAt}
                id={course._id}
                isApproved={course.isApproved}
                status={course.status}
              />
            );
          })}
        </div>

        {categoryButton && (
          <div className="fixed inset-0  rounded-xl bg-black bg-opacity-25  backdrop-blur-sm flex justify-center items-center">
            <div className="relative flex flex-col items-center rounded-xl w-96 bg-gray-50">
              <button
                className="place-self-end mx-2 my-2 text-red-600"
                onClick={() => {
                  setAddCategory(!categoryButton);
                  setCategory("");
                }}>
                <ImCross />
              </button>
              <div className="bg-black opacity-60 inset-0 z-0" />
              <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                  <h2 className="mt-5 text-3xl font-bold text-gray-900">
                    Add New Category
                  </h2>
                </div>
                <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                      Name
                    </label>
                    <input
                      className="text-base p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      type="text"
                      placeholder="Category name"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
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

export default CourseList;
