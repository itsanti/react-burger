import { UUID4 } from '../../utils/utils';

export const DROP_INGREDIENT = 'DROP_INGREDIENT';
export const DEL_INGREDIENT = 'DEL_INGREDIENT';
export const DEL_BUN = 'DEL_BUN';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export const sortIngredients = (dragIndex, hoverIndex) => {
  return {
    type: SORT_INGREDIENTS,
    payload: { dragIndex, hoverIndex },
  };
};

export const dropIngredient = (ingredient) => {
  return {
    type: DROP_INGREDIENT,
    payload: { ...ingredient, uuid: UUID4() },
  };
};

export const delIngredientByUuid = (uuid) => {
  return {
    type: DEL_INGREDIENT,
    payload: uuid,
  };
};

export const delBun = () => {
  return {
    type: DEL_BUN,
  };
};
