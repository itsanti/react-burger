import { ROUTES } from '../../utils/config';
import { request } from '../../utils/http';
import { AppThunkAction } from '../../utils/types';
import { IngredientProps } from '../../utils/types/prop-types';
import { TServerResponse } from '../../utils/http';

export const GET_INGREDIENTS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IGetIngredientsrSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: IngredientProps[];
}

type IngredientsResponse = TServerResponse<{
  data: IngredientProps[];
}>;

export function getIngredients(): AppThunkAction {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    request<IngredientsResponse>(ROUTES.ingredients, {})
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}

export type TIngredientsActions = IGetIngredientsAction | IGetIngredientsFailedAction | IGetIngredientsrSuccessAction;
