export const SET_AUTHED_USER = "SET_AUTHED_USER";

export function setAuthedUser(id) {

  if(id){
    localStorage.setItem('authedUser', id);
  }else{
    localStorage.removeItem('authedUser');
  }

  return {
    type: SET_AUTHED_USER,
    payload: id,
  };
}
