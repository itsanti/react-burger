import React, { FC, useEffect } from 'react';
import styles from './order-info.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { NoMatch } from '../../pages';


const OrderInfo: FC = () => {
  const { orderNumber } = useParams();
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!orderNumber) {
      return;
    }
    //dispatch(setIngredient(ingredient));
    // dispatch, navigate
  }, [orderNumber]);

  if (!orderNumber) {
    return <NoMatch />;
  }

  return (
    <div className={styles.root}>
      <p className={styles.orderSum}>{orderNumber}</p>
      <p className={styles.orderStatus}>название</p>
      <p className={styles.orderStatus}>статус</p>
      <p className={styles.orderStatusDescription}>состав</p>
      <p className={styles.orderStatusDescription}>дата и цена</p>
    </div>
  );
};

export default OrderInfo;
