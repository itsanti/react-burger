import { API_URL } from './config';

export const request = (path) => {
  return fetch(`${API_URL}${path}`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('HTTP Error');
  });
};

export const requestPost = (path, body) => {
  return fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('HTTP Error');
  });
};
