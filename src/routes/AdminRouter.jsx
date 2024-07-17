import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/admin/LoginPage";
import Dashboard from "../pages/admin/Dashboard";
import UserListPage from "../pages/admin/UserListPage";
import TutorListPage from "../pages/admin/TutorListPage";
import CourseListPage from "../pages/admin/CourseListPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import UnAuthenticatedOnlyRoutes from "../utils/UnAuthenticatedOnlyRoutes";
import TutorViewPage from "../pages/admin/TutorViewPage";
import CourseViewPage from "../pages/admin/CourseViewPage";
import TransctionsPage from "../pages/admin/TransctionsPage";
import CouponPage from "../pages/admin/CouponPage";

const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"admin"} route={"/admin"} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/tutors" element={<TutorListPage />} />
        <Route path="/tutor/view" element={<TutorViewPage />} />
        <Route path="/courses" element={<CourseListPage />} />
        <Route path="/course/view" element={<CourseViewPage />} />
        <Route path="/coupons" element={<CouponPage />} />
        <Route path="/transctions" element={<TransctionsPage />} />
      </Route>

      <Route
        element={
          <UnAuthenticatedOnlyRoutes
            role={"admin"}
            route={"/admin/dashboard"}
          />
        }>
        <Route path="/" element={<AdminLoginPage />} />
      </Route>

      <Route path="/*" element={<div>page not found</div>} />
    </Routes>
  );
};

export default AdminRouter;
