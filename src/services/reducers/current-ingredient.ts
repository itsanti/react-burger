import { SET_ACTIVE_INGREDIENT } from '../actions/current-ingredient';
import { IngredientProps } from '../../utils/types/prop-types';
import { TCurrentIngredientActions } from '../actions/current-ingredient';

export type CurrentIngredient = IngredientProps | null;
const initialState: CurrentIngredient = null;

export const reducerCurrentIngredient = (
  state = initialState,
  action: TCurrentIngredientActions,
): CurrentIngredient => {
  switch (action.type) {
    case SET_ACTIVE_INGREDIENT:
      return action.payload;
    default:
      return state;
  }
};
