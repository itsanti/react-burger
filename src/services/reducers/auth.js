import { SET_AUTH_CHECKED, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED } from '../actions/auth';

const initialState = {
  isAuthChecked: false,
  user: null,
};

export const reducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKED: {
      return { ...state, isAuthChecked: true };
    }
    case GET_USER_REQUEST: {
      return state;
    }
    case GET_USER_SUCCESS: {
      return { ...state, user: action.payload };
    }
    case GET_USER_FAILED: {
      return { ...state, user: null };
    }
    default:
      return state;
  }
};
