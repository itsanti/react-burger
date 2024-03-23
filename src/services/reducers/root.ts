import { combineReducers } from 'redux';
import { reducerIngredients } from './ingredients';
import { reducerBurgConstructor } from './burger-constructor';
import { reducerCurrentIngredient } from './current-ingredient';
import { reducerOrder } from './order';
import { reducerAuth } from './auth';

export const rootReducer = combineReducers({
  ingredients: reducerIngredients,
  burgConstructor: reducerBurgConstructor,
  currentIngredient: reducerCurrentIngredient,
  order: reducerOrder,
  user: reducerAuth,
});
