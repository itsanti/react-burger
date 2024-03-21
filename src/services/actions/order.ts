import { fetchWithRefresh } from '../../utils/http';
import { AppThunkAction, AppDispatch } from '../../utils/types';
import { IOrder } from '../../utils/types/prop-types';

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';

export const SET_ORDER_DETAILS: 'SET_ORDER' = 'SET_ORDER';

export interface IPostOrderAction {
  readonly type: typeof POST_ORDER_REQUEST;
}
export interface IPostOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
}
export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly payload: OrderResponse | null;
}
export interface ISetOrderAction {
  readonly type: typeof SET_ORDER_DETAILS;
  readonly payload: OrderResponse | null;
}

export const setOrderDetails = (order: OrderResponse | null): ISetOrderAction => {
  return {
    type: SET_ORDER_DETAILS,
    payload: order,
  };
};

type OrderPayload = {
  ingredients: string[];
};

export type OrderResponse = {
  name: string;
  order: IOrder;
};

export function getOrderDetails(ingredients: string[]): AppThunkAction {
  const accessToken = localStorage.getItem('accessToken');
  let headers = {};
  if (accessToken) {
    headers = { Authorization: accessToken };
  }

  return function (dispatch: AppDispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    fetchWithRefresh<OrderResponse, OrderPayload>('/orders', { headers, body: { ingredients } })
      .then((res) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({
          type: POST_ORDER_FAILED,
        });
      });
  };
}

export type TOrderActions = IPostOrderAction | IPostOrderSuccessAction | IPostOrderFailedAction | ISetOrderAction;
