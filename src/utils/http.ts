import { API_URL } from './config';
import { refreshToken } from '../services/actions/auth';

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

const checkSuccess = <T>(res: TServerResponse<T>) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(res);
};

export type RequestOptions<R = { [key: string]: string }> = {
  headers?: { [key: string]: string };
  body?: BodyInit | R;
  method?: string;
};

type TServerResponse<T> = {
  success: boolean;
} & T;

export type CommonResponse = TServerResponse<{ message: string }>;

export const request = async <T>(path: string, options: RequestInit | undefined): Promise<TServerResponse<T>> => {
  return fetch(`${API_URL}${path}`, options).then(checkResponse).then(checkSuccess);
};

export const requestPayload = <T, R = RequestOptions>(path: string, options: RequestOptions<R>) => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
  defaultOptions.headers = { ...defaultOptions.headers, ...options.headers };
  defaultOptions.method = options.method || 'POST';
  return request<T>(path, { ...defaultOptions, body: JSON.stringify(options.body) });
};

export const fetchWithRefresh = async <T, R = { [key: string]: string }>(url: string, options: RequestOptions<R>) => {
  try {
    if (options.method === 'GET') {
      return await request<T>(url, options as RequestInit);
    }
    return await requestPayload<T, R>(url, options);
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    if (message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (refreshData) {
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        localStorage.setItem('accessToken', refreshData.accessToken);
        options.headers && (options.headers['Authorization'] = refreshData.accessToken);
      }
      if (options.method === 'GET') {
        return await request<T>(url, options as RequestInit);
      }
      return await requestPayload<T, R>(url, options);
    } else {
      return Promise.reject(err);
    }
  }
};
