import React, { useEffect } from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { selectIngredientsLoading, selectIngredientsError } from '../../services/selectors/ingredients';

function App() {
  const isLoading = useSelector(selectIngredientsLoading);
  const isError = useSelector(selectIngredientsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className="container">
        {!isError && !isLoading ? (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        ) : (
          <p>{isError ? 'Произошла ошибка загрузки данных' : 'Загрузка данных'}</p>
        )}
      </main>
    </>
  );
}

export default App;
