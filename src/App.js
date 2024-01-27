import React, { useEffect, useState } from 'react';
import './App.css';
import { API_URL } from './utils/config';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { ModalOverlay } from './components/modal-overlay/modal-overlay';

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
      <ModalOverlay>
        <p>Modal content</p>
      </ModalOverlay>
    </>
  );
}

export default App;
