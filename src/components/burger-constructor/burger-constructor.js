import React, { useState } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';

const BurgerConstructor = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const onModalClosed = () => {
    setShowModal(false);
  };

  const elementIds = [
    '643d69a5c3f7b9001cfa0944',
    '643d69a5c3f7b9001cfa093f',
    '643d69a5c3f7b9001cfa0947',
    '643d69a5c3f7b9001cfa0946',
  ];

  let totalPrice = 400;

  return (
    <div className={styles.root}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={data[0].image}
      />
      {elementIds.map((elementId, ix) => {
        const [element] = data.filter((item) => item._id === elementId);
        totalPrice += element.price;
        return (
          <ConstructorElement text={element.name} price={element.price} thumbnail={element.image} key={element._id} />
        );
      })}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={data[0].image}
      />
      <div className={styles.footer + ' mt-1'}>
        <div className={styles.totalPrice}>
          <span>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" extraClass="ml-10" onClick={() => setShowModal(true)}>
          Оформить заказ
        </Button>
        <ModalOverlay showModal={showModal} onModalClosed={onModalClosed}>
          <OrderDetails />
        </ModalOverlay>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerConstructor;
