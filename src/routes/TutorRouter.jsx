import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../utils/PrivateRoutes";
import TutorLoginPage from "../pages/tutor/TutorLoginPage";
import TutorSignupPage from "../pages/tutor/TutorSignupPage";
import DashboardPage from "../pages/tutor/DashboardPage";
import CoursePage from "../pages/tutor/CoursePage";
import MessagePage from "../pages/tutor/MessagePage";
import ProfilePage from "../pages/tutor/ProfilePage";
import UnAuthenticatedOnlyRoutes from "../utils/UnAuthenticatedOnlyRoutes";
import CourseDetailsPage from "../pages/tutor/CourseDetailsPage";

const TutorRouter = () => {
  return (
    <Routes>
      
      <Route element={<PrivateRoutes role={"tutor"} route={"/tutor"} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/course/details" element={<CourseDetailsPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route element={<UnAuthenticatedOnlyRoutes role={"tutor"} route={"/tutor/dashboard"} />}>
        <Route path="/" element={<TutorLoginPage />} />
        <Route path="/signup" element={<TutorSignupPage />} />
      </Route>
    </Routes>
  );
};

export default TutorRouter;
