import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "./components/Dashboard/Dashboard";
import AddPoll from "./components/AddPoll/AddPoll";
import PollDetails from "./components/PollDetails/PollDetails";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Login from "./components/Login/Login";
import NotFound from "./components/404";
import PrivateRoute from "./components/PrivateRoute";
import { fetchUsers } from "./actions/users";
import { fetchQuestions } from "./actions/questions";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/add" element={<PrivateRoute element={<AddPoll />} />} />
        <Route path="/leaderboard" element={<PrivateRoute element={<Leaderboard />} />} />
        <Route path="/questions/:question_id" element={<PrivateRoute element={<PollDetails />} />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
