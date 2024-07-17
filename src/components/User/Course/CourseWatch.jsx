import React, { useState, useEffect, useRef } from "react";
import SyllabusDropdown from "./SyllabusDropdown/SyllabusDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getCourseWatch, updateProgressOfTheVideo } from "../../../Services/userApi";
import { clearCourseDetails, setCourseDetails } from "../../../Redux/app/courseSlice";

function CourseWatch() {
  const dispatch = useDispatch();
  const [playerHeight, setPlayerHeight] = useState("");
  const [video, setVideo] = useState(null);
  const courseDetails = useSelector((state) => state.course.value);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const toggleDropdown = (index) => {
    let course = courseDetails.course.map((course, i) => {
      if (i === index) {
        return {
          ...course,
          open: !course.open,
        };
      } else {
        return {
          ...course,
          open: false,
        };
      }
    });
    dispatch(setCourseDetails({ ...courseDetails, course }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!courseDetails) {
      getCourseWatch(courseId)
        .then((response) => {
          const course = response.data.courseDetails.course.map((obj) => {
            return { ...obj, open: false };
          });
          dispatch(
            setCourseDetails({ ...response.data.courseDetails, course })
          );
        })
        .catch((error) => {
          toast.error(error.response.data.err);
          navigate("/");
        });
    }
    // const lastVideo = localStorage.getItem("lastVideo");
    // console.log(lastVideo);
    // if (lastVideo) {
    //   setVideo(lastVideo);
    // }
    //screen resize
    function handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1080) {
        setPlayerHeight("589");
      } else if (windowWidth >= 720) {
        setPlayerHeight("380");
      } else {
        setPlayerHeight("240");
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () =>{
      dispatch(clearCourseDetails())
      window.removeEventListener("resize", handleResize);
    } 
  }, []);

  const handleTimeUpdate = () => {
    const videoElement = videoRef.current;
    const currentTime = videoElement.currentTime;
    const duration = videoElement.duration;
    const remainingTime = duration - currentTime;
    localStorage.setItem(video._id, currentTime.toString())
    if (remainingTime <= 1) {
      updateProgressOfTheVideo(courseId,video._id)
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause();
      videoElement.src = "";
      videoElement.load();
      videoElement.src = video.videoUrl;
      videoElement.load();
      videoElement.play();
      localStorage.setItem("lastVideo",video.videoUrl);
      const storedTime = localStorage.getItem(video._id);
    if (storedTime) {
      const parsedTime = parseFloat(storedTime);
      if (!isNaN(parsedTime)) {
        videoElement.currentTime = parsedTime;
      }
    }
    }
  }, [video]);
  return (
    <section className="mx-2 sm:mx-20">
      <div className="mx-auto  h-screen">
        <div className="flex flex-col sm:flex-row  ">
          <div className="w-full lg:w-8/12 overflow-auto">
            <div className="flex text-slate-700 items-center py-4 pl-2 border-b border-slate-300">
              <Link to={`/my-courses`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5">
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              <h1 className="ml-3 text-md ">
                {courseDetails && courseDetails.name}
              </h1>
            </div>

            <div>
              {video ? (
                <div>
                  <video
                  className="w-full h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
                  onTimeUpdate={handleTimeUpdate}
                    ref={videoRef}
                    width="1012"
                    height={playerHeight}
                    controls
                    autoPlay>
                    <source src={video.videoUrl} type={video.type} />
                  </video>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setVideo(courseDetails.course[0].lessons[0]);
                  }}
                  className="cursor-pointer relative flex justify-center items-center h-96">
                  <div className="absolute text-white ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-16 h-16">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                      />
                    </svg>
                  </div>
                  <img
                    className="h-full"
                    src={courseDetails && courseDetails.imageURL}
                    alt=""
                  />
                </div>
              )}

              <div className="course-info-wrap p-5">
                {/* //author section */}

                <div>
                  <h3 className="text-2xl  mt-8 font-semibold mb-4 ">Author</h3>
                  <blockquote className="rounded-lg bg-gray-100 p-8">
                    <div className="flex items-center gap-4">
                      <img
                        alt="Man"
                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                        className="h-16 w-16 rounded-full object-cover"
                      />

                      <div>
                        <p className="mt-1 text-lg font-medium text-gray-700">
                          {courseDetails && courseDetails?.teacher?.name}
                        </p>
                      </div>
                    </div>

                    <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
                      {courseDetails && courseDetails.teacher?.about}
                    </p>
                  </blockquote>
                </div>

                {/* //about section */}

                <div>
                  <h3 className="text-2xl  mt-8 font-semibold mb-4 ">About</h3>
                  <div className="border rounded-md p-3 ">
                    <p className="text-slate-600 mt-4">
                      {courseDetails && courseDetails.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-4/12 border-l border-slate-300  items-center  sm:h-screen top-0 sm:sticky overflow-auto ">
            <div>
              <div className="border-b border-slate-300 p-3 w-full relative z-50 bg-white">
                <h3 className="text-2xl  font-semibold tracking-wider">
                  Syllabus
                </h3>
              </div>
              <div>
                <div className="">
                  <div className="syllabus syllabus-wrap    rounded-lg">
                    {courseDetails &&
                      courseDetails.course?.map((course, index) => (
                        <SyllabusDropdown
                          course={course}
                          index={index}
                          key={index}
                          toggleDropdown={toggleDropdown}
                          setVideo={setVideo}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseWatch;
