import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { saveQuestionAnswer, fetchQuestions } from "../../actions/questions";
import "./PollDetails.css";

function PollDetails() {
  const { question_id } = useParams();
  const [loading, setLoading] = useState(true); // Add loading state
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

  // Show loading state while fetching
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to 404 if the question does not exist after loading
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
      dispatch(
        saveQuestionAnswer({
          authedUser,
          qid: question_id,
          answer: option,
        })
      );
    }
  };

  return (
    <div className="poll-details">
      <h1>Would You Rather</h1>
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
            style={{ cursor: hasVoted ? "not-allowed" : "pointer" }}
            onClick={() => handleVote(index === 0 ? "optionOne" : "optionTwo")}
          >
            <p>{option.text}</p>
            {hasVoted && (
              <div>
                <p>{option.votes} Votes</p>
                <p>{option.percentage}%</p>
              </div>
            )}
            {option.isSelected && <strong>Your Vote</strong>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PollDetails;
