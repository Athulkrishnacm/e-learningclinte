import React, { useState, useRef, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { uploadCourse } from "../../../Services/tutorApi";
import { toast } from "react-hot-toast";
import { addCategory } from "../../../Services/adminApi";
import {
  courseValidationSchema,
  courseInitialValues,
  imageUpload,
  handleImage,
} from "../../../constants/constant";

function AddCourse() {
  const [image, setImage] = useState(null);
  const [modal, setModal] = useState(false);
  const fileInputRef = useRef();
  const videoInputRef = useRef();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [pilotVideo, setPilotVideo] = useState(null);

  const formik = useFormik({
    initialValues: courseInitialValues,
    validationSchema: courseValidationSchema,
    onSubmit: async (values) => {
      toast.loading("Please Wait Uploading Course");
      values = {
        ...values,
        course,
      };
      const imageURL = await imageUpload("/course-image/", image);
      const pilotVideoURL = await imageUpload("/course-pilot-video/", pilotVideo);
      await uploadCourse(values, imageURL,pilotVideoURL).then((res) => {
        toast.dismiss();
        if (res.status === 200) {
          toast.success("Successfully uploaded");
          navigate("/tutor/dashboard");
        } else {
          toast.error(res.data.message);
        }
      });
    },
  });

  const [course, setCourse] = useState([]);
  const [chapter, setChapter] = useState("");
  const [lesson, setLesson] = useState([]);
  const [video, setVideo] = useState(null);

  const addChapter = () => {
    setCourse([...course, { chapter, lessons: lesson }]);
    setLesson([]);
    setChapter("");
    setModal(false);
    toast.success("Chapter Add successfull");
  };

  const handleLessonChange = (e) => {
    lessonFormik.setValues((prev) => {
      const formFields = { ...prev };
      formFields[e.target.name] = e.target.value;
      return formFields;
    });
  };

  const lessonFormik = useFormik({
    initialValues: {
      chapterName: "",
      lessonName: "",
    },
    onSubmit: async (values) => {
      toast.loading("Uploading your video");
      const videoUrl = await imageUpload("/Course-Videos/", video);
      values = {
        ...values,
        videoUrl,
      };
      setLesson([...lesson, values]);

      lessonFormik.setFieldValue("lessonName", "");
      lessonFormik.setFieldValue("videoUrl", "");
      setVideo(null);
      toast.dismiss();
    },
  });

  useEffect(() => {
    addCategory().then((res) => {
      if (res.status === 200) {
        setCategoryData(res.data.categories);
      }
    });
  }, []);
  return (
    <div className="h-auto w-full bg-[#141B2D] text-white">
      <NavBar />
      <div className="bg-[#1F2A40] mx-10 rounded-lg px-14">
        <div className="  shadow-gray-800 shadow-2xl">
          <div className=" flex justify-evenly py-5  w-2/3">
            {pilotVideo && (
              <>
                <div className="  justify-evenly ">
                  <video
                    width="320"
                    height="140"
                    controls
                    className=" max-w-xs rounded-md w-full"
                    autoPlay
                    onClick={() => videoInputRef.current.click()}
                    >
                    <source
                      src={URL.createObjectURL(pilotVideo)}
                      type={pilotVideo.type}
                    />
                  </video>
                  <p className="text-center mt-3"> Pilot video</p>
                </div>
              </>
            )}
            <div className={pilotVideo && "hidden"}>
              <label
                htmlFor="dropzone-file1"
                className="flex flex-col items-center justify-center   max-w-sm w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center p-2">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p>Course Pilot Video</p>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    MKV, MP4 or AVI (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file1"
                  ref={videoInputRef}
                  type="file"
                  className="hidden"
                  required
                  onChange={(e) => setPilotVideo(e.target.files[0])}
                />
              </label>
              <p className="text-center mt-3"> Pilot video</p>
            </div>
            {image && (
              <div className=" ">
                <img
                  className="h-44 max-w-xs rounded-md w-full "
                  src={URL.createObjectURL(image)}
                  alt="image description"
                  onClick={() => fileInputRef.current.click()}></img>
                <p className="text-center mt-3"> Course thumbnail</p>
              </div>
            )}
            <div className={image && "hidden"}>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center   max-w-sm w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center p-2">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p>Course thumbnail</p>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG or JPG (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  required
                  onChange={(e) => setImage(handleImage(e))}
                />
              </label>
              <p className="text-center mt-3"> Course thumbnail</p>
            </div>
          </div>

          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-wrap mx-10 my-3 text-white gap-5">
                <div className="w-full md:w-2/6   md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="name">
                    Name
                  </label>
                  <input
                    className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    name="name"
                    placeholder="Course   Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <p className="form-error text-[#ff1313] font-mono">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>
                <div className="w-full md:w-2/6   md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="about">
                    About
                  </label>
                  <input
                    className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    name="about"
                    placeholder="write a short description"
                    onChange={formik.handleChange}
                    value={formik.values.about}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.about && formik.touched.about ? (
                    <p className="form-error text-[#ff1313] font-mono">
                      {formik.errors.about}
                    </p>
                  ) : null}
                </div>
                <div className="w-full md:w-2/6   md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="duration">
                    Duration
                  </label>
                  <input
                    className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    name="duration"
                    placeholder="Course Duration"
                    onChange={formik.handleChange}
                    value={formik.values.duration}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.duration && formik.touched.duration ? (
                    <p className="form-error text-[#ff1313] font-mono">
                      {formik.errors.duration}
                    </p>
                  ) : null}
                </div>
                <div className="w-full md:w-2/6   md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="language">
                    Language
                  </label>
                  <input
                    className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    name="language"
                    placeholder="Course Language"
                    onChange={formik.handleChange}
                    value={formik.values.language}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.language && formik.touched.language ? (
                    <p className="form-error text-[#ff1313] font-mono">
                      {formik.errors.language}
                    </p>
                  ) : null}
                </div>

                <div className="w-full md:w-2/6   md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="price">
                    Price
                  </label>
                  <input
                    className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    name="price"
                    placeholder="Course Price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.price && formik.touched.price ? (
                    <p className="form-error text-[#ff1313] font-mono">
                      {formik.errors.price}
                    </p>
                  ) : null}
                </div>
                <div className="w-full md:w-2/6   md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="category">
                    Category
                  </label>
                  <select
                    name="category"
                    className="block border text-black border-grey-light w-full p-3 rounded mb-4"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                    onBlur={formik.handleBlur}>
                    <option value="">Select Category</option>
                    {categoryData.map((category, index) => {
                      return (
                        <option
                          key={index}
                          value={category._id}
                          className="block border border-grey-light w-full p-3 rounded mb-4">
                          {category.name}
                        </option>
                      );
                    })}

                    <option
                      value="other"
                      className="block border border-grey-light w-full p-3 rounded mb-4">
                      Other
                    </option>
                  </select>
                </div>

                <div className="mb-4 w-full md:w-2/6">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="5"
                    name="description"
                    className="block p-3 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.description && formik.touched.description ? (
                    <p className="form-error text-[#ff1313] font-mono">
                      {formik.errors.description}
                    </p>
                  ) : null}
                </div>

                <div className="mt-">
                  <label
                    className="block uppercase tracking-wide -600 text-xs font-bold mb-2"
                    htmlFor="addchapter">
                    Add Chapter
                  </label>

                  <div className="chapter mt-7">
                    <button
                      type="button"
                      onClick={() => setModal(true)}
                      className=" bg-gray-700 hover:bg-gray-600   focus:ring-4 focus:outline-none text-white focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span className="ml-3 ">Add Chapter</span>
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-700 rounded-2xl mx-10 mb-5 px-3 py-3">
                Submit Course
              </button>
            </form>
          </div>
        </div>
      </div>

      {modal && (
        <div className="fixed top-0 left-0 z-[1055]  h-full w-full backdrop-blur-sm outline-none flex items-center justify-center">
          <div className="pointer-events-none relative w-auto translate-y-[-50px]  duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:max-w-[1140px]">
            <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-[#1d2e56] bg-clip-padding text-current shadow-lg outline-none ">
              <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-50 p-4 ">
                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                  Add Chapter
                </h5>

                <button
                  onClick={() => {
                    lessonFormik.setValues({});
                    setModal(false);
                  }}
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-7">
                <div className="flex ">
                  <div className="relative mb-3 w-full md:w-1/2 m-3">
                    <input
                      type="text"
                      className="peer block min-h-[auto] w-full rounded border-gray-300 bg-gray-900 py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                      name="chapterName"
                      value={chapter}
                      onChange={(e) => {
                        handleLessonChange(e);
                        setChapter(e.target.value);
                      }}
                      onBlur={() => {
                        if (chapter.trim() !== "") {
                          return;
                        }
                        setChapter("");
                      }}
                    />

                    {lessonFormik.touched.chapterName &&
                    lessonFormik.errors.chapterName ? (
                      <p className="text-red-500 text-xs ">
                        {lessonFormik.errors.chapterName}
                      </p>
                    ) : null}

                    <label
                      htmlFor="chapterName"
                      className={`pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out ${
                        chapter.trim() !== ""
                          ? "-translate-y-[1.7rem] scale-[0.8] text-primary"
                          : ""
                      } motion-reduce:transition-none dark:text-neutral-200 dark:${
                        chapter.trim() !== "" ? "text-primary" : ""
                      }`}>
                      Chapter Name
                    </label>
                  </div>
                </div>

                <div className="flex  mt-5 ">
                  <div className="relative mb-3 w-full md:w-1/2 m-3">
                    <input
                      type="text"
                      className="peer block min-h-[auto] w-full rounded border-gray-300 bg-gray-900 py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      name="lessonName"
                      value={lessonFormik.values.lessonName}
                      onChange={(e) => {
                        handleLessonChange(e);
                      }}
                      onBlur={() => {
                        if (lessonFormik.values.lessonName.trim() !== "") {
                          return;
                        }
                        lessonFormik.setFieldValue("lessonName", "");
                      }}
                    />
                    {lessonFormik.touched.lessonName &&
                    lessonFormik.errors.lessonName ? (
                      <p className="text-red-500 text-xs ">
                        {lessonFormik.errors.lessonName}
                      </p>
                    ) : null}
                    <label
                      htmlFor="lessonName"
                      className={`pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out ${
                        lessonFormik.values?.lessonName.trim() !== ""
                          ? "-translate-y-[1.7rem] scale-[0.8] text-primary"
                          : ""
                      } motion-reduce:transition-none dark:text-neutral-200 dark:${
                        lessonFormik.values.lessonName.trim() !== ""
                          ? "text-primary"
                          : ""
                      }`}>
                      Lesson Name
                    </label>
                  </div>
                  <div className="relative mb-3 w-full md:w-1/2 sm:w-1/1 m-3">
                    <input
                      type="file"
                      name="video"
                      className="peer block min-h-[auto] w-full rounded border-gray-300 bg-gray-900 py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      onChange={(e) => setVideo(e.target.files[0])}
                    />
                  </div>
                  <div className="relative mb-3 w-full md:w-1/3 m-3">
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                      onClick={lessonFormik.handleSubmit}>
                      Add Lesson
                    </button>
                  </div>
                </div>

                {lesson[0] ? (
                  <div>
                    <div>
                      <h1 className="m-3">Lessons</h1>
                    </div>

                    <div className="flex flex-wrap">
                      {lesson.map((obj, index) => {
                        return (
                          <div className="w-full  md:w-1/2" key={index}>
                            <div className="m-2">
                              <div className="flex flex-col items-center  rounded-lg shadow md:flex-row md:max-w-xl  border-gray-700 bg-gray-800 hover:bg-gray-700">
                                <div className="flex flex-col justify-between px-3 py-2  leading-normal">
                                  <h5 className=" text-md font-semibold tracking-tighttext-white">
                                    <span className="mr-3">{index + 1}.</span>
                                    {obj.lessonName}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="mt-8 w-full  flex justify-end mr-7">
                        <button
                          type="button"
                          onClick={addChapter}
                          className=" form-btn mt-2 font-medium rounded bg-blue-600 p-3">
                          <span className="txt">Submit Chapter</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCourse;
