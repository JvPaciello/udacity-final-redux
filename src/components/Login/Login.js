import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthedUser } from "../../actions/authedUser";
import UserSelect from "../UserSelect";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [selectedUser, setSelectedUser] = useState("");
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (selectedUser) {
      dispatch(setAuthedUser(selectedUser));

      const lastVisitedPath = localStorage.getItem("lastVisitedPath") || "/dashboard";
      navigate(lastVisitedPath);

      localStorage.removeItem("lastVisitedPath");
    } else {
      alert("Please, select a user.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p>Select a user to continue:</p>
      <UserSelect users={users} onSelect={setSelectedUser} />
      <button onClick={handleLogin}>Enter</button>
    </div>
  );
}

export default Login;
