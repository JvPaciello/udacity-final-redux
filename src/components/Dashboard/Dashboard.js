import React, { useState } from "react";
import { useSelector } from "react-redux";
import QuestionList from "../QuestionList";
import "./Dashboard.css";

function Dashboard() {
  const [showAnswered, setShowAnswered] = useState(false); 
  const questions = useSelector((state) => state.questions || {});
  const users = useSelector((state) => state.users || {});
  const authedUser = useSelector((state) => state.authedUser);


  const answeredQuestions = Object.keys(users[authedUser]?.answers || []);
  const unansweredQuestions = Object.keys(questions).filter(
    (qid) => !answeredQuestions.includes(qid)
  );


  const sortedQuestions = (ids) =>
    ids
      .filter((id) => questions[id]) 
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
      .map((id) => ({
        id,
        author: questions[id].author,
        text: questions[id].optionOne.text,
      }));

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${!showAnswered ? "active" : ""}`}
          onClick={() => setShowAnswered(false)}
        >
          Unanswered
        </button>
        <button
          className={`toggle-btn ${showAnswered ? "active" : ""}`}
          onClick={() => setShowAnswered(true)}
        >
          Answered
        </button>
      </div>
      <QuestionList
        questions={
          showAnswered
            ? sortedQuestions(answeredQuestions)
            : sortedQuestions(unansweredQuestions)
        }
        users={users} 
      />
    </div>
  );
}

export default Dashboard;
