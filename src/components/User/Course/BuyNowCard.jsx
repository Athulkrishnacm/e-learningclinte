import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";
import { ImFilm } from "react-icons/im";
import { GrLanguage } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import { isCourseEnrolled } from "../../../Services/userApi";
import { Dialog, Transition } from "@headlessui/react";

function BuyNowCard({ courseDetails }) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const user = useSelector((state) => state.user);
  const getLessonsCount = () => {
    let count = 0;
    courseDetails.course.map((chapter) => {
      return (count += chapter.lessons.length);
    });
    return count;
  };

  useEffect(() => {
    if (user.authorized) {
      isCourseEnrolled(courseDetails._id).then((response) => {
        if (response.data.enrolled) {
          setIsEnrolled(true);
        }
      });
    }
  }, []);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-sm  bg-white border border-gray-200 rounded-lg w-full md:w-80 shadow  ">
      <div className=" relative ">
        <img
          className="rounded w-full object-cover"
          src={courseDetails.imageURL}
          alt="course thumbnail"
        />
        <div
          className="absolute inset-0 flex items-center justify-center z-10 "
          onClick={() => setModalOpen(true)}>
          <svg
            className="w-24 h-12 cursor-pointer"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="white" />
            <path d="M37.5 25L75 50L37.5 75V25Z" fill="black" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
      </div>

      <Transition show={modalOpen} as={Fragment}>
        <Dialog onClose={() => setModalOpen(false)}>
          {/* 2. The backdrop layer */}
          <Transition.Child
            className="fixed inset-0 z-[99999] bg-black bg-opacity-70 transition-opacity "
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />
          {/* 3. The modal video */}
          <Transition.Child
            className="fixed inset-0 z-[99999] flex  "
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-75"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75">
            <div className=" flex  mx-5 sm:mx-auto my-auto">
              <Dialog.Panel className="shadow-2xl    overflow-hidden">
                <div className=" bg-[#1c1d1f] ">
                  <div className="flex justify-between p-8 pb-3  text-white ">
                    <h1 className="text">Course Preview</h1>
                    <MdClose
                      size={20}
                      onClick={() => setModalOpen(false)}
                      cursor="pointer"
                    />
                  </div>
                  <div className="px-7 text-white">
                    <h1 className="text-xl max-w-[30rem] break-words">
                      {courseDetails.name}
                    </h1>
                  </div>
                  <div className="p-7">
                    <video
                      className="rounded-lg"
                      autoPlay
                      controls="hover"
                      width={"500px"}>
                      <source src={courseDetails.pilotVideo} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>

      <div className="p-5 pt-2">
        <div className="flex justify-between ">
          <div>
            <div className="flex">
              <img
                src={"/icons/tutorIcon.png"}
                alt="tutorlogo"
                className="h-7 m-1"
              />
              <p className="mx-1 my-1.5">Instructor</p>
            </div>
            <div className="flex mx-2 my-2 ">
              <AiOutlineClockCircle size={20} />
              <p className="mx-3.5">Duration</p>
            </div>
            <div className="flex mx-2 my-3 ">
              <ImFilm size={20} />
              <p className="mx-3.5">Lectures</p>
            </div>
            <div className="flex mx-2 my-3 ">
              <GrLanguage size={20} />
              <p className="mx-3.5">Language</p>
            </div>
          </div>

          <div>
            <p className="my-2">{courseDetails.teacher.name}</p>
            <p className="my-3">{courseDetails.duration}</p>
            <p className="my-3">{getLessonsCount()} Lessons</p>
            <p className="my-3">{courseDetails.language}</p>
          </div>
        </div>

        <h5 className="mb-2 m-2 text-2xl font-bold tracking-tight text-gray-900">
          ₹ {courseDetails.price}
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">Life Long Validity</p>

        <div className="button">
          {isEnrolled ? (
            <Link to={`/course/view/${courseDetails._id}`} className="w-full">
              <button className="bg-[#6255a4] p-3 flex justify-center text-white loading-btn form-btn mt-2 font-medium rounded w-full">
                Continue Learning
              </button>
            </Link>
          ) : (
            <Link
              className="w-full"
              to={`/course-payment/${courseDetails._id}`}>
              <button className="bg-[#6255a4] p-3 flex justify-center text-white loading-btn form-btn mt-2 font-medium rounded w-full">
                Buy Now
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="border-t pl-5 mt-4 mb-4">
        <h4 className="font-semibold mt-3">Whats included</h4>
        <p className="mt-3">Online accessibility</p>
      </div>
    </div>
  );
}

export default BuyNowCard;
