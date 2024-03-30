import { IngredientProps } from '../../utils/types/prop-types';

export const SET_ACTIVE_INGREDIENT: 'SET_ACTIVE_INGREDIENT' = 'SET_ACTIVE_INGREDIENT';

export interface ISetActiveIngredient {
  readonly type: typeof SET_ACTIVE_INGREDIENT;
  readonly payload: IngredientProps | null;
}

export const setIngredient = (ingredient: IngredientProps | null): ISetActiveIngredient => {
  return {
    type: SET_ACTIVE_INGREDIENT,
    payload: ingredient,
  };
};

export type TCurrentIngredientActions = ISetActiveIngredient;
