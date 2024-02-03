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
        if (res.success) {
          setData(res.data);
          setLoading(false);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  return (
    <>
      <AppHeader />
      <section className="container">
        {!isError && !isLoading ? (
          <IngredientsContext.Provider value={data}>
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor />
          </IngredientsContext.Provider>
        ) : (
          <p>{isError ? 'Произошла ошибка загрузки данных' : 'Загрузка данных'}</p>
        )}
      </section>
    </>
  );
}

export default App;
