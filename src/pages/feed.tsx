import React, { FC } from 'react';
import styles from './feed.module.css';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../utils/config';

const FeedPage: FC = () => {
  const location = useLocation();
  const orderNumber1 = 42;
  const orderNumber2 = 13;
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Лента заказов</h2>
      <p>
        компонент списка заказов<br />
        <Link
          to={`${ROUTES.feed}/${orderNumber1}`}
          state={{ backgroundLocation: location }}
        >Order Info Modal</Link><br />
        <Link
          to={`${ROUTES.feed}/${orderNumber2}`}
          state={{ backgroundLocation: location }}
        >Order Info Modal</Link>
      </p>
    </div>
  );
}

export default FeedPage;
