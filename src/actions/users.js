import { _getUsers } from '../_DATA';


export const RECEIVE_USERS = 'RECEIVE_USERS';


export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    payload: users,
  };
}

// Thunk para buscar usuários
export function fetchUsers() {
  return async (dispatch) => {
    const users = await _getUsers();
    dispatch(receiveUsers(users));
  };
}
