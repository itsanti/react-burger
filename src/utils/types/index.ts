import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TCurrentIngredientActions } from '../../services/actions/current-ingredient';
import { TOrderActions } from '../../services/actions/order';
import { TIngredientsActions } from '../../services/actions/ingredients';
import { TBurgerConstructorActions } from '../../services/actions/burger-constructor';
import { TAuthActions } from '../../services/actions/auth';
import { TFeedActions } from '../../services/actions/feed';
import { rootReducer } from '../../services/reducers/root';

type TApplicationActions =
  | TAuthActions
  | TIngredientsActions
  | TCurrentIngredientActions
  | TOrderActions
  | TBurgerConstructorActions
  | TFeedActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;
