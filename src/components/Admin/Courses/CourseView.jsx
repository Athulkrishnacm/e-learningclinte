import React, { useEffect, useRef, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseDetails } from "../../../Services/adminApi";
import SyllabusDropdown from "../../User/Course/SyllabusDropdown/SyllabusDropdown";
import { deleteCourse } from "../../../Services/tutorApi";
import { toast } from "react-hot-toast";

function CourseView({ tutor=false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state;
  const [course, setCourse] = useState(null);
  const [video, setVideo] = useState(null);
  const [playerHeight, setPlayerHeight] = useState("");
  
  const videoRef = useRef(null);
  const handleApprove = (status) => {
    getCourseDetails(courseId, status).then(() => {
      navigate("/admin/courses");
    });
  };

  useEffect(() => {
    getCourseDetails(courseId,false,tutor).then((response) => {
      response.data.course.course = response.data.course.course.map((obj) => {
        return { ...obj, open: false };
      });
      setCourse(response.data.course);
    });

    function handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1080) {
        setPlayerHeight("380");
      } else if (windowWidth >= 720) {
        setPlayerHeight("240");
      } else {
        setPlayerHeight("240");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (index) => {
    let cours = course.course.map((course, i) => {
      if (i === index) {
        course.open = !course.open;
      } else {
        course.open = false;
      }
      return course;
    });
    setCourse({ ...course, cours });
  };

  const handleDelete = () => {
    try {
      deleteCourse(courseId)
        .then(({ data }) => {
          toast.success(data.message);
          navigate("/tutor/dashboard");
        })
        .catch(() => {
          toast.error(data.message);
        });
    } catch (error) {}
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
    }
  }, [video]);
 
  return (
    <>
      <div className="h-auto w-full bg-[#141B2D] text-white">
        <NavBar />
        <h1 className="text-3xl mx-5 uppercase  text-white font-bold tracking-widest">
          Courses
        </h1>

        <div className="h-auto  rounded-lg m-10 bg-[#1F2A40] pb-5 p-8">
          <div className="mx-10 grid grid-cols-2 gap-10 mb-10">
            <div>
              {video ? (
               <div>
               <video
               className="w-full h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
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
                    setVideo(course?.course[0]?.lessons[0]);
                  }}
                  className="cursor-pointer relative flex justify-center items-center ">
                  <div className="absolute text-white ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="fill"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
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
                    className="w-full"
                    src={course && course.imageURL}
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className="bg-white  rounded-lg">
              <div className="syllabus syllabus-wrap rounded-lg text-black mt-2">
                {course?.course.map((course, index) => (
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

          <div className=" mx-10  bg-[#141B2D] rounded-md flex ">
            <div>
              <p className="text-xl p-5">Course Name</p>
              <p className="text-xl p-5">Language</p>
              <p className="text-xl p-5 ">Duration</p>
              <p className="text-xl p-5">Category</p>
              <p className="text-xl p-5"> Price </p>
              <p className="text-xl p-5">About</p>
              <p className="text-xl p-5">Description</p>
            </div>
            <div>
              <p className="text-xl p-5">{course?.name}</p>
              <p className="text-xl p-5">{course?.language}</p>
              <p className="text-xl p-5 ">{course?.duration}</p>
              <p className="text-xl p-5">{course?.category.name}</p>
              <p className="text-xl p-5">{course?.price}</p>
              <p className="text-xl p-5">{course?.about}</p>
              <p className="text-xl p-5">{course?.description}</p>
            </div>
          </div>
          <div className="flex justify-end mx-32 m-6">
            {!course?.isApproved && !tutor && (
              <>
                <button
                  onClick={() => handleApprove(false)}
                  className="bg-red-500 px-7 py-2 rounded-xl  text-center  text-white focus:outline-none my-1">
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(true)}
                  className="bg-green-500 px-7 py-2 rounded-xl mx-5 text-center  text-white  focus:outline-none my-1">
                  Approve
                </button>
              </>
            )}

            {tutor && (
              <>
                <button
                  className="bg-red-500 px-7 py-2 rounded-xl  text-center  text-white focus:outline-none my-1"
                  onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseView;
