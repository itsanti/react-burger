import React, { FC, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { useDispatch, useSelector } from '../../hooks';
import { getIngredients } from '../../services/actions/ingredients';
import { selectIngredientsLoading, selectIngredientsError } from '../../services/selectors/ingredients';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { setIngredient } from '../../services/actions/current-ingredient';
import { FeedPage, ForgotPassword, Home, Login, NoMatch, Profile, Register, ResetPassword } from '../../pages';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/actions/auth';
import OrdersHistory from '../orders-history/orders-history';
import UserEdit from '../user-edit/user-edit';
import { ROUTES } from '../../utils/config';
import OrderInfo from '../order-info/order-info';

const App: FC = () => {
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
      <main className={styles.container}>
        {!isError && !isLoading ? (
          <>
            <Routes location={state?.backgroundLocation || location}>
              <Route index element={<Home />} />
              <Route path={ROUTES.ingredientsById} element={<IngredientDetails />} />
              <Route path={ROUTES.login} element={<OnlyUnAuth component={<Login />} />} />
              <Route path={ROUTES.register} element={<OnlyUnAuth component={<Register />} />} />
              <Route path={ROUTES.forgotPassword} element={<OnlyUnAuth component={<ForgotPassword />} />} />
              <Route path={ROUTES.resetPassword} element={<OnlyUnAuth component={<ResetPassword />} />} />
              <Route path={ROUTES.feed} element={<FeedPage />} />
              <Route path={ROUTES.feedByNumber} element={<OrderInfo />} />
              <Route path={ROUTES.profile.root} element={<OnlyAuth component={<Profile />} />}>
                <Route index element={<UserEdit />} />
                <Route path={ROUTES.profile.orders} element={<OrdersHistory />} />
                <Route path={ROUTES.profile.orderByNumber} element={<OrderInfo />} />
              </Route>
              <Route path={ROUTES.noMatch} element={<NoMatch />} />
            </Routes>
            {state?.backgroundLocation && (
              <Routes>
                <Route
                  path={ROUTES.ingredientsById}
                  element={
                    <Modal title="Детали ингредиента" setIsModalOpened={onModalClosed}>
                      <IngredientDetails />
                    </Modal>
                  }
                />
                <Route
                  path={ROUTES.feedByNumber}
                  element={
                    <Modal setIsModalOpened={onModalClosed}>
                      <OrderInfo />
                    </Modal>
                  }
                />
                <Route
                  path={ROUTES.profile.orderByNumber}
                  element={<OnlyAuth component={
                    <Modal setIsModalOpened={onModalClosed}>
                      <OrderInfo />
                    </Modal>
                  } />}
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
