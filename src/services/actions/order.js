import { fetchWithRefresh } from '../../utils/http';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const SET_ORDER_DETAILS = 'SET_ORDER';

export const setOrderDetails = (order) => {
  return {
    type: SET_ORDER_DETAILS,
    payload: order,
  };
};

export function getOrderDetails(orderPayload) {
  const accessToken = localStorage.getItem('accessToken');
  orderPayload.headers = { Authorization: accessToken };

  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    fetchWithRefresh('/orders', orderPayload)
      .then((res) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_ORDER_FAILED,
        });
      });
  };
}
