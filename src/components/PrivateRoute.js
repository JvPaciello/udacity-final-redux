import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({element}){
    const authedUser = useSelector((state) => state.authedUser);
    return authedUser ? element : <Navigate to = "/"/>;
}

export default PrivateRoute;