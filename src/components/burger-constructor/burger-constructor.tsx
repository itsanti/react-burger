import React, { FC } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from '../../hooks';
import { selectBurgConstructorData, selectTotalPrice } from '../../services/selectors/burger-constructor';
import { selectCurrentOrder, selectOrderIsLoading } from '../../services/selectors/order';
import { getOrderDetails, setOrderDetails } from '../../services/actions/order';
import { delBun, delIngredientByUuid, clearConstructor } from '../../services/actions/burger-constructor';
import { useDrop } from 'react-dnd';
import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import { selectUser } from '../../services/selectors/auth';
import { useNavigate } from 'react-router-dom';
import Preloader from '../preloader/preloader';
import { ROUTES } from '../../utils/config';
import { IngredientItemPick, IngredientProps } from '../../utils/types/prop-types';


const BurgerConstructor: FC = () => {
  const constructorData = useSelector(selectBurgConstructorData);
  const totalPrice = useSelector(selectTotalPrice);
  const order = useSelector(selectCurrentOrder);
  const orderIsLoading = useSelector(selectOrderIsLoading);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const [, drop] = useDrop(
    () => ({
      accept: 'ingredient',
      canDrop: (item: IngredientItemPick) => {
        return Boolean(constructorData?.bun) || item.type === 'bun';
      },
    }),
    [constructorData],
  );

  const dispatch = useDispatch();

  const handleClose = (type: string, uuid?: string) => {
    if (type === 'bun') {
      dispatch(delBun());
    } else {
      dispatch(delIngredientByUuid(uuid));
    }
  };

  const onModalClosed = () => {
    dispatch(setOrderDetails(null));
    dispatch(clearConstructor());
  };

  type ConstructorData = typeof constructorData;
  const onSetDetails = (constructorData: ConstructorData) => {
    const ingredients: string[] = [
      (constructorData.bun as IngredientProps)._id,
      ...constructorData.ingredients.map((ingredient: IngredientProps) => ingredient._id),
      (constructorData.bun as IngredientProps)._id,
    ];
    dispatch(getOrderDetails(ingredients));
  };

  const makeOrder = () => {
    if (!user) {
      return navigate(ROUTES.login);
    }
    onSetDetails(constructorData);
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
        isLocked={!!constructorData.ingredients.length}
        text={constructorData.bun.name + ' (верх)'}
        price={constructorData.bun.price}
        thumbnail={constructorData.bun.image}
        extraClass={styles.elementTop}
        handleClose={() => {
          handleClose('bun');
        }}
      />
      <div className={`${styles.container} ${constructorData.ingredients.length ? '' : styles.containerEmpty}`}>
        {constructorData.ingredients.map((ingredient: IngredientProps, index: number) => (
          <BurgerConstructorElement
            key={ingredient.uuid}
            index={index}
            element={ingredient}
            handleClose={handleClose}
          />
        ))}
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={!!constructorData.ingredients.length}
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
        <Button htmlType="button" type="primary" size="large" extraClass="ml-10" onClick={makeOrder}>
          Оформить заказ
        </Button>
        {orderIsLoading && (
          <Modal title="Заказ готовится" setIsModalOpened={onModalClosed}>
            <Preloader />
          </Modal>
        )}
        {order && (
          <Modal setIsModalOpened={onModalClosed}>
            <OrderDetails order={order} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default BurgerConstructor;
