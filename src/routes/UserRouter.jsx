import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../utils/PrivateRoutes";
import UnAuthenticatedOnlyRoutes from "../utils/UnAuthenticatedOnlyRoutes";
import UserLoginPage from "../pages/user/UserLoginPage";
import UserSignupPage from "../pages/user/UserSignupPage";
import UserHomePage from "../pages/user/UserHomePage";
import UserOtp from "../components/Auth/SignUp/UserOtp";
import UserCoursePage from "../pages/user/UserCoursePage";
import CourseDetailsPage from "../pages/user/CourseDetailsPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import CourseWatchPage from "../pages/user/CourseWatchPage";
import OrderSucessPage from "../pages/user/OrderSucessPage";
import OrderSummaryPage from "../pages/user/OrderSummaryPage";
import MyCoursePage from "../pages/user/MyCoursePage";
import PurchaseHistoryPage from "../pages/user/PurchaseHistoryPage";
import CommunityPage from "../pages/user/CommunityPage";
import MessengerPage from "../pages/user/MessengerPage";
import ErrorPage from "../pages/user/ErrorPage";
import SearchPage from "../pages/user/SearchPage";

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"user"} route={"/signin"} />}>
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/course/view/:courseId" element={<CourseWatchPage />} />
        <Route
          path="/course-payment/:courseId"
          element={<OrderSummaryPage />}
        />
        <Route path="/order-success" element={<OrderSucessPage />} />
        <Route path="/my-courses" element={<MyCoursePage />} />
        <Route path="/purchase-history" element={<PurchaseHistoryPage />} />
        <Route path="/messages" element={<MessengerPage />} />
      </Route>

      <Route element={<UnAuthenticatedOnlyRoutes role={"user"} route={"/"} />}>
        <Route path="/signin" element={<UserLoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />
        <Route path="/otp" element={<UserOtp />} />
      </Route>

      <Route path="/" element={<UserHomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/course" element={<UserCoursePage />} />
      <Route path="/course-details/:courseId" element={<CourseDetailsPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default UserRouter;
