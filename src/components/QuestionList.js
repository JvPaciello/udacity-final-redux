import React from 'react';
import { useNavigate } from 'react-router-dom';

function QuestionList({ questions, title, users }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {questions.map((question) => {
          const author = users[question.author];
          return (
            <li key={question.id} onClick={() => navigate(`/questions/${question.id}`)}>
              <img
                src={author.avatarURL}
                alt={`Avatar of ${author.name}`}
              />
              <div>
                <p>{question.text}</p>
                <small>Posted by {author.name}</small>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuestionList;
