import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { selectBurgConstructorData, selectTotalPrice } from '../../services/selectors/burgconstructor';
import { selectCurrentOrder } from '../../services/selectors/order';
import { getOrderDetails, setOrderDetails } from '../../services/actions/order';
import { delBun, delIngredientByUuid } from '../../services/actions/burgconstructor';
import { useDrop } from 'react-dnd';
import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';

const BurgerConstructor = () => {
  const constructorData = useSelector(selectBurgConstructorData);
  const totalPrice = useSelector(selectTotalPrice);
  const order = useSelector(selectCurrentOrder);

  const [, drop] = useDrop(
    () => ({
      accept: 'ingredient',
      canDrop: (item) => {
        return constructorData?.bun || item.type === 'bun';
      },
    }),
    [constructorData],
  );

  const dispatch = useDispatch();

  const handleClose = (type, uuid) => {
    if (type === 'bun') {
      dispatch(delBun());
    } else {
      dispatch(delIngredientByUuid(uuid));
    }
  };

  const onModalClosed = () => {
    dispatch(setOrderDetails(null));
  };

  const onSetDetails = (constructorData) => {
    const ingredients = [
      constructorData.bun._id,
      ...constructorData.ingredients.map((ingredient) => ingredient._id),
      constructorData.bun._id,
    ];
    dispatch(getOrderDetails({ body: { ingredients } }));
  };

  if (!constructorData.bun) {
    return (
      <div ref={drop} className={styles.root}>
        <section className={styles.dropArea}>Drop bun here...</section>
      </div>
    );
  }

  return (
    <div ref={drop} className={styles.root}>
      <ConstructorElement
        type="top"
        isLocked={constructorData.ingredients.length}
        text={constructorData.bun.name + ' (верх)'}
        price={constructorData.bun.price}
        thumbnail={constructorData.bun.image}
        extraClass={styles.elementTop}
        handleClose={() => {
          handleClose('bun');
        }}
      />
      <div className={`${styles.container} ${constructorData.ingredients.length ? '' : styles.containerEmpty}`}>
        {constructorData.ingredients.map((element, index) => (
          <BurgerConstructorElement
            key={element.uuid}
            index={index}
            element={element}
            styles={styles}
            handleClose={handleClose}
          />
        ))}
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={constructorData.ingredients.length}
        text={constructorData.bun.name + ' (низ)'}
        price={constructorData.bun.price}
        thumbnail={constructorData.bun.image}
        extraClass={styles.element}
        handleClose={() => {
          handleClose('bun');
        }}
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
        <Modal isOpen={order} setIsModalOpened={onModalClosed}>
          <OrderDetails order={order} />
        </Modal>
      </div>
    </div>
  );
};

export default BurgerConstructor;
