import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions';

const questions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.payload,
      };

    case ADD_QUESTION: {
      const { payload } = action;
      return {
        ...state,
        [payload.id]: payload,
      };
    }

    case SAVE_QUESTION_ANSWER: {
      const { authedUser, qid, answer } = action.payload;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      };
    }

    default:
      return state;
  }
};

export default questions;
