import React from "react";
import SideBar from "../../components/Admin/SideBar/SideBar";
import CourseList from "../../components/Admin/Courses/CourseList";

function CourseListPage() {
  return (
    <div className="flex  ">
      <SideBar />
      <CourseList />
    </div>
  );
}

export default CourseListPage;
