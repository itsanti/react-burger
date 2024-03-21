import { requestPayload, fetchWithRefresh } from '../../utils/http';
import { CommonResponse } from '../../utils/http';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const SET_USER = 'SET_USER';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const setUser = (user: any) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setAuthChecked = (auth: any) => {
  return {
    type: SET_AUTH_CHECKED,
    payload: auth,
  };
};

export type LoginPayload = { email: string; name?: string; password: string };

type LoginResponse = {
  user: {
    email: string;
    name: string;
  };
} & RefreshResponse;

export const authLogin = (values: LoginPayload) => {
  return (dispatch: any) => requestPayload<LoginResponse, LoginPayload>('/auth/login', { body: values });
};

type LogoutResponse = {
  message: string;
};

export const authLogout = () => {
  return (dispatch: any) => {
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

export const authRegister = (values: RegisterPayload) => {
  return (dispatch: any) => requestPayload<RegisterResponse, LoginPayload>('/auth/register', { body: values });
};

export const forgotPassword = (email: string) => {
  return (dispatch: any) => requestPayload<CommonResponse, { email: string }>('/password-reset', { body: { email } });
};

export type ResetPayload = { token: string; password: string };

export const resetPassword = (values: ResetPayload) => {
  return (dispatch: any) => requestPayload<CommonResponse, ResetPayload>('/password-reset/reset', { body: values });
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
  email: string;
  name: string;
};

export const getUser = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const headers = { authorization: accessToken };
    return (dispatch: any) => fetchWithRefresh<UserResponse>('/auth/user', { headers, method: 'GET' });
  }
};

export type EditPayload = Partial<LoginPayload>;

export const editUser = (values: EditPayload) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const headers = { Authorization: accessToken };
    return (dispatch: any) => fetchWithRefresh('/auth/user', { headers, method: 'PATCH', body: values });
  }
};

export const checkUserAuth = () => {
  return (dispatch: any) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
        .then((res: any) => {
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
