import { SET_USER, SET_AUTH_CHECKED, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED } from '../actions/auth';
import { TAuthActions } from '../actions/auth';

export type NonNullableUser = { email: string; name: string; password: string };

export type UserState<T = NonNullableUser | null> = {
  isAuthChecked: boolean;
  user: T;
};

const initialState: UserState = {
  isAuthChecked: false,
  user: null,
};

export const reducerAuth = (state = initialState, action: TAuthActions): UserState => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, user: action.payload };
    }
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
