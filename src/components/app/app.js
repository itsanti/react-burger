import React, { useEffect } from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { selectIngredientsLoading, selectIngredientsError } from '../../services/selectors/ingredients';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { selectCurrentIngredient } from '../../services/selectors/current-ingredient';
import { setIngredient } from '../../services/actions/current-ingredient';
import { Home, NoMatch } from '../../pages';

function App() {
  const isLoading = useSelector(selectIngredientsLoading);
  const isError = useSelector(selectIngredientsError);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const currentIngredient = useSelector(selectCurrentIngredient);
  console.log(currentIngredient);

  const state = location.state;

  const onModalClosed = () => {
    dispatch(setIngredient(null));
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className="container">
        {!isError && !isLoading ? (
          <>
            <Routes location={state?.backgroundLocation || location}>
              <Route path="/" element={<Home />} />
              <Route path="/ingredients/:id" element={<IngredientDetails />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
            {state?.backgroundLocation && (
              <Routes>
                <Route
                  path="/ingredients/:id"
                  element={
                    <Modal title="Детали ингредиента" setIsModalOpened={onModalClosed}>
                      <IngredientDetails />
                    </Modal>
                  }
                />
              </Routes>
            )}
          </>
        ) : (
          <p>{isError ? 'Произошла ошибка загрузки данных' : 'Загрузка данных'}</p>
        )}
      </main>
    </>
  );
}

export default App;
