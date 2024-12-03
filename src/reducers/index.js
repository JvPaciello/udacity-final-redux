  import { combineReducers } from '@reduxjs/toolkit';
  import users from './users';
  import questions from './questions';
  import authedUser from './authedUser';

  export default combineReducers({
    users: users,
    questions: questions,
    authedUser: authedUser,
  });
