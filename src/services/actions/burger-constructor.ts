import { UUID4 } from '../../utils/utils';
import { IngredientProps } from '../../utils/types/prop-types';

export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';
export const DROP_INGREDIENT: 'DROP_INGREDIENT' = 'DROP_INGREDIENT';
export const DEL_INGREDIENT: 'DEL_INGREDIENT' = 'DEL_INGREDIENT';
export const DEL_BUN: 'DEL_BUN' = 'DEL_BUN';
export const SORT_INGREDIENTS: 'SORT_INGREDIENTS' = 'SORT_INGREDIENTS';

export interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}
export interface IDelBunAction {
  readonly type: typeof DEL_BUN;
}
export interface ISortIngredientsAction {
  readonly type: typeof SORT_INGREDIENTS;
  readonly payload: { dragIndex: number; hoverIndex: number };
}
export interface IDropIngredientAction {
  readonly type: typeof DROP_INGREDIENT;
  readonly payload: IngredientProps & { uuid: string };
}
export interface IDelIngredientAction {
  readonly type: typeof DEL_INGREDIENT;
  readonly payload: string | undefined;
}

export const clearConstructor = (): IClearConstructorAction => {
  return {
    type: CLEAR_CONSTRUCTOR,
  };
};

export const sortIngredients = (dragIndex: number, hoverIndex: number): ISortIngredientsAction => {
  return {
    type: SORT_INGREDIENTS,
    payload: { dragIndex, hoverIndex },
  };
};

export const dropIngredient = (ingredient: IngredientProps): IDropIngredientAction => {
  return {
    type: DROP_INGREDIENT,
    payload: { ...ingredient, uuid: UUID4() },
  };
};

export const delIngredientByUuid = (uuid?: string): IDelIngredientAction => {
  return {
    type: DEL_INGREDIENT,
    payload: uuid,
  };
};

export const delBun = (): IDelBunAction => {
  return {
    type: DEL_BUN,
  };
};

export type TBurgerConstructorActions =
  | IClearConstructorAction
  | IDelBunAction
  | ISortIngredientsAction
  | IDropIngredientAction
  | IDelIngredientAction;
