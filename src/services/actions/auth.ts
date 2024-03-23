import { requestPayload, fetchWithRefresh } from '../../utils/http';
import { CommonResponse } from '../../utils/http';
import { NonNullableUser } from '../reducers/auth';
import { AppThunkAction } from '../../utils/types';

export const SET_AUTH_CHECKED: 'SET_AUTH_CHECKED' = 'SET_AUTH_CHECKED';
export const SET_USER: 'SET_USER' = 'SET_USER';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
}

export interface ISetUser {
  readonly type: typeof SET_USER;
  readonly payload: NonNullableUser | null;
}

export interface IGetUserAction {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: NonNullableUser;
}

export const setUser = (user: NonNullableUser | null): ISetUser => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setAuthChecked = (auth: boolean): ISetAuthCheckedAction => {
  return {
    type: SET_AUTH_CHECKED,
    payload: auth,
  };
};

export type LoginPayload = { email: string; name?: string; password?: string };

type LoginResponse = {
  user: {
    email: string;
    name: string;
  };
} & RefreshResponse;

export const authLogin = (values: LoginPayload): AppThunkAction => {
  return (dispatch) => requestPayload<LoginResponse, LoginPayload>('/auth/login', { body: values });
};

type LogoutResponse = {
  message: string;
};

export const authLogout = (): AppThunkAction => {
  return (dispatch) => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      requestPayload<LogoutResponse, { token: string }>('/auth/logout', { body: { token } }).then(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setUser(null));
      });
    }
  };
};

type RegisterResponse = LoginResponse;
export type RegisterPayload = LoginPayload;

export const authRegister = (values: RegisterPayload): AppThunkAction => {
  return (dispatch) => requestPayload<RegisterResponse, LoginPayload>('/auth/register', { body: values });
};

export const forgotPassword = (email: string): AppThunkAction => {
  return (dispatch) => requestPayload<CommonResponse, { email: string }>('/password-reset', { body: { email } });
};

export type ResetPayload = { token: string; password: string };

export const resetPassword = (values: ResetPayload): AppThunkAction => {
  return (dispatch) => requestPayload<CommonResponse, ResetPayload>('/password-reset/reset', { body: values });
};

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export const refreshToken = () => {
  const token = localStorage.getItem('refreshToken');
  if (token) {
    return requestPayload<RefreshResponse, { token: string }>('/auth/token', { body: { token } });
  }
};

type UserResponse = {
  user: { email: string; name: string; password?: string };
};

export const getUser = () => {
  const accessToken = localStorage.getItem('accessToken');
  let headers = {};
  if (accessToken) {
    headers = { authorization: accessToken };
  }
  return fetchWithRefresh<UserResponse>('/auth/user', { headers, method: 'GET' });
};

export type EditPayload = Partial<LoginPayload>;

export const editUser = (values: EditPayload): AppThunkAction => {
  const accessToken = localStorage.getItem('accessToken');
  let headers = {};
  if (accessToken) {
    headers = { Authorization: accessToken };
  }
  return (dispatch) =>
    fetchWithRefresh<UserResponse>('/auth/user', { headers, method: 'PATCH', body: values })
      .then((res) => {
        const patch = { ...res.user };
        if (values.password) {
          patch.password = values.password;
        }
        dispatch(setUser(patch as NonNullableUser));
      })
      .catch((err) => {
        console.log(err.message);
      });
};

export const checkUserAuth = (): AppThunkAction => {
  return (dispatch) => {
    if (localStorage.getItem('accessToken')) {
      getUser()
        .then((res) => {
          dispatch(setUser({ ...res.user, password: '' }));
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export type TAuthActions =
  | IGetUserAction
  | IGetUserFailedAction
  | IGetUserSuccessAction
  | ISetAuthCheckedAction
  | ISetUser;
