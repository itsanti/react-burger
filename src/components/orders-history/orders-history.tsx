import React, { FC, useEffect } from 'react';
import styles from './orders-history.module.css';
import { ROUTES, WSS_PROFILE_URL } from '../../utils/config';
import { useDispatch, useSelector } from '../../hooks';
import { selectProfileFeedStatus } from '../../services/selectors/profile-feed';
import OrderList from '../order-list/order-list';
import { PROFILE_FEED_CLOSE, profileFeedConnect } from '../../services/actions/profile-feed';
import { selectProfileFeedOrders } from '../../services/selectors/profile-feed';

const OrdersHistory: FC = () => {
  const status = useSelector(selectProfileFeedStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileFeedConnect(WSS_PROFILE_URL));
    return () => {
      dispatch({ type: PROFILE_FEED_CLOSE });
    };
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>История заказов {status}</h2>
      <div className={styles.orderList}>
        <OrderList selectFeedOrders={selectProfileFeedOrders} modalRoute={ROUTES.profile.orders} />
      </div>
    </div >
  );
};

export default OrdersHistory;
