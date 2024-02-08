import React, { useEffect, useState } from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { request } from '../../utils/http';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

function App() {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());

    request('/ingredients')
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
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
