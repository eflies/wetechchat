import { Routes, Route, Link, Navigate } from "react-router-dom";
import React from "react";
import LoginPage from "../components/LoginPage";
import ProfileForm from "../components/ProfileForm";

const ProtectedRoute = ({
  user,
  redirectPath = "/login",
  children,
  isAllowed,
}) => {
  console.log({ isAllowed, redirectPath });
  if (isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <ProfileForm />;
};
export default ProtectedRoute;
