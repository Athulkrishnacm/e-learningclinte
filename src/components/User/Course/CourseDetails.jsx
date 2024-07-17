import React, { useEffect, useState } from "react";
import {
  checkReviewPossible,
  getCourseView,
  postCourseReview,
} from "../../../Services/userApi";
import { useNavigate, useParams } from "react-router-dom";
import BuyNowCard from "./BuyNowCard";
import SyllabusDropdown from "./SyllabusDropdown/SyllabusDropdown";
import { Textarea, Typography, Rating } from "@material-tailwind/react";
import { ImCross } from "react-icons/im";
import { toast } from "react-hot-toast";
import dateFormat from "dateformat";
import StarSvg from "./StarSvg";
import { useSelector } from "react-redux";

function CourseDetails() {
  const [courseDetails, setCourseDetails] = useState([]);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [openReview, setOpenReview] = useState(false);
  const [rated, setRated] = React.useState(1);
  const [review, setReview] = useState("");
  const [reviewButton, setReviewButton] = useState(false);
  const { authorized } = useSelector((state) => state.user);
  const toggleDropdown = (index) => {
    let course = courseDetails.course.map((course, i) => {
      if (i === index) {
        course.open = !course.open;
      } else {
        course.open = false;
      }
      return course;
    });
    setCourseDetails({ ...courseDetails, course });
  };

  const rateCourse = () => {
    toast.loading();
    postCourseReview(courseId, rated, review)
      .then(({ data }) => {
        setOpenReview(false);
        toast.dismiss();
        toast.success(data.message);
      })
      .catch(() => {});
  };

  const rateCourseHandler = () => {
    checkReviewPossible(courseId)
      .then(() => {
        setOpenReview(true);
      })
      .catch(({response}) => {
        toast.error(response.data.message);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCourseView(courseId)
      .then((res) => {
        setCourseDetails(res.data.courseDetails);
        setReviewButton(res.data.reviewPossible);
      })
      .catch((error) => {
        navigate("/");
      });
  }, [openReview]);

  return (
    <section>
      <div className="p-2 lg:p-20 lg:pb-10 mx-auto sm:p-14">
        <div className="flex flex-col-reverse sm:flex-row xl:px-20">
          <div className="w-full lg:w-8/12 ">
            <div className="hidden sm:block xl:ml-1 mb-8">
              <h1 className="text-3xl font-semibold mb-4 ">
                {courseDetails.name}
              </h1>
              <p className="mb-3 mr-6">{courseDetails.about}</p>
              <h3 className="text-[#6255a4] text-2xl font-semibold mb-3">
                Syllabus
              </h3>
            </div>

            <h3 className="text-xl text-theme-color mt-8 font-semibold mb-4 block sm:hidden ">
              Syllabus
            </h3>

            <div className="App">
              <div className="syllabus syllabus-wrap rounded-lg">
                {courseDetails.course?.map((course, index) => (
                  <SyllabusDropdown
                    course={course}
                    index={index}
                    key={index}
                    toggleDropdown={toggleDropdown}
                  />
                ))}
              </div>
            </div>

            {/* //author section */}
            <div>
              <h3 className="text-2xl  mt-8 font-semibold mb-4 ">Tutor</h3>
              <blockquote className="rounded-lg bg-gray-100 p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt="Man"
                    src={
                      courseDetails.teacher?.image
                        ? courseDetails.teacher.image
                        : "/assets/tutor/dp-tutor.avif"
                    }
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <p className="mt-1 text-lg font-medium text-gray-700">
                      {courseDetails.teacher && courseDetails.teacher.name}
                    </p>
                  </div>
                </div>

                <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
                  {courseDetails.teacher && courseDetails.teacher.about}
                </p>
              </blockquote>
            </div>

            <div>
              <h3 className="text-2xl  mt-8 font-semibold mb-4 ">About</h3>
              <div className="border rounded-md p-3 ">
                <p className="text-slate-600 "> {courseDetails?.description}</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-4/12 flex-column  flex  flex-col  items-center sm:items-start ml-0 sm:ml-10 sm:h-screen top-0 sm:sticky ">
            <div className="block sm:hidden p-2 mt-3 mb-3">
              <h1 className="text-3xl font-semibold mb-4">
                {courseDetails.name}
              </h1>
              <p className="mb-3">{courseDetails.about}</p>
            </div>
            {courseDetails.name && <BuyNowCard courseDetails={courseDetails} />}
          </div>
        </div>
      </div>

      <article className="px-5 lg:px-40 mb-10">
        <div className="flex justify-between sm:text-lg">
          <h1 className="text-xl font-bold my-3">Reviews & Ratings</h1>
          {authorized&&
            <button
              className="shadow-md p-3 bg-gray-100 shadow-gray-400 cursor-pointer rounded-lg sm:w-auto sm:px-8"
              onClick={rateCourseHandler}>
              <span className="font-bold">Rate Course</span>
            </button>
          }
        </div>
        {courseDetails.reviews?.length >= 0 ? (
          courseDetails.reviews?.slice(0, 5).map((review, index) => (
            <div key={index}>
              <div className="flex items-center mb-4 space-x-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    review.reviewedBy.image
                      ? review.reviewedBy.image
                      : "/assets/tutor/default-dp.png"
                  }
                  alt=""
                />
                <div className="space-y-1 font-semibold ">
                  <p>
                    {review.reviewedBy.name}
                    <time
                      dateTime="2014-08-16 19:00"
                      className="block text-sm text-gray-500 ">
                      Joined on{" "}
                      {dateFormat(review.reviewedBy.createdAt, "mmmm yyyy")}
                    </time>
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-1">
                <StarSvg count={review.rating} />
              </div>
              <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Reviewed on{" "}
                  <time dateTime="2017-03-03 19:00">
                    {dateFormat(review.createdAt, "mmmm dd, yyyy")}
                  </time>
                </p>
              </footer>
              <p className="mb-2 text-gray-400 ">{review.review}</p>
              <a
                href="#"
                className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                Read more
              </a>
              {/* <aside>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            19 people found this helpful
          </p>
          <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
            <a
              href="#"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Helpful
            </a>
            <a
              href="#"
              className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              Report abuse
            </a>
          </div>
        </aside> */}
            </div>
          ))
        ) : (
          <p className="my-8 mx-6 font-bold">No Ratings yet</p>
        )}
      </article>
      {openReview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center  ">
          <div className="relative flex flex-col items-center bg-gray-50 w-1/3 rounded-lg ">
            <button
              className="place-self-end mx-2 my-2 text-red-600"
              onClick={() => setOpenReview(false)}>
              <ImCross />
            </button>
            <div className="bg-black opacity-10 inset-0 z-0" />
            <div className="sm:max-w-lg w-full p-2  bg-white rounded-xl z-10">
              <label className="text-xl flex justify-center font-extrabold  tracking-wide">
                Rate & Review
              </label>
              <br />
              <div className="flex justify-center gap-2">
                <Rating
                  value={1}
                  className="text-yellow-400"
                  onChange={(value) => setRated(value)}
                />
                <Typography color="blue-gray" className="font-medium">
                  {rated}.0 Rated
                </Typography>
              </div>
              <br />
              <div className="grid grid-cols-1 space-y-2">
                <div className="flex items-center justify-center w-full">
                  <div className="w-full">
                    <Textarea
                      className="w-full h-96 "
                      style={{ borderColor: "black" }}
                      placeholder="write your review"
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={rateCourse}
                  type="submit"
                  className="my-5  bg-blue-500 text-gray-100 p-4 rounded-md tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CourseDetails;
