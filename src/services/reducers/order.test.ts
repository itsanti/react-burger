import {
  TOrderActions,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  SET_ORDER_DETAILS,
  SET_ORDER_DETAILS_PAGE,
  OrderResponse,
} from '../actions/order';
import { IOrder, OrderStatus, OrdersList } from '../../utils/types/prop-types';
import { reducerOrder, initialState } from './order';

const ORDER: IOrder = {
  _id: 'sds',
  createdAt: '',
  ingredients: [],
  name: 'sds',
  number: 222,
  owner: {
    createdAt: '',
    email: '',
    name: '',
    updatedAt: '',
  },
  price: 23,
  status: OrderStatus.done,
  updatedAt: '',
};

describe('reducerOrder reducer', () => {
  it('should return the initial state', () => {
    expect(reducerOrder(undefined, {} as TOrderActions)).toEqual(initialState);
  });

  it('should handle POST_ORDER_REQUEST', () => {
    const received = reducerOrder(initialState, {
      type: POST_ORDER_REQUEST,
    });
    const expected = {
      ...initialState,
      isLoading: true,
    };
    expect(received).toEqual(expected);
  });

  it('should handle POST_ORDER_SUCCESS', () => {
    const orderResponce: OrderResponse = {
      name: 'order',
      order: ORDER,
    };
    const received = reducerOrder(initialState, {
      type: POST_ORDER_SUCCESS,
      payload: orderResponce,
    });
    const expected = {
      ...initialState,
      isError: false,
      isLoading: false,
      orderDetails: orderResponce,
    };
    expect(received).toEqual(expected);
  });

  it('should handle POST_ORDER_FAILED', () => {
    const received = reducerOrder(initialState, {
      type: POST_ORDER_FAILED,
    });
    const expected = { ...initialState, isError: true };
    expect(received).toEqual(expected);
  });

  it('should handle SET_ORDER_DETAILS', () => {
    const order: OrderResponse = {
      name: '',
      order: ORDER,
    };
    const received = reducerOrder(initialState, {
      type: SET_ORDER_DETAILS,
      payload: order,
    });
    const expected = { ...initialState, orderDetails: order };
    expect(received).toEqual(expected);
  });

  it('should handle SET_ORDER_DETAILS_PAGE', () => {
    const orderList: OrdersList = {
      ingredients: [],
      _id: '',
      status: OrderStatus.done,
      number: 12,
      name: '',
      createdAt: '',
      updatedAt: '',
    };
    const received = reducerOrder(initialState, {
      type: SET_ORDER_DETAILS_PAGE,
      payload: orderList,
    });
    const expected = { ...initialState, orderDetailsPage: orderList };
    expect(received).toEqual(expected);
  });
});
