import React, { FC } from 'react';
import styles from './order-list.module.css';
import { Link, useLocation } from 'react-router-dom';
import { OrderStatusI18n, OrdersList } from '../../utils/types/prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks';
import { dateFormat } from '../../utils/utils';
import { selectIngredients } from '../../services/selectors/ingredients';
import { RootState } from '../../utils/types';
import { ROUTES } from '../../utils/config';

type OrdersListItem = {
  order: OrdersList;
  showStatus: boolean;
}

const OrderListItem: FC<OrdersListItem> = ({ order, showStatus }) => {
  const ingredients = useSelector(selectIngredients);

  const getIngredientsDetails = (ids: string[]) => {
    const filtered = ingredients.filter(ingredient => ids.includes(ingredient._id));
    const images = filtered.map(ingredient => ({ src: ingredient.image_mobile, alt: ingredient.name }));
    const prices: { [key: string]: number } = filtered.map(ingredient => ({ id: ingredient._id, price: ingredient.price }))
      .reduce((acc: { [key: string]: number }, current) => {
        acc[current.id] = current.price;
        return acc;
      }, {});
    const totalPrice = ids.reduce((acc, current) => acc + prices[current], 0);
    return {
      images,
      totalPrice
    }
  }

  const details = getIngredientsDetails(order.ingredients);

  return (
    <article className={styles.listItem}>
      <h2 className={styles.title}>#{order.number} <span className={styles.date}>{dateFormat(order.createdAt)}</span></h2>
      <p className={styles.name}>{order.name}</p>
      <p>{showStatus && OrderStatusI18n[order.status]}</p>
      <footer className={styles.footer}>
        <div className={styles.ingredients}>{details.images.map((image, index) => {
          return <img style={{ 'zIndex': details.images.length - index }} key={index} src={image.src} alt={image.alt} className={styles.IngredientImage} />
        })}</div>
        <div className={styles.price}>{details.totalPrice} <CurrencyIcon type="primary" /></div>
      </footer>
    </article>
  );
}

type OrderListProps = {
  selectFeedOrders: (state: RootState) => OrdersList[];
  modalRoute: string;
}

const OrderList: FC<OrderListProps> = ({ selectFeedOrders, modalRoute }) => {
  const location = useLocation();
  let orders = useSelector(selectFeedOrders);

  if (!orders.length) {
    return null;
  }

  let isProfile = false;
  if (location.pathname.startsWith(ROUTES.profile.orders)) {
    isProfile = true;
  }

  return (
    <div className={styles.root}>
      {orders.map((order) => (
        <Link
          key={order._id}
          to={`${modalRoute}/${order.number}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
          state={{ backgroundLocation: location }}
          className={styles.link}
        >
          <OrderListItem order={order} showStatus={isProfile} />
        </Link>
      ))}
    </div>
  );
};

export default OrderList;
