import { SET_AUTHED_USER } from '../actions/authedUser';

const authedUser = (state = null, action) => {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.payload;

    default:
      return state;
  }
};

export default authedUser;
