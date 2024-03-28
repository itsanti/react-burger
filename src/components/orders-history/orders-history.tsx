import React, { FC } from 'react';
import styles from './orders-history.module.css';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/config';

const OrdersHistory: FC = () => {
  const location = useLocation();
  const orderNumber1 = 42;
  const orderNumber2 = 13;
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>История заказов</h2>
      <p>компонент списка заказов<br />
        <Link
          to={`${ROUTES.profile.orders}/${orderNumber1}`}
          state={{ backgroundLocation: location }}
        >Order Info Modal 1</Link><br />
        <Link
          to={`${ROUTES.profile.orders}/${orderNumber2}`}
          state={{ backgroundLocation: location }}
        >Order Info Modal 2</Link>
      </p>
    </div>
  );
};

export default OrdersHistory;
