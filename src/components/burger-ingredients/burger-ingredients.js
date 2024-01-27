import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';

const BurgerIngredients = ({ data }) => {
  const [showModal, setShowModal] = useState({ data: null, isOpen: false });

  const SECTIONS = [
    ['bun', 'Булки'],
    ['sauce', 'Соусы'],
    ['main', 'Начинки'],
  ];
  const SHOW_INDEX_ON = [0, 3];

  const showModalHandler = (ingredient) => {
    setShowModal({
      data: ingredient,
      isOpen: true,
    });
  };

  const onModalClosed = () => {
    setShowModal({
      data: null,
      isOpen: false,
    });
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.mainHeader + ' mt-10 mb-5'}>Соберите бургер</h1>
      <div className={styles.tabs + ' mb-10'}>
        <Tab value="one" active>
          Булки
        </Tab>
        <Tab value="two">Соусы</Tab>
        <Tab value="three">Начинки</Tab>
      </div>
      <div className={styles.IngredientContainer}>
        {SECTIONS.map((type, ix) => {
          return (
            <section className={styles.tabSection} key={ix}>
              <h2 className={styles.tabSectionHeader}>{type[1]}</h2>
              {data
                .filter((item) => item.type === type[0])
                .map((ingredient, index) => {
                  return (
                    <div className={styles.Ingredient} key={index} onClick={() => showModalHandler(ingredient)}>
                      {SHOW_INDEX_ON.includes(index) && <Counter count={1} size="default" />}
                      <img src={ingredient.image_large} alt={ingredient.name} className={styles.IngredientImage} />
                      <p className={styles.price}>
                        <span>{ingredient.price}</span>
                        <CurrencyIcon type="primary" />
                      </p>
                      <p className={styles.name}>{ingredient.name}</p>
                    </div>
                  );
                })}
            </section>
          );
        })}
      </div>
      <ModalOverlay title="Детали ингредиента" showModal={showModal.isOpen} onModalClosed={onModalClosed}>
        <IngredientDetails ingredient={showModal.data} />
      </ModalOverlay>
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerIngredients;
