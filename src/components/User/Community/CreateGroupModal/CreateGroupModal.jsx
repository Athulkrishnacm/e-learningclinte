import React, { useEffect, useRef } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { createGroup } from "../../../../Services/userApi";
import { imageUpload } from "../../../../constants/constant";

function CreateGroupModal({modalStatus}) {
  //image input box
  const fileInputRef = useRef();
  const handleClick = () => {
    fileInputRef.current.click();
  };

  //form validation
  const validate = Yup.object({
    name: Yup.string().required("Group Name Required"),
    image: Yup.string(),
    description: Yup.string().required("Description Required"),
  });

  //formik for create group
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      description: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
        toast.loading("Please wait creating group")
      const image = await imageUpload("/group-profiles/", values.image);
      values ={
        ...values,
        image
      }
      createGroup(values).then(({ data }) => {
        toast.dismiss()
        toast.success(data.message);
        modalStatus(false)
      });
    },
  });
  
  //formik input data
  const handleChange = (e) => {
    formik.setValues((prev) => {
      const formFields = { ...prev };
      if (e.target.name == "image") {
        formFields[e.target.name] = e.target.files[0];
      } else {
        formFields[e.target.name] = e.target.value;
      }
      return formFields;
    });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-scrool fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative  w-full my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 mt-32 md:mt-28  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">Create New Group</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity- float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={()=>modalStatus(false)}>
                <span className="bg-transparent text-black opacity- h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>

            {/* //image section */}
            <div className="relative p-3 flex-auto">
              <div className="">
                {formik.values.image && (
                  <div className="flex items-center justify-center w-full cursor-pointer ">
                    <img
                      className=" max-w-lg   w-64 h-44 course-image"
                      src={
                        formik.values.image
                          ? URL.createObjectURL(formik.values.image)
                          : ""
                      }
                      alt="image description"
                      onClick={handleClick}></img>
                  </div>
                )}
                <div>
                  <div
                    className={
                      formik.values.image
                        ? " items-center justify-center w-full hidden"
                        : "flex items-center justify-center w-full"
                    }>
                    <div className="w-full lg:w-2/3 flex justify-center md:w-1/2 sm:w-1/1">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center  justify-center w-64 h-44 border-2 border-gray-300 border-dashed  cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <BiCloudUpload size={22} />
                          <p>Group Image</p>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                          </p>
                          <p className="text-xs text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          name="image"
                          className="hidden"
                          required
                          ref={fileInputRef}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  {formik.touched.image && formik.errors.image ? (
                    <p className="text-red-500 text-xs mt-2 text-center">
                      {formik.errors.image}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* //group name and type */}
              <div className="flex   ">
                <div
                  className="relative mx-3 w-full"
                  data-te-input-wrapper-init>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-900 dark:text-white">
                      Group Name
                    </label>
                    <input
                      value={formik.values.name}
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      name="name"
                      placeholder="Name"
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  {formik.touched.name && formik.errors.name ? (
                    <p className="text-red-500 text-xs mt-2">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* description group */}
              <div className="flex flex-col md:flex-row">
                <div className="relative mb-3  md:w-full mx-3">
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Description{" "}
                    </label>
                    <textarea
                      value={formik.values.description}
                      id="description"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                      name="description"
                      placeholder="Description about community"
                      onChange={(e) => {
                        handleChange(e);
                      }}></textarea>
                  </div>
                  {formik.touched.description && formik.errors.description ? (
                    <p className="text-red-500 text-xs mt-2">
                      {formik.errors.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={()=>modalStatus(false)}>
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={formik.handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default CreateGroupModal;
