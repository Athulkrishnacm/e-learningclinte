import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { manageCourse } from "../../../Services/adminApi";
import { toast } from "react-hot-toast";

function CourseCard({ image, title, date, id, isApproved, status ,tutorSide}) {
  const datee = date.slice(0, 10);
  const navigate = useNavigate();
  const [courseStatus, setStatus] = useState(status);
  const handleView = (id) => {
    if(tutorSide){
      return navigate("/tutor/course/details", { state: id });
    }
    navigate("/admin/course/view", { state: id });
  };

  const manage = (courseId) => {
    manageCourse(courseId).then((res) => {
      if (res.status === 200) {
        setStatus(!courseStatus)
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <div className="cursor-pointer rounded-xl bg-[#1F2A40] translate-y-2" onClick={()=>handleView(id)}>
      <img src={image} className="w-full h-36 rounded-t-xl" alt="course img" />
      <div className="mx-5 my-3 h-12">
      <h1 className="text-xl font-bold ">{title.length <= 43 ? title : `${title.slice(0, 43)}...`}</h1>
      </div>
      <p className="my-2 mx-5 text-[#B3A4A4]">{datee}</p>
      <div className="mx-3 my-2 text-lg text-blue-700 ">
        {/* <button onClick={() => handleView(id)} className="mx-2">
          View
        </button> */}
        {isApproved && (
          <button onClick={() => manage(id)} className="mx-3">
            {courseStatus ? "Hide Course" : "Show Course"}
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
