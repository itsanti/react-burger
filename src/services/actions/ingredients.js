import { request } from '../../utils/http';

export const GET_INGREDIENTS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_ITEMS_FAILED';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    request('/ingredients')
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}
