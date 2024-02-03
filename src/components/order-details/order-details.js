import React from 'react';
import styles from './order-details.module.css';
import done from '../../images/done.png';
import { orderDetailsPropTypes } from '../../utils/prop-types';

const OrderDetails = ({ order }) => {
  if (!order) return null;
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

OrderDetails.propTypes = {
  order: orderDetailsPropTypes,
};

export default OrderDetails;
