import { API_URL } from './config';
import { refreshToken } from '../services/actions/auth';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(res);
};

export const request = (path, options) => {
  return fetch(`${API_URL}${path}`, options).then(checkResponse).then(checkSuccess);
};

export const requestPayload = (path, options) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
  defaultOptions.headers = { ...defaultOptions.headers, ...options.headers };
  defaultOptions.method = options.method || 'POST';
  return request(path, { ...defaultOptions, body: JSON.stringify(options.body) });
};

export const fetchWithRefresh = async (url, options) => {
  try {
    if (options.method === 'GET') {
      return await request(url, options);
    }
    return await requestPayload(url, options);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      options.headers['Authorization'] = refreshData.accessToken;
      if (options.method === 'GET') {
        return await request(url, options);
      }
      return await requestPayload(url, options);
    } else {
      return Promise.reject(err);
    }
  }
};
