import React from "react";
import { Link } from "react-router-dom";
import StarSvg from "../Course/StarSvg";

function CourseCard({ course, myCourse, totalProgress }) {

  return (
    <Link
      to={
        myCourse
          ? `/course/view/${course._id}`
          : `/course-details/${course._id}`
      }>
      <div className="bg-gray-200 hover:bg-gray-300 rounded-xl xl:w-60 mx-0 sm:mx-3 my-3 sm:my-0 pb-2 transition duration-300  transform sm:hover:scale-110 ">
        <div className="relative w-full h-36 rounded-t-xl overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
            src={course?.imageURL}
            alt=""
          />
        </div>

        <div className="max-w-full">
          <h1 className="mx-3 mt-2 font-bold text-black text-base overflow-hidden max-h-[3rem] line-clamp-2">
            {course?.name}
          </h1>
        </div>
        <h1 className="mx-3 my-2 font-medium text-blue-400 text-sm">
          {course?.teacher.name}
        </h1>
        {!myCourse && <p className="mx-3 font-bold">₹ {course?.price}</p>}
        <div className="flex items-center mx-3">
          <StarSvg count={course.rating?.averageRating} totalReviews={course.rating?.totalReviews}/>
        </div>
        {myCourse && (
          <div className="m-3">
            <div className="w-full  rounded-full h-1  mb-2 bg-gray-700">
              <div
                className=" h-1 rounded-full bg-blue-500"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <p className="text-xs font-sans font-semibold">
              {totalProgress}% complete
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default CourseCard;
