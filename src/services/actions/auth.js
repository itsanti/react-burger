import { requestPayload, fetchWithRefresh } from '../../utils/http';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const SET_USER = 'SET_USER';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setAuthChecked = (auth) => {
  return {
    type: SET_AUTH_CHECKED,
    payload: auth,
  };
};

export const authLogin = (values) => {
  return (dispatch) => requestPayload('/auth/login', { body: values });
};

export const authLogout = () => {
  return (dispatch) => {
    const token = localStorage.getItem('refreshToken');
    requestPayload('/auth/logout', { body: { token } }).then((res) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(setUser(null));
    });
  };
};

export const authRegister = (values) => {
  return (dispatch) => requestPayload('/auth/register', { body: values });
};

export const forgotPassword = (email) => {
  return (dispatch) => requestPayload('/password-reset', { body: { email } });
};

export const resetPassword = (values) => {
  return (dispatch) => requestPayload('/password-reset/reset', { body: values });
};

export const refreshToken = () => {
  const token = localStorage.getItem('refreshToken');
  return requestPayload('/auth/token', { body: { token } });
};

export const getUser = () => {
  const accessToken = localStorage.getItem('accessToken');
  const headers = { Authorization: accessToken };
  return (dispatch) => fetchWithRefresh('/auth/user', { headers, method: 'GET' });
};

export const editUser = (values) => {
  const accessToken = localStorage.getItem('accessToken');
  const headers = { Authorization: accessToken };
  return (dispatch) => fetchWithRefresh('/auth/user', { headers, method: 'PATCH', body: values });
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
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
