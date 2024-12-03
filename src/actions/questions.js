import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    payload: questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    payload: question,
  };
}

export function saveQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    payload: { authedUser, qid, answer },
  };
}

// Thunk para buscar perguntas
export function fetchQuestions() {
  return (dispatch) => {
    return _getQuestions().then((questions) => {
      dispatch(receiveQuestions(questions));
    });
  };
}

// Thunk para salvar uma nova pergunta
export function handleAddQuestion(question) {
  return async (dispatch) => {
    const newQuestion = await _saveQuestion(question);
    dispatch(addQuestion(newQuestion));
  };
}

// Thunk para salvar a resposta de uma pergunta
export function handleSaveQuestionAnswer(info) {
  return async (dispatch) => {
    await _saveQuestionAnswer(info);
    dispatch(saveQuestionAnswer(info));
  };
}
