import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { saveQuestionAnswer, fetchQuestions } from "../../actions/questions";
import "./PollDetails.css";

function PollDetails() {
  const { question_id } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.questions || {});
  const users = useSelector((state) => state.users || {});
  const authedUser = useSelector((state) => state.authedUser);

  const question = questions[question_id];

  useEffect(() => {
    if (!question) {
      dispatch(fetchQuestions()).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, question]);

  if (!authedUser) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px", color: "rgba(255,255,255,0.5)" }}>
        Loading...
      </div>
    );
  }

  if (!question) {
    return <Navigate to="/404" />;
  }

  const author = users[question.author];
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  const getOptionData = (option) => ({
    text: question[option].text,
    votes: question[option].votes.length,
    percentage:
      totalVotes > 0
        ? Math.round((question[option].votes.length / totalVotes) * 100)
        : 0,
    isSelected: question[option].votes.includes(authedUser),
  });

  const optionOneData = getOptionData("optionOne");
  const optionTwoData = getOptionData("optionTwo");
  const hasVoted = optionOneData.isSelected || optionTwoData.isSelected;

  const handleVote = (option) => {
    if (!hasVoted) {
      dispatch(saveQuestionAnswer({ authedUser, qid: question_id, answer: option }));
    }
  };

  return (
    <div className="poll-details">
      <h1>Would You Rather?</h1>
      <div className="author">
        <img
          src={author.avatarURL}
          alt={`Avatar of ${author.name}`}
          className="avatar"
        />
        <p>Asked by {author.name}</p>
      </div>
      <div className="options">
        {[optionOneData, optionTwoData].map((option, index) => (
          <div
            key={index}
            className={`option ${option.isSelected ? "selected" : ""}`}
            style={{ cursor: hasVoted ? "default" : "pointer" }}
            onClick={() => handleVote(index === 0 ? "optionOne" : "optionTwo")}
          >
            <p>{option.text}</p>
            {hasVoted && (
              <>
                <div className="vote-bar-bg">
                  <div className="vote-bar" style={{ width: `${option.percentage}%` }} />
                </div>
                <div className="vote-stats">
                  <span>{option.votes} {option.votes === 1 ? "vote" : "votes"}</span>
                  <span>{option.percentage}%</span>
                </div>
              </>
            )}
            {option.isSelected && <span className="vote-badge">Your Vote</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PollDetails;
