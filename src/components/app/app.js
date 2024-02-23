import React, { useEffect } from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { selectIngredientsLoading, selectIngredientsError } from '../../services/selectors/ingredients';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { setIngredient } from '../../services/actions/current-ingredient';
import { ForgotPassword, Home, Login, NoMatch, Profile, Register, ResetPassword } from '../../pages';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/actions/auth';
import OrdersHistory from '../orders-history/orders-history';
import UserEdit from '../user-edit/user-edit';

function App() {
  const isLoading = useSelector(selectIngredientsLoading);
  const isError = useSelector(selectIngredientsError);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  const onModalClosed = () => {
    dispatch(setIngredient(null));
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
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
              <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
              <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
              <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
              <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
              <Route path="/profile" element={<OnlyUnAuth component={<Profile />} />}>
                <Route index element={<UserEdit />} />
                <Route path="orders" element={<OrdersHistory />} />
              </Route>
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
