import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  SET_ORDER_DETAILS,
  SET_ORDER_DETAILS_PAGE,
} from '../actions/order';
import { TOrderActions, OrderResponse } from '../actions/order';
import { OrdersList } from '../../utils/types/prop-types';

type OrderState = {
  orderDetails: OrderResponse | null;
  isError: Boolean;
  isLoading: Boolean;
  orderDetailsPage: OrdersList | null;
};

const initialState: OrderState = {
  orderDetails: null,
  isError: false,
  isLoading: false,
  orderDetailsPage: null,
};

export const reducerOrder = (state = initialState, action: TOrderActions): OrderState => {
  switch (action.type) {
    case SET_ORDER_DETAILS: {
      return { ...initialState, orderDetails: action.payload };
    }
    case SET_ORDER_DETAILS_PAGE: {
      return { ...initialState, orderDetailsPage: action.payload };
    }
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case POST_ORDER_SUCCESS: {
      return { ...state, isError: false, isLoading: false, orderDetails: action.payload };
    }
    case POST_ORDER_FAILED: {
      return { ...initialState, isError: true };
    }
    default:
      return state;
  }
};
