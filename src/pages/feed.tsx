import React, { FC, useEffect } from 'react';
import styles from './feed.module.css';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../utils/config';
import { useDispatch, useSelector } from '../hooks';
import { selectFeedStatus, selectFeedOrders } from '../services/selectors/feed';
import { feedConnect, FEED_CLOSE } from '../services/actions/feed';

const FeedPage: FC = () => {
  const status = useSelector(selectFeedStatus);
  const orders = useSelector(selectFeedOrders);
  const dispatch = useDispatch();

  const location = useLocation();
  const orderNumber1 = 42;
  const orderNumber2 = 13;

  useEffect(() => {
    dispatch(feedConnect('wss://norma.nomoreparties.space/orders/all'));
    return () => {
      dispatch({ type: FEED_CLOSE });
    };
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Лента заказов: {status}</h2>
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
