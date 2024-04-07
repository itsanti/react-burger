import {
  TAuthActions,
  SET_USER,
  SET_AUTH_CHECKED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from '../actions/auth';
import { reducerAuth, initialState } from './auth';

const user = { email: 't@t.com', name: 'test', password: 'test' };

describe('reducerAuth reducer', () => {
  it('should return the initial state', () => {
    expect(reducerAuth(undefined, {} as TAuthActions)).toEqual(initialState);
  });

  it('should handle SET_USER', () => {
    const received = reducerAuth(initialState, {
      type: SET_USER,
      payload: user,
    });
    const expected = {
      ...initialState,
      user,
    };
    expect(received).toEqual(expected);
  });

  it('should handle SET_AUTH_CHECKED', () => {
    const received = reducerAuth(initialState, {
      type: SET_AUTH_CHECKED,
      payload: true,
    });
    const expected = {
      ...initialState,
      isAuthChecked: true,
    };
    expect(received).toEqual(expected);
  });

  it('should handle GET_USER_REQUEST', () => {
    const received = reducerAuth(initialState, {
      type: GET_USER_REQUEST,
    });
    const expected = initialState;
    expect(received).toEqual(expected);
  });

  it('should handle GET_USER_SUCCESS', () => {
    const received = reducerAuth(initialState, {
      type: GET_USER_SUCCESS,
      payload: user,
    });
    const expected = { ...initialState, user };
    expect(received).toEqual(expected);
  });

  it('should handle GET_USER_FAILED', () => {
    const received = reducerAuth(initialState, {
      type: GET_USER_FAILED,
    });
    const expected = { ...initialState, user: null };
    expect(received).toEqual(expected);
  });
});
