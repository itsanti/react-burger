import React, { FC, useEffect } from 'react';
import styles from './order-info.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { NoMatch } from '../../pages';
import { useDispatch, useSelector } from '../../hooks';
import { SET_ORDER_DETAILS_PAGE, setOrderDetailsPage } from '../../services/actions/order';
import { selectOrderDetailsPage } from '../../services/selectors/order';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectIngredients } from '../../services/selectors/ingredients';
import { dateFormat } from '../../utils/utils';
import { selectOrderByNumber } from '../../services/selectors/feed';
import { ROUTES } from '../../utils/config';

type Item = {
  id: string;
  src: string;
  name: string;
  price: number;
  count: number;
}

const OrderInfo: FC = () => {
  const location = useLocation();
  let { orderNumber } = useParams();
  const order = useSelector(selectOrderDetailsPage);
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  if (!orderNumber) {
    orderNumber = '-1';
  }
  const orderInStore = useSelector(selectOrderByNumber(parseInt(orderNumber)));

  useEffect(() => {
    if (orderNumber) {
      if (orderInStore) {
        dispatch({ type: SET_ORDER_DETAILS_PAGE, payload: orderInStore });
      } else {
        dispatch(setOrderDetailsPage(orderNumber));
      }
    }
  }, [dispatch, orderNumber, orderInStore]);


  if (!order) {
    return <NoMatch />;
  }

  const getIngredientsDetails = (ids: string[]) => {
    const filtered = ingredients.filter(ingredient => ids.includes(ingredient._id)).reduce((acc: { [key: string]: Item }, current) => {
      acc[current._id] = { id: current._id, src: current.image_mobile, name: current.name, price: current.price, count: 1 };
      return acc;
    }, {});
    const itemsData = ids.reduce((acc: { [key: string]: Item }, id) => {
      if (Object.keys(acc).includes(id)) {
        acc[id].count++;
      } else {
        acc[id] = filtered[id];
      }
      return acc;
    }, {});
    return itemsData;
  }

  const itemsData = getIngredientsDetails(order.ingredients);
  const totalPrice = Object.keys(itemsData).reduce((acc, current) => acc + itemsData[current].price * itemsData[current].count, 0);

  let mt = 0;
  if (location.pathname.startsWith(ROUTES.feed)) {
    mt = 120;
  }

  return (
    <section className={styles.root}>
      <header className={styles.header} style={{ marginTop: mt }}>
        {!location.state && <p className={styles.orderNumber}>#{order.number}</p>}
        <p className={styles.orderName}>{order.name}</p>
        <p className={styles.orderStatus}>{order.status}</p>
      </header>
      <p className={styles.orderIngredientsTitle}>Состав:</p>
      <ul className={styles.orderIngredients}>{Object.entries(itemsData).map(([key, item]) => {
        return (
          <li className={styles.orderIngredient} key={key}>
            <img src={item.src} alt={item.name} className={styles.orderImage} />
            <p>{item.name}</p>
            <div className={styles.price}>{item.count} x {item.price} <CurrencyIcon type="primary" /></div>
          </li>
        )
      })}</ul>
      <footer className={styles.footer}>
        <p className={styles.orderDate}>{dateFormat(order.updatedAt)}</p>
        <div className={styles.price}>{totalPrice} <CurrencyIcon type="primary" /></div>
      </footer>
    </section>
  );
};

export default OrderInfo;
