import React, { FC } from 'react';
import styles from './order-stat.module.css';
import { useSelector } from '../../hooks';
import { selectFeedOrdersByStatus, selectFeedTotal, selectFeedTotalToday } from '../../services/selectors/feed';
import { OrderStatus } from '../../utils/types/prop-types';


const OrderStat: FC = () => {
  const ordersDone = useSelector(selectFeedOrdersByStatus(OrderStatus.done));
  const ordersPending = useSelector(selectFeedOrdersByStatus(OrderStatus.pending));
  const feedTotal = useSelector(selectFeedTotal);
  const feedTotalToday = useSelector(selectFeedTotalToday);

  if (!(ordersDone.length || ordersPending.length)) {
    return null;
  }

  return (
    <div className={styles.root}>
      <section className={styles.grid}>
        <div className={styles.done}>
          <h2 className={styles.title}>Готовы:</h2>
          <ul className={styles.orderList}>
            {ordersDone.map(order => {
              return <li key={order._id}>{order.number}</li>
            })}
          </ul>
        </div>
        <div className={styles.pending}>
          <h2 className={styles.title}>В работе:</h2>
          <ul className={styles.orderList}>
            {ordersPending.map(order => {
              return <li key={order._id}>{order.number}</li>
            })}
          </ul>
        </div>
      </section>
      <div className={styles.totals}>
        <h2 className={styles.title}>Выполнено за все время:</h2>
        <p className={styles.total}>{feedTotal}</p>
        <h2 className={styles.title}>Выполнено за сегодня:</h2>
        <p className={styles.total}>{feedTotalToday}</p>
      </div>
    </div>
  );
};

export default OrderStat;
