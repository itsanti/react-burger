import React, { FC } from 'react';
import styles from './order-list.module.css';
import { Link, useLocation } from 'react-router-dom';
import { OrdersList } from '../../utils/types/prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks';
import { selectFeedOrders } from '../../services/selectors/feed';
import { ROUTES } from '../../utils/config';
import { dateFormat } from '../../utils/utils';
import { selectIngredients } from '../../services/selectors/ingredients';

type OrdersListItem = {
  order: OrdersList;
}

const OrderListItem: FC<OrdersListItem> = ({ order }) => {
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
      <footer className={styles.footer}>
        <div className={styles.ingredients}>{details.images.map((image, index) => {
          return <img style={{ 'zIndex': details.images.length - index }} key={index} src={image.src} alt={image.alt} className={styles.IngredientImage} />
        })}</div>
        <div className={styles.price}>{details.totalPrice} <CurrencyIcon type="primary" /></div>
      </footer>
    </article>
  );
}

const OrderList: FC = () => {
  const location = useLocation();
  const orders = useSelector(selectFeedOrders);

  if (!orders.length) {
    return null;
  }

  return (
    <div className={styles.root}>
      {orders.map((order) => (
        <Link
          key={order._id}
          to={`${ROUTES.feed}/${order.number}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
          state={{ backgroundLocation: location }}
          className={styles.link}
        >
          <OrderListItem order={order} />
        </Link>
      ))}
    </div>
  );
};

export default OrderList;
