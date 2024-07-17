import React, { useState, useEffect } from "react";
import { getEnrolledCourse } from "../../../Services/userApi";
import CourseCard from "../CourseCard/CourseCard";
import CardSkeleton from "../CourseCard/CardSkeleton";

function UserEnrollements() {
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      getEnrolledCourse()
        .then(({ data }) => {
          setEnrolledCourse(data.enrolledCourses);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="pl-9 mb-10">
        <h3 className="text-3xl sm:text-4xl  mt-8  mb-4 ml-2 sm:ml-5 ">
          My Enrollments
        </h3>
      </div>
      <div>
        {isLoading ? (
        <div className="my-10 gap-6 mx-20 max-sm:m-0 mb-8 grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        ) : enrolledCourse?.length ? (
          <div className="gap-6 mx-4 my-10 sm:mx-20 mb-0 sm:mb-10  grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
            {enrolledCourse?.map((course, index) => {
              return (
                <CourseCard
                  key={index}
                  course={course.course}
                  myCourse={true}
                  totalProgress={course.totalCompleted}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center mb-10">
            <img src="/assets/course/nocourse.svg" alt="" />
            <p>No enrolled courses</p>
          </div>
        )}
      </div>
    </>
  );
}

export default UserEnrollements;
