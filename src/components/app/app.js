import React, { useEffect, useState } from 'react';
import './app.css';
import { API_URL } from '../../utils/config';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const [data, setData] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/ingredients`)
      .then((res) => {
        return res.json();
      })
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
          <>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </>
        ) : (
          <p>{isError ? 'Произошла ошибка загрузки данных' : 'Загрузка данных'}</p>
        )}
      </section>
    </>
  );
}

export default App;