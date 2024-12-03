import React from "react";
import { useSelector } from "react-redux";
import "./Leaderboard.css";

function Leaderboard() {
  const users = useSelector((state) => state.users);

  // Calculate scores for each user
  const leaderboardData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatar: user.avatarURL,
      questionsAsked: user.questions.length,
      questionsAnswered: Object.keys(user.answers).length,
      totalScore: user.questions.length + Object.keys(user.answers).length,
    }))
    .sort((a, b) => b.totalScore - a.totalScore); // Sort by total score descending

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Answered</th>
            <th>Created</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => (
            <tr key={user.id}>
              <td>
                <img
                  src={user.avatar}
                  alt={`Avatar of ${user.name}`}
                  className="avatar"
                />
              </td>
              <td>{user.name}</td>
              <td>{user.questionsAnswered}</td>
              <td>{user.questionsAsked}</td>
              <td>{user.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
