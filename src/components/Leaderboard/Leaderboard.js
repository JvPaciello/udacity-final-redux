import React from "react";
import { useSelector } from "react-redux";
import "./Leaderboard.css";

function Leaderboard() {
  const users = useSelector((state) => state.users);

  const leaderboardData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatar: user.avatarURL,
      questionsAsked: user.questions.length,
      questionsAnswered: Object.keys(user.answers).length,
      totalScore: user.questions.length + Object.keys(user.answers).length,
    }))
    .sort((a, b) => b.totalScore - a.totalScore);

  if (leaderboardData.length === 0) {
    return (
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Answered</th>
            <th>Created</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={user.id}>
              <td data-label="#">
                <span className={`rank-badge rank-${index + 1}`}>
                  {index + 1}
                </span>
              </td>
              <td data-label="">
                <img
                  src={user.avatar}
                  alt={`Avatar of ${user.name}`}
                  className="avatar"
                />
              </td>
              <td data-label="Name">{user.name}</td>
              <td data-label="Answered">{user.questionsAnswered}</td>
              <td data-label="Created">{user.questionsAsked}</td>
              <td data-label="Score" className="score-cell">{user.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
