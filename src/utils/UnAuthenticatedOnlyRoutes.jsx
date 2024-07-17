import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { userAuth } from "../Services/userApi";
import { adminAuth } from "../Services/adminApi";
import { tutorAuth } from "../Services/tutorApi";
import { adminAuthorized, adminUnauthorized } from "../Redux/app/adminSlice";
import { userAuthorized, userUnauthorized } from "../Redux/app/userSlice";
import { tutorAuthorized, tutorUnauthorized } from "../Redux/app/tutorSlice";

function UnAuthenticatedOnlyRoutes({ role, route }) { 
  const dispatch = useDispatch();
  let [auth, setAuth] = useState(null);

  useEffect(() => {
    if (role === "user") {
      userAuth()
        .then((response) => {
          if (response.data.status) {
            dispatch(userAuthorized());
          } else {
            dispatch(userUnauthorized());
            localStorage.removeItem("token");
          }
          setAuth(response.data.status);
          if (response.data.message) {
            toast.error(response.data.message);
          }
        })
        .catch(() => {
          setAuth(false);
          localStorage.removeItem("token");
        });
    } else if (role === "admin") {
      adminAuth()
        .then((response) => {
          if (response.data.status) {
            dispatch(adminAuthorized());
          } else {
            dispatch(adminUnauthorized());
            localStorage.removeItem("adminToken");
          }
          setAuth(response.data.status);
          if (response.data.message) {
            toast.error(response.data.message);
          }
        })
        .catch(() => {
          setAuth(false);
          localStorage.removeItem("adminToken");
        });
    } else if (role === "tutor") {
      tutorAuth()
        .then(({data}) => {
          if (data.status) {
            dispatch(tutorAuthorized({name: data.tutorName}));
          } else {
            dispatch(tutorUnauthorized());
            localStorage.removeItem("tutorToken");
          }
          setAuth(data.status);
          if (data.message) {
            toast.error(data.message);
          }
        })
        .catch(() => {
          setAuth(false);
          localStorage.removeItem("tutorToken");
        });
    }
  }, []);

  if (auth == null) return;
  return auth ? <Navigate to={route}/>   : <Outlet/> ;
}

export default UnAuthenticatedOnlyRoutes;
