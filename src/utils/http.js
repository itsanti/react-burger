import { API_URL } from './config';

export const request = (path) => {
  return fetch(`${API_URL}/ingredients`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('HTTP Error');
  });
};
