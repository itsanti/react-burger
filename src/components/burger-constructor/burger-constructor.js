import React, { useState, useContext, useReducer, useEffect, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { IngredientsContext } from '../../srvices/ingredients-context';
import { requestPost } from '../../utils/http';

function totalPriceReducer(state, action) {
  switch (action.type) {
    case 'CALCULATE_TOTAL':
      return (
        action.payload.bun.price * 2 +
        action.payload.ingredients.reduce((sum, ingredient) => (sum += ingredient.price), 0)
      );
    default:
      return state;
  }
}

const BurgerConstructor = () => {
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState(null);
  const ingredients = useContext(IngredientsContext);
  const [totalPrice, dispatcher] = useReducer(totalPriceReducer, 0);

  const onModalClosed = () => {
    setShowModal(false);
  };

  const onSetDetails = (constructorData) => {
    const ingredients = [
      constructorData.bun._id,
      ...constructorData.ingredients.map((ingredient) => ingredient._id),
      constructorData.bun._id,
    ];
    requestPost('/orders', {
      ingredients,
    })
      .then((res) => {
        if (res.success) {
          setDetails(res);
          setShowModal(true);
        }
      })
      .catch((err) => {});
  };

  const constructorData = useMemo(() => {
    const selectedElementIds = [
      '643d69a5c3f7b9001cfa0944',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa0947',
      '643d69a5c3f7b9001cfa0946',
    ];
    return {
      bun: ingredients.filter((ingredient) => ingredient.type === 'bun')[0],
      ingredients: ingredients.filter((ingredient) => selectedElementIds.includes(ingredient._id)),
    };
  }, [ingredients]);

  useEffect(() => {
    dispatcher({ type: 'CALCULATE_TOTAL', payload: constructorData });
  }, [constructorData]);

  return (
    <div className={styles.root}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={constructorData.bun.name + ' (верх)'}
        price={constructorData.bun.price}
        thumbnail={constructorData.bun.image}
      />
      {constructorData.ingredients.map((element) => {
        return (
          <ConstructorElement text={element.name} price={element.price} thumbnail={element.image} key={element._id} />
        );
      })}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={constructorData.bun.name + ' (низ)'}
        price={constructorData.bun.price}
        thumbnail={constructorData.bun.image}
      />
      <div className={styles.footer + ' mt-1'}>
        <div className={styles.totalPrice}>
          <span>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={() => onSetDetails(constructorData)}
        >
          Оформить заказ
        </Button>
        <Modal isOpen={showModal} setIsModalOpened={onModalClosed}>
          <OrderDetails order={details?.order} />
        </Modal>
      </div>
    </div>
  );
};

export default BurgerConstructor;
