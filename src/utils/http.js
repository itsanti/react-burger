import { API_URL } from './config';

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

const refreshToken = async () => {};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options); //делаем запрос
    return await checkResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken); //(или в cookies)
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //вызываем перезапрос данных
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
