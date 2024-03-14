import React, { FC } from 'react';
import styles from './order-details.module.css';
import done from '../../images/done.png';
import { OrderProps } from '../../utils/types/prop-types';


const OrderDetails: FC<OrderProps> = ({ order }) => {
  return (
    <div className={styles.root}>
      <p className={styles.orderSum}>{order.number}</p>
      <p className={styles.orderId}>идентификатор заказа</p>
      <img className={styles.orderStatusImage} src={done} alt="Done" />
      <p className={styles.orderStatus}>Ваш заказ начали готовить</p>
      <p className={styles.orderStatusDescription}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;
