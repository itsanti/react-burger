import React, { useEffect, useState } from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { request } from '../../utils/http';
import { IngredientsContext } from '../../srvices/ingredients-context';

function App() {
  const [data, setData] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    request('/ingredients')
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }, []);

  return (
    <main>
      <AppHeader />
      <section className="container">
        {!isError && !isLoading ? (
          <IngredientsContext.Provider value={data}>
            <BurgerIngredients />
            <BurgerConstructor />
          </IngredientsContext.Provider>
        ) : (
          <p>{isError ? 'Произошла ошибка загрузки данных' : 'Загрузка данных'}</p>
        )}
      </section>
    </main>
  );
}

export default App;
