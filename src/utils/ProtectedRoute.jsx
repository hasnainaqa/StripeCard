import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./aouth";

const ProtectedLayout = () => {
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />; 
};

export default ProtectedLayout;
