import React, { useState, useContext } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { SECTIONS, SHOW_INDEX_ON } from '../../utils/config';
import { IngredientsContext } from '../../srvices/ingredients-context';

const BurgerIngredients = () => {
  const [showModal, setShowModal] = useState({ ingredient: null, isOpen: false });
  const ingredients = useContext(IngredientsContext);

  const showModalHandler = (ingredient) => {
    setShowModal({
      ingredient,
      isOpen: true,
    });
  };

  const onModalClosed = () => {
    setShowModal({
      ingredient: null,
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
              {ingredients
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
      <Modal title="Детали ингредиента" isOpen={showModal.isOpen} setIsModalOpened={onModalClosed}>
        <IngredientDetails ingredient={showModal.ingredient} />
      </Modal>
    </div>
  );
};

export default BurgerIngredients;
