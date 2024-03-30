import React, { FC, useEffect } from 'react';
import styles from './feed.module.css';
import { useDispatch, useSelector } from '../hooks';
import { selectFeedOrders, selectFeedStatus } from '../services/selectors/feed';
import { feedConnect, FEED_CLOSE } from '../services/actions/feed';
import OrderList from '../components/order-list/order-list';
import OrderStat from '../components/order-stat/order-stat';
import { ROUTES, WSS_FEED_URL } from '../utils/config';

const FeedPage: FC = () => {
  const status = useSelector(selectFeedStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedConnect(WSS_FEED_URL));
    return () => {
      dispatch({ type: FEED_CLOSE });
    };
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Лента заказов <code><small>{status}</small></code></h2>
      <section className={styles.panels}>
        <div className={styles.left}>
          <OrderList selectFeedOrders={selectFeedOrders} modalRoute={ROUTES.feed} />
        </div>
        <div className={styles.right}>
          <OrderStat />
        </div>
      </section>
    </div>
  );
}

export default FeedPage;
