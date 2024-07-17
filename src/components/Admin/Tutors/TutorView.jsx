import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import image from "/assets/tutor/default-dp.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getTutorDetails } from "../../../Services/adminApi";
import { MdClose } from "react-icons/md";

function TutorView() {
  const location = useLocation();
  const tutorId = location.state?.userId;
  const [tutor, setTutor] = useState(null);
  const navigate = useNavigate();

  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleApprove = (status) => {
    const tutorView = false;
    getTutorDetails(tutorId, tutorView, status).then((res) => {
      navigate("/admin/tutors");
    });
  };
  useEffect(() => {
    const tutorView = true;
    getTutorDetails(tutorId, tutorView).then((res) => {
      setTutor(res.data.tutor);
    });
  }, []);

  return (
    <div className="h-auto w-full bg-[#141B2D]">
      <NavBar />
      <h1 className="text-3xl mx-5 uppercase  text-white  font-bold tracking-widest">
        Tutor Detail
      </h1>

      <div className="bg-[#1F2A40]  h-auto m-10 grid grid-cols-10 text-white shadow-slate-200">
        <div className="my-10 mx-8 col-span-4 bg-[#33405a] rounded-md">
          <div className="flex justify-center my-5">
            <img
              src={tutor?.image ?tutor?.image :image}
              className="rounded-full w-36 "
              alt="profile picture"
            />
          </div>
          <div className="py-10 ">
            <div className="mx-16">

              <div className="flex flex-wrap  mb-3 ">
                <div className="w-32">
                  <p className="text-lg ">Name</p>
                </div>
                <div>
                  <h1 className="text-lg">{tutor?.name}</h1>
                </div>
              </div>

              <div className="flex flex-wrap mb-3 ">
                <div className="w-32">
                  <p className="text-lg ">E-mail</p>
                </div>
                <div>
                  <h1 className="text-lg">{tutor?.email}</h1>
                </div>
              </div>

              <div className="flex flex-wrap  ">
                <div>
                  <p className="text-lg w-32">Phone</p>
                </div>
                <div>
                  <h1 className="text-lg">{tutor?.phone}</h1>
                </div>
              </div>
            </div>

            {!tutor?.isApproved && <div className="my-10 flex justify-center">
              <button
                onClick={() => handleApprove(true)}
                className="w-32 bg-green-600 text-center py-3 rounded-xl  text-white hover:bg-[#1e4612] focus:outline-none my-1">
                Approve
              </button>
            </div>}
          </div>
        </div>
        <div className="col-span-6 font-normal font-sans">
          <div className="my-10">
          <h1 className="text-xl px-10 py-2">
            About
          </h1>
          <p className="px-10">{tutor?.about}</p>
          <h1 className="text-xl px-10 py-3">Certificate</h1>
          <img
            src={tutor?.certificate}
            className="h-40 px-10"
            alt="certificate"
            onClick={togglePreview}
            />

            </div>
          {showPreview && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-sm bg-opacity-75">
              <div className="relative">
                <button
                  className="absolute top-2 right-2 text-white text-2xl"
                  onClick={togglePreview}
                  aria-label="Close">
                  <MdClose className="h-6 w-6" color="black" />
                </button>
                <img
                  src={tutor?.certificate}
                  className="max-w-3xl max-h-3xl"
                  alt="certificate preview"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TutorView;
