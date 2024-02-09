import { UUID4 } from '../../utils/utils';

export const DROP_INGREDIENT = 'DROP_INGREDIENT';

export const dropIngredient = (ingredient) => {
  return {
    type: DROP_INGREDIENT,
    payload: { ...ingredient, uuid: UUID4() },
  };
};
