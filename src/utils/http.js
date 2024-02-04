import { API_URL } from './config';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Answer not success: ${res}`);
};

export const request = (path, options) => {
  return fetch(`${API_URL}${path}`, options).then(checkResponse).then(checkSuccess);
};

export const requestPost = (path, options) => {
  const defaultOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
  return request(path, { ...defaultOptions, ...options, body: JSON.stringify(options.body) });
};
