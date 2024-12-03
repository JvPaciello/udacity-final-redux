import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../../actions/questions";
import "./AddPoll.css";

function AddPoll() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.authedUser); 

  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (optionOne.trim() === "" || optionTwo.trim() === "") {
      alert("Both options are required!");
      return;
    }

 
    dispatch(
      handleAddQuestion({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authedUser, 
      })
    );


    navigate("/dashboard");
  };

  return (
    <div className="add-poll">
      <h1 className="add-poll-title">Would You Rather</h1>
      <form className="add-poll-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="optionOne">Option One</label>
          <input
            type="text"
            id="optionOne"
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            placeholder="Enter the first option"
          />
        </div>
        <div className="form-group">
          <label htmlFor="optionTwo">Option Two</label>
          <input
            type="text"
            id="optionTwo"
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            placeholder="Enter the second option"
          />
        </div>
        <button type="submit" className="add-poll-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPoll;
