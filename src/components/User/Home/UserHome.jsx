import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "/icons/design.svg";
import logo2 from "/icons/monitor.svg";
import logo3 from "/icons/it-logo.svg";
import logo4 from "/icons/business-logo.svg";
import CategoryCard from "./CategoryCard";
import CourseCard from "../CourseCard/CourseCard";
import homekid from "/assets/home-kid.png";
import { homeCourseLoad } from "../../../Services/userApi";
import Button from "../Button/Button";
import { FaSearch } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import CardSkeleton from "../CourseCard/CardSkeleton";

function UserHomePage() {
  const [courses, setCourse] = useState([]);
  const [courseCount, setCourseCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setsearchQuery] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    homeCourseLoad(courseCount).then(({ data }) => {
      setCourse(data.courseData);
      setTotalCount(data.total);
      setIsLoading(false);
    });
  }, [courseCount]);

  const categoryData = [
    {
      icon: logo1,
      title: "Design",
      color: "#EFEFF6",
      hoverColor: "#0d6efd",
      content:
        "Learn how to design your website. We have a wide range of designing courses from which you can select the best that suits you.",
    },
    {
      icon: logo2,
      title: "Development",
      color: "#F68C201A",
      content:
        "Learn how to develop your software and websites. We provide you with a wide range of different development courses that will help you to learn more.",
    },
    {
      icon: logo3,
      title: "IT & Software",
      color: "#BBF0FF80",
      content:
        "If you want to learn something new in IT and Software, then this is the right place to help you with different IT and Software courses from which you can get the one for you.",
    },
    {
      icon: logo4,
      title: "Business",
      color: "#CEF6D680",
      content:
        "If you want to be a successful business owner, our courses will help you do so. Book your course now.",
    },
  ];

  const keyDownHandler = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      navigate('/search',{state:searchQuery})
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 bg-[#EAEDFB] bg-[url('/assets/home-bg.png')]">
        <div className="px-5 lg:px-24 w-full">
          <div className="">
            <div>
              <p className="py-5 md:pt-28 text-lg sm:text-2xl text-[#685f78] font-semibold">
                Start your favourite course
              </p>
            </div>
            <div className=" text-4xl sm:text-5xl  text-[#002058] font-bold leading-[1.2]">
              <p>Now learning from anywhere, and build your bright career.</p>
            </div>
          </div>
          <div className="py-5 sm:py-10">
            <Link to="/course">
              <Button>Explore courses</Button>
            </Link>
          </div>
          <div className="pt-5 sm:p-0 sm:pr-10">
            <div className="relative">
              <input
                className="h-14 pl-10 pr-16 rounded-full w-full outline-none text-lg border-white"
                type="text"
                placeholder="Search Course..."
                onChange={(e) => setsearchQuery(e.target.value)}
                value={searchQuery}
                onKeyDown={keyDownHandler}
              />
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500">
                <FaSearch />
              </div>
              <Link to={"/search"} state={searchQuery}>
                <button className="absolute my-2 inset-y-0 right-4 flex items-center p-3 rounded-full bg-red-400">
                  <AiOutlineArrowRight />
                </button>
              </Link>
            </div>
          </div>
          <div className=" py-10">
            <p className="text-xl text-[#685f78] font-semibold">
              Trusted by over 15K Users
              <br />
              worldwide since 2022
            </p>
          </div>
        </div>
        <div className="">
          <div className="xl:mx-16 xl:p-16 ">
            <img className="" src={"/assets/home-image.png"} alt="home-pic" />
          </div>
        </div>
      </div>

      <div className="">
        <div className="grid justify-items-center m-5">
          <div>
            <h4 className="font-bold text-3xl  p-3 text-center">
              Choose favourite course from top category
            </h4>
          </div>
          <div className="p-3">
            <Link to="/course">
              <Button>See All category</Button>
            </Link>
          </div>
        </div>
        <div className="px-10 mt-6 mb-10 gap-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
          {categoryData.map((card, index) => (
            <CategoryCard
              key={index}
              icon={card.icon}
              title={card.title}
              color={card.color}
              hoverColor={card.hoverColor}
              content={card.content}
            />
          ))}
        </div>
      </div>
      <div>
        <div>
          <h5 className="font-semibold font-outfit text-center uppercase text-3xl">
            Choose your course
          </h5>
        </div>
        <div className="mt-5">
          <h5 className="font-semibold text-center uppercase text-2xl">
            We Have Tones of Course for You !!
          </h5>
        </div>
        <h1 className="m-5 ml-16 font-semibold text-3xl  max-sm:ml-24">
          Top Courses
        </h1>
        <div className="relative mx-8 gap-5 sm:mx-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {courseCount !== 1 && (
            <button
              onClick={() => setCourseCount(courseCount - 1)}
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white  group-hover:bg-blue-500 group-focus:ring-2 ring-2">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M15 19l-7-7 7-7"></path>
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
          )}
          {isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            courses.map((course, index) => {
              return <CourseCard key={index} course={course} />;
            })
          )}

          {courseCount * 5 < totalCount && (
            <button
              onClick={() => setCourseCount(courseCount + 1)}
              type="button"
              className="absolute  top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white  group-hover:bg-blue-500 group-focus:ring-2 ring-2 ">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5  sm:w-6 sm:h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M9 5l7 7-7 7"></path>
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          )}
        </div>
        <div className=" grid xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 bg-[#F2FFF7] my-20">
          <div className="w-full">
            <div className="max-sm:px-8 max-sm:pt-10 px-20 pt-10 ">
              <h3 className="text-5xl font-medium leading-tight">
                Platform for Connect and build your career
              </h3>
            </div>
            <div className="max-sm:px-8 px-20 mt-7 font-normal font-outfit">
              <h1 className="text-lg">
                We want our users to be able to communicate with Tutors through
                our platform. Embrace collaboration, connect with others, and
                code. A simple glance at your showcased projects will connect
                you directly with startups and top-notch companies.
              </h1>
            </div>
            <div className="max-sm:px-12 px-20 mt-5">
              <Link to={"community"}>
                <Button className="bg-[#232946] hover:bg-[#232946] text-white mb-5 py-2 px-4 rounded">
                  Connect
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid justify-items-center max-sm:hidden">
            <img src={homekid} className="w-96 " alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHomePage;
