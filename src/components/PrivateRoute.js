import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ element }) {
  const authedUser = useSelector((state) => state.authedUser);
  const location = useLocation();

  if (!authedUser) {
    localStorage.setItem("lastVisitedPath", location.pathname);
    return <Navigate to="/" />;
  }

  return element;
}

export default PrivateRoute;
